# Deployment Guide

This guide will help you deploy the BFHL API to various hosting platforms.

## Prerequisites

1. A GitHub account
2. Node.js installed locally (for testing)
3. Git installed locally

## Step 1: Push to GitHub

1. Create a new repository on GitHub (don't initialize with README, .gitignore, or license)
2. Follow these commands to push your code:

```bash
# Add your GitHub repository as remote origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel (Recommended)

### Option A: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy from your project directory:
```bash
vercel
```

3. Follow the prompts:
   - Set up and deploy: Yes
   - Which scope: Select your account
   - Link to existing project: No
   - Project name: bfhl-api (or your preferred name)
   - Directory: ./ (current directory)
   - Override settings: No

4. Your API will be deployed and you'll get a URL like: `https://your-project.vercel.app`

### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect it's a Node.js app
6. Deploy

## Step 3: Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Railway will automatically detect and deploy your Node.js app
7. Your API will be available at the provided Railway URL

## Step 4: Deploy to Render

1. Go to [render.com](https://render.com)
2. Sign in with GitHub
3. Click "New +" and select "Web Service"
4. Connect your GitHub repository
5. Configure:
   - Name: bfhl-api
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Click "Create Web Service"
7. Your API will be deployed and available at the provided Render URL

## Step 5: Test Your Deployed API

Once deployed, test your API using the deployed URL:

```bash
# Replace YOUR_DEPLOYED_URL with your actual deployment URL
curl -X POST https://YOUR_DEPLOYED_URL/bfhl \
  -H "Content-Type: application/json" \
  -d '{
    "data": ["M", "1", "334", "4", "B", "6", "A", "!", "2"],
    "full_name": "John Doe",
    "email": "john.doe@example.com",
    "roll_number": "12345"
  }'
```

## Environment Variables

For production deployment, you may want to set:
- `NODE_ENV=production`
- `PORT` (usually set automatically by the hosting platform)

## Troubleshooting

### Common Issues

1. **Build fails**: Make sure all dependencies are in `package.json`
2. **Port binding error**: The hosting platform usually sets the PORT environment variable
3. **Module not found**: Ensure `package.json` has all required dependencies

### Vercel Specific

- The `vercel.json` file is already configured for optimal deployment
- Vercel automatically handles environment variables and port binding

### Railway Specific

- Railway automatically detects Node.js apps
- No additional configuration needed

### Render Specific

- Make sure to set the start command as `npm start`
- Render may take a few minutes for the first deployment

## Monitoring

After deployment, monitor your API:
- Check the deployment logs for any errors
- Test the endpoints to ensure they're working
- Monitor response times and uptime

## Updating Your API

To update your deployed API:

1. Make changes to your code
2. Commit and push to GitHub:
```bash
git add .
git commit -m "Update: description of changes"
git push origin main
```

3. Most platforms (Vercel, Railway, Render) will automatically redeploy on push to main branch

## Cost Considerations

- **Vercel**: Free tier available, pay-as-you-go for higher usage
- **Railway**: Free tier available, pay-as-you-go for higher usage  
- **Render**: Free tier available, pay-as-you-go for higher usage

All platforms offer generous free tiers suitable for development and small-scale production use.
