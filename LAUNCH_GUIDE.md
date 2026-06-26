# 🚀 BrightPath — Launch Guide
## From zero to live in under 1 hour

---

## STEP 1 — Install dependencies (2 minutes)

Open this folder in VS Code, then open the terminal (Ctrl + ` ) and run:

```bash
npm install
```

Test it runs locally:
```bash
npm run dev
```

Open http://localhost:5173 — you should see BrightPath!

---

## STEP 2 — Set up Supabase (free database + auth) (10 minutes)

1. Go to https://supabase.com and create a free account
2. Click "New project" — name it `brightpath`
3. Wait ~2 minutes for it to set up
4. Go to **Settings → API** and copy:
   - `Project URL`
   - `anon public` key

5. Create a file called `.env` in this folder (copy from `.env.example`):
```
VITE_SUPABASE_URL=paste_your_project_url_here
VITE_SUPABASE_ANON_KEY=paste_your_anon_key_here
VITE_ANTHROPIC_API_KEY=your_anthropic_key_here
```

6. In Supabase, go to **SQL Editor** → paste the entire contents of `supabase_setup.sql` → click **Run**

---

## STEP 3 — Set up AI (optional but recommended) (3 minutes)

1. Go to https://console.anthropic.com and create an account
2. Copy your Anthropics API key and add it to `.env` as `VITE_ANTHROPIC_API_KEY`
3. If you want Gemini-based lesson generation, also add:
```
GEMINI_API_KEY=your_gemini_api_key
```

4. If you need to manage Anthropic API keys using the CLI, add these optional values:
```
ANTHROPIC_API_KEY_ID=your_anthropic_api_key_id
ANTHROPIC_OAUTH_TOKEN=your_anthropic_oauth_token
```

5. To verify the API key record, use this command after setting the two variables:
```bash
curl "https://api.anthropic.com/v1/organizations/api_keys/$ANTHROPIC_API_KEY_ID" \
  -H 'anthropic-version: 2023-06-01' \
  -H "Authorization: Bearer $ANTHROPIC_OAUTH_TOKEN"
```

---

## STEP 4 — Update your contact details (2 minutes)

Open these files and update with your real details:

**src/pages/Subscribe.jsx** (line 6-7):
```js
const WHATSAPP_NUMBER = '250700000000'  // Your WhatsApp number
const momoNumber = '0700000000'          // Your MoMo number
```

**src/pages/Landing.jsx** (bottom of file):
```
WhatsApp us: +250 7XX XXX XXX   ← your real number
```

---

## STEP 5 — Make yourself admin (5 minutes)

1. Run the app: `npm run dev`
2. Go to http://localhost:5173/signup
3. Create your account (use your real email)
4. Go back to Supabase → SQL Editor and run:
```sql
UPDATE public.profiles SET role = 'admin' WHERE email = 'your@email.com';
```
5. Log back in — you'll now see the Admin panel in the nav!

---

## STEP 6 — Deploy live on Vercel (FREE) (10 minutes)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Launch BrightPath"
```
Create a repo at https://github.com/new, then:
```bash
git remote add origin https://github.com/YOUR_USERNAME/brightpath.git
git push -u origin main
```

2. Go to https://vercel.com → sign in with GitHub → "New Project" → import your repo

3. In Vercel, go to **Settings → Environment Variables** and add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_ANTHROPIC_API_KEY`

4. Click **Deploy** — Vercel gives you a live URL like `brightpath.vercel.app`!

---

## STEP 7 — Share with students! 🎉

Send this message to students:

> 🌟 *BrightPath is now live!*
> Learn, play games and discover science — for IB and Cambridge students!
> 👉 Sign up free (7-day trial): https://brightpath.vercel.app
> After trial: just 5,000 RWF/month via MoMo
> Questions? WhatsApp me: +250 7XX XXX XXX

---

## Managing students

1. Go to https://brightpath.vercel.app/admin
2. When a student sends MoMo payment and confirms on WhatsApp:
   - Find them in the Students table
   - Change their status from "trial/pending" → **"active"**
   - Done! They have full access.

---

## Files overview

```
brightpath/
├── src/
│   ├── pages/
│   │   ├── Landing.jsx       ← Homepage (update WhatsApp number)
│   │   ├── Signup.jsx        ← Student registration
│   │   ├── Login.jsx         ← Login
│   │   ├── Dashboard.jsx     ← Student home
│   │   ├── Games.jsx         ← Quiz games
│   │   ├── ScienceFacts.jsx  ← AI science facts
│   │   ├── Worksheets.jsx    ← Practice worksheets
│   │   ├── Subscribe.jsx     ← Payment page (update MoMo number)
│   │   └── AdminPanel.jsx    ← Your control panel
│   ├── components/
│   │   └── Navbar.jsx
│   ├── hooks/
│   │   └── useAuth.jsx       ← Login/signup logic
│   └── lib/
│       └── supabase.js       ← Database connection
├── .env                      ← Your secret keys (never share this!)
├── supabase_setup.sql        ← Run this in Supabase once
└── LAUNCH_GUIDE.md           ← This file!
```

---

## Phase 2 (coming soon)
- MTN MoMo API auto-payment
- Push notifications
- Parent portal
- Leaderboard
- More subjects and games

---

🌟 Built for Rwanda's brightest students. Good luck with your launch!
