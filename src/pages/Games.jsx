import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Games() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      // 1. Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      // 2. Fetch grade_level from profiles with explicit column selection
      // This prevents the 406 error by only requesting allowed columns
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, grade_level')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error("Profile Fetch Error:", profileError);
        setLoading(false);
        return;
      }

      // 3. Call the deployed Edge Function, passing the grade_level
      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: { userId: user.id, gradeLevel: profile.grade_level }
      });

      if (error) {
        console.error("Error loading content:", error);
      } else {
        setContent(data);
      }
      setLoading(false);
    }

    loadContent();
  }, []);

  if (loading) return <div className="text-center py-20">Building your custom curriculum...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Today's Challenges</h1>
      
      {/* Fact Section */}
      <div className="bg-purple-100 p-4 rounded-xl mb-6">
        <h2 className="font-bold text-purple-800">💡 Science Fact</h2>
        <p>{content?.science_fact || "Loading fact..."}</p>
      </div>

      {/* Quiz Section */}
      <div className="space-y-4">
        {content?.quiz?.map((q, i) => (
          <div key={i} className="p-4 bg-white border rounded-lg shadow-sm">
            <p className="font-medium">{i + 1}. {q.question}</p>
          </div>
        ))}
      </div>
    </div>
  );
}