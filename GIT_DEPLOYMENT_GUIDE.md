# Git Deployment Guide for Hostinger

This guide shows you how to deploy your website to Hostinger using Git, which is much easier than manual file uploads!

## Prerequisites

- ✅ Your code is on GitHub (already done: `aravindmaya/aravindmaya.portfolio.github.io`)
- ✅ Hostinger hosting account
- ✅ Domain connected to Hostinger

## Method 1: Hostinger Git Integration (Recommended)

Hostinger has built-in Git integration that automatically deploys from your GitHub repository.

### Step 1: Access Git in Hostinger

1. Log in to **Hostinger hPanel**: https://hpanel.hostinger.com
2. Navigate to **Files** → **Git**
3. Click **Create Repository** or **Connect Repository**

### Step 2: Connect Your GitHub Repository

1. **Option A: Connect via GitHub (Easiest)**
   - Click **Connect with GitHub**
   - Authorize Hostinger to access your GitHub account
   - Select your repository: `aravindmaya/aravindmaya.portfolio.github.io`
   - Choose the branch: `main` (or `master`)
   - Set deployment directory: `/public_html` (or `/www` if that's your domain root)

2. **Option B: Connect via HTTPS/SSH**
   - Repository URL: `https://github.com/aravindmaya/aravindmaya.portfolio.github.io.git`
   - Branch: `main`
   - Deployment directory: `/public_html`
   - You may need to generate a deploy key or use a personal access token

### Step 3: Configure Auto-Deploy

1. Enable **Auto Deploy** (recommended)
   - This will automatically deploy whenever you push to the `main` branch
   - Or set up manual deployment if you prefer

2. Set deployment settings:
   - **Deployment directory**: `/public_html`
   - **Branch**: `main`
   - **Build command**: (leave empty for static sites)
   - **Install command**: (leave empty for static sites)

### Step 4: Initial Deployment

1. Click **Deploy Now** or wait for auto-deploy
2. Wait for deployment to complete
3. Check the deployment logs for any errors

### Step 5: Verify Deployment

- Visit `www.aravindmaya.com` to see your site live!

## Method 2: GitHub Actions + FTP (Alternative)

If Hostinger Git integration doesn't work, you can use GitHub Actions to auto-deploy.

### Step 1: Get FTP Credentials from Hostinger

1. In Hostinger hPanel, go to **Files** → **FTP Accounts**
2. Note down:
   - FTP Host (usually `ftp.yourdomain.com` or an IP)
   - FTP Username
   - FTP Password
   - Port (usually 21)

### Step 2: Add GitHub Secrets

1. Go to your GitHub repository: https://github.com/aravindmaya/aravindmaya.portfolio.github.io
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Add these secrets:
   - `FTP_HOST`: Your FTP host
   - `FTP_USERNAME`: Your FTP username
   - `FTP_PASSWORD`: Your FTP password
   - `FTP_PORT`: `21` (or your port)

### Step 3: Create GitHub Actions Workflow

I'll create a workflow file for you (see `.github/workflows/deploy.yml`)

### Step 4: Push to Deploy

Every time you push to `main`, GitHub Actions will automatically deploy to Hostinger!

## Method 3: Manual Git Clone via SSH (Advanced)

If you have SSH access to Hostinger:

1. **Enable SSH in Hostinger**
   - Go to **Advanced** → **SSH Access** in hPanel
   - Generate SSH keys if needed

2. **Clone Repository via SSH**
   ```bash
   ssh username@your-server-ip
   cd public_html
   git clone https://github.com/aravindmaya/aravindmaya.portfolio.github.io.git .
   ```

3. **Set up Auto-Pull** (optional)
   - Create a webhook or cron job to pull latest changes

## Daily Workflow (After Setup)

Once Git deployment is set up:

1. **Make changes locally**
   ```bash
   git add .
   git commit -m "Update portfolio"
   git push origin main
   ```

2. **Auto-deploy happens** (if auto-deploy is enabled)
   - Or manually trigger deployment in Hostinger hPanel

3. **Your site updates automatically!**

## Troubleshooting

### Issue: Git integration not available
- **Solution**: Some Hostinger plans may not have Git. Use Method 2 (GitHub Actions) instead.

### Issue: Deployment fails
- Check deployment logs in Hostinger
- Ensure all files are committed to Git
- Verify deployment directory path is correct

### Issue: Files not updating
- Clear browser cache
- Check if deployment actually completed
- Verify you're pushing to the correct branch

### Issue: Permission errors
- Check file permissions in Hostinger
- Ensure deployment directory is writable

## Best Practices

1. **Always test locally** before pushing
2. **Use meaningful commit messages**
3. **Keep `.htaccess` and other config files** in Git
4. **Don't commit sensitive data** (use environment variables)
5. **Set up staging environment** if possible (test before production)

## Next Steps

1. Choose your deployment method
2. Set up the connection
3. Make a test commit and push
4. Verify deployment works
5. Celebrate! 🎉

