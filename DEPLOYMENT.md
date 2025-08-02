# 🚀 Deployment Guide

Complete guide for deploying the Smart Recipe Generator to production.

## 📋 Prerequisites

Before deploying, ensure you have:

- ✅ **Node.js** (version 16 or higher)
- ✅ **npm** or **yarn** package manager
- ✅ **OpenAI API key** (get from [OpenAI Platform](https://platform.openai.com/api-keys))
- ✅ **Vercel account** (free at [vercel.com](https://vercel.com))
- ✅ **Git repository** (optional but recommended)

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

## 🔧 Alternative Deployment Options

### Option 1: Netlify Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder to Netlify
   - OR use Netlify CLI:
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod --dir=dist
   ```

3. **Set environment variables**
   - Go to Site settings → Environment variables
   - Add `OPENAI_API_KEY` with your API key

4. **Update API URL**
   - Edit `src/utils/generateRecipes.js`
   - Change the production URL to point to your Vercel function

### Option 2: GitHub + Vercel Integration

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

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Issue 1: "FUNCTION_INVOCATION_FAILED"
**Symptoms**: API returns 500 error with FUNCTION_INVOCATION_FAILED
**Solution**: 
- Check function syntax in `api/generate-recipes.js`
- Ensure using ES module syntax: `export default function handler(req, res)`
- Redeploy: `vercel --prod`

#### Issue 2: "OpenAI API key not configured"
**Symptoms**: Error message about missing API key
**Solution**:
- Verify environment variable is set in Vercel dashboard
- Check variable name is exactly `OPENAI_API_KEY`
- Redeploy after adding environment variable

#### Issue 3: CORS Errors
**Symptoms**: Browser console shows CORS errors
**Solution**:
- CORS headers are already configured in the API function
- Ensure you're using the correct domain in your requests

#### Issue 4: White Screen
**Symptoms**: App loads but shows blank white screen
**Solution**:
- Check browser console for JavaScript errors
- Verify all files are properly built and deployed
- Check Vercel build logs for errors

#### Issue 5: API Not Responding
**Symptoms**: Recipe generation times out or fails
**Solution**:
- Check Vercel function logs in dashboard
- Verify OpenAI API key is valid and has credits
- Test API endpoint directly in browser console

### Debugging Steps

1. **Check Vercel Function Logs**
   - Go to Vercel dashboard → Functions tab
   - Click on `api/generate-recipes`
   - View real-time logs

2. **Test API Endpoint Directly**
   ```javascript
   // In browser console
   fetch('https://your-app.vercel.app/api/generate-recipes', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ 
       ingredients: ['chicken', 'rice'], 
       servings: 2 
     })
   }).then(r => r.json()).then(console.log).catch(console.error)
   ```

3. **Verify Environment Variables**
   - Check Vercel dashboard → Settings → Environment Variables
   - Ensure `OPENAI_API_KEY` is set for all environments

## 🔒 Security Best Practices

### Environment Variables
- ✅ Never commit API keys to Git
- ✅ Use environment variables for all sensitive data
- ✅ Set different keys for development/production if needed

### API Security
- ✅ API keys stored server-side only
- ✅ CORS properly configured
- ✅ Input validation on all endpoints

### Deployment Security
- ✅ Use HTTPS (automatic with Vercel)
- ✅ Enable security headers
- ✅ Regular dependency updates

## 📊 Monitoring and Analytics

### Vercel Analytics
- Enable Vercel Analytics in dashboard
- Monitor function performance
- Track user interactions

### Error Monitoring
- Check Vercel function logs regularly
- Monitor API response times
- Set up alerts for failures

## 🔄 Continuous Deployment

### Automatic Deployments
- Connect GitHub repository to Vercel
- Every push to main branch triggers deployment
- Preview deployments for pull requests

### Environment Management
- Production: Live site
- Preview: Test deployments
- Development: Local development

## 📈 Performance Optimization

### Frontend
- Vite build optimization
- TailwindCSS purging
- Image optimization

### Backend
- Serverless function optimization
- API response caching
- Database optimization (if added later)

## 🎯 Next Steps After Deployment

1. **Test thoroughly** on different devices and browsers
2. **Set up monitoring** and error tracking
3. **Optimize performance** based on usage
4. **Add analytics** to track user behavior
5. **Plan feature updates** based on user feedback

---

## 📞 Support

If you encounter issues:

1. **Check this guide** for common solutions
2. **Review Vercel documentation** at [vercel.com/docs](https://vercel.com/docs)
3. **Check function logs** in Vercel dashboard
4. **Test locally** to isolate issues

**Happy Deploying! 🚀** 