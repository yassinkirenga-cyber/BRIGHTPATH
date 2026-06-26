import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Headers to fix the CORS error
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // 1. Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const { userId } = await req.json()

  // 2. Fetch User Profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('grade_level')
    .eq('id', userId)
    .single()

  if (profileError || !profile) {
    return new Response(JSON.stringify({ error: 'User not found' }), { 
      status: 404, 
      headers: { ...corsHeaders, "Content-Type": "application/json" } 
    })
  }

  // 3. Check for 5-minute Cache
  const { data: existing } = await supabase
    .from('user_learning_content')
    .select('*')
    .eq('id', userId)
    .single()

  if (existing) {
    const lastTime = new Date(existing.last_generated_at).getTime()
    const now = new Date().getTime()
    if (now - lastTime < 300000) {
      return new Response(JSON.stringify(existing.content), { 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      })
    }
  }

  // 4. Call Gemini API
  const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')
  const prompt = `Generate a JSON object for a Grade ${profile.grade_level} student. 
    Include a 'quiz' array with 50 math problems, a 'game' logic puzzle object, and a 'science_fact' string. 
    Return ONLY valid JSON.`

  const aiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  })

  const aiData = await aiResponse.json()
  const rawText = aiData.candidates[0].content.parts[0].text
  const cleanJson = JSON.parse(rawText.replace(/```json|```/g, '').trim())

  // 5. Upsert to DB and return
  await supabase
    .from('user_learning_content')
    .upsert({ 
      id: userId, 
      content: cleanJson, 
      last_generated_at: new Date().toISOString() 
    })

  return new Response(JSON.stringify(cleanJson), { 
    headers: { ...corsHeaders, "Content-Type": "application/json" } 
  })
})