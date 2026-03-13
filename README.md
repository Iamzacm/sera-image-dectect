# Sera – AI Image Detector

Detect AI-generated images using Claude Vision.

## Deploy to Vercel (free, 5 minutes)

### Step 1 – Upload to GitHub
1. Go to github.com and create a free account if you don't have one
2. Click the "+" button → "New repository"
3. Name it `sera` → click "Create repository"
4. Upload all these files (drag them into the GitHub page):
   - `api/analyze.js`
   - `public/index.html`
   - `vercel.json`
   - `package.json`

### Step 2 – Deploy on Vercel
1. Go to vercel.com → sign up with your GitHub account
2. Click "Add New Project"
3. Select your `sera` repository → click "Import"
4. Click "Deploy" (leave all settings as default)

### Step 3 – Add your API Key (IMPORTANT)
1. In Vercel dashboard → click your `sera` project
2. Go to "Settings" → "Environment Variables"
3. Click "Add New"
   - Name:  `ANTHROPIC_API_KEY`
   - Value: `sk-ant-api03-...` (your key)
4. Click "Save"
5. Go to "Deployments" → click the 3 dots → "Redeploy"

Your site is now live at `https://sera-xxx.vercel.app` 🎉

## Features
- 🖼️ Upload from gallery / files
- 🔗 Paste image URL
- 🖱️ Drag & drop
- 📋 Ctrl+V paste from clipboard
- Color-coded result bar (green / yellow / red)
- API key is 100% secure — never exposed to visitors
