# 🚀 Deployment Guide

Complete guide for deploying the Smart Recipe Generator to production.


## 🎯 Quick Start (Recommended: Vercel)

### Step 1: Prepare Your Project

1. **Ensure all files are ready**
   ```bash
   # Check if all required files exist
   ls -la
   # Should see: package.json, vercel.json, api/generate-recipes.js, etc.
   ```

2. **Test locally first**
   ```bash
   npm install
   npm run dev
   # Visit http://localhost:5173 to test
   ```

### Step 2: Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   # Follow the browser prompts to authenticate
   ```

3. **Deploy the project**
   ```bash
   vercel
   # Answer the prompts:
   # - Set up and deploy? → Yes
   # - Which scope? → Select your account
   # - Link to existing project? → No
   # - Project name? → smart-recipe-generator (or press Enter)
   # - Directory? → ./ (press Enter)
   # - Override settings? → No
   ```

4. **Note your deployment URL**
   - Vercel will provide a URL like: `https://smart-recipe-generator-xxx.vercel.app`
   - Save this URL for later

### Step 3: Configure Environment Variables

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click on your project "smart-recipe-generator"

2. **Navigate to Environment Variables**
   - Click on **"Settings"** tab
   - Click on **"Environment Variables"** in the left sidebar

3. **Add OpenAI API Key**
   - Click **"Add New"**
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key (starts with `sk-`)
   - **Environments**: Check all three (Production, Preview, Development)
   - Click **"Save"**

### Step 4: Redeploy with Environment Variables

```bash
vercel --prod
```

### Step 5: Test Your Deployment

1. **Visit your live URL**
   - Go to the URL provided by Vercel
   - Test the application functionality

2. **Test recipe generation**
   - Add some ingredients (e.g., "chicken", "rice")
   - Click "Generate Recipe"
   - Verify recipes are generated successfully


# GitHub + Vercel Integration

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect GitHub to Vercel**
   - Go to Vercel dashboard
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-deploy on every push
