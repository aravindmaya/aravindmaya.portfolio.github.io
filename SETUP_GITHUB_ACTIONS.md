# 🚀 Setup GitHub Actions for Hostinger Deployment

## Step-by-Step Instructions

### Step 1: Get FTP Credentials from Hostinger

1. **Log in to Hostinger:**
   - Go to: https://hpanel.hostinger.com
   - Log in with your credentials

2. **Navigate to FTP Accounts:**
   - Click on **"Files"** in the left menu
   - Click on **"FTP Accounts"**

3. **Find Your FTP Details:**
   - You'll see your FTP account information
   - Note down these 3 things:
     - **FTP Host** (e.g., `ftp.aravindmaya.com` or an IP like `185.230.63.107`)
     - **FTP Username** (usually your domain or a username)
     - **FTP Password** (click "Show" to reveal it)

4. **Important:** 
   - If you don't see an FTP account, you may need to create one
   - Or use your main hosting account credentials
   - The FTP host might also be: `ftp.hostinger.com` or your server IP

### Step 2: Add GitHub Secrets

1. **Go to GitHub Secrets Page:**
   - Open: https://github.com/aravindmaya/aravindmaya.portfolio.github.io/settings/secrets/actions
   - Or navigate: Your repo → **Settings** → **Secrets and variables** → **Actions**

2. **Add First Secret - FTP_HOST:**
   - Click **"New repository secret"**
   - **Name:** `FTP_HOST`
   - **Secret:** Paste your FTP Host (e.g., `ftp.aravindmaya.com`)
   - Click **"Add secret"**

3. **Add Second Secret - FTP_USERNAME:**
   - Click **"New repository secret"** again
   - **Name:** `FTP_USERNAME`
   - **Secret:** Paste your FTP Username
   - Click **"Add secret"**

4. **Add Third Secret - FTP_PASSWORD:**
   - Click **"New repository secret"** again
   - **Name:** `FTP_PASSWORD`
   - **Secret:** Paste your FTP Password
   - Click **"Add secret"**

### Step 3: Trigger Deployment

**Option A: Manual Trigger (Test First)**
1. Go to: https://github.com/aravindmaya/aravindmaya.portfolio.github.io/actions
2. Click on **"Deploy to Hostinger"** workflow (on the left)
3. Click **"Run workflow"** button (top right)
4. Select branch: `main`
5. Click **"Run workflow"** button
6. Watch it deploy! 🎉

**Option B: Automatic (After First Success)**
- Every time you push to `main` branch, it will auto-deploy
- Just do: `git push origin main` and it deploys automatically!

### Step 4: Verify Deployment

1. **Check GitHub Actions:**
   - Go to Actions tab
   - You should see a green checkmark ✅ when deployment succeeds
   - Click on the workflow run to see detailed logs

2. **Check Your Website:**
   - Visit: https://www.aravindmaya.com
   - Your site should be live!

3. **Test Pages:**
   - Homepage: https://www.aravindmaya.com
   - About: https://www.aravindmaya.com/about.html
   - Projects: https://www.aravindmaya.com/projects/google.html

## Troubleshooting

### Deployment Fails?

**Check the logs:**
- Go to Actions → Click on failed workflow → Check error messages

**Common Issues:**

1. **"Connection refused" or "Connection timeout"**
   - Wrong FTP_HOST - try different formats:
     - `ftp.aravindmaya.com`
     - `185.230.63.107` (your server IP)
     - `ftp.hostinger.com`
   - Check if FTP is enabled in Hostinger

2. **"Authentication failed"**
   - Double-check FTP_USERNAME and FTP_PASSWORD
   - Make sure no extra spaces in secrets
   - Try resetting FTP password in Hostinger

3. **"Directory not found"**
   - The server-dir might be wrong
   - Common paths:
     - `/public_html/`
     - `/www/`
     - `/domains/aravindmaya.com/public_html/`
   - Contact Hostinger support for correct path

4. **"Permission denied"**
   - FTP user might not have write permissions
   - Check FTP account permissions in Hostinger

### Need to Update Server Path?

If the default `/public_html/` doesn't work, I can update the workflow file. Just let me know the correct path!

## What Happens Next?

Once set up:
- ✅ Every `git push` automatically deploys to Hostinger
- ✅ No manual file uploads needed
- ✅ Deployment history in GitHub Actions
- ✅ Easy rollback if needed

## Quick Reference

- **GitHub Secrets:** https://github.com/aravindmaya/aravindmaya.portfolio.github.io/settings/secrets/actions
- **GitHub Actions:** https://github.com/aravindmaya/aravindmaya.portfolio.github.io/actions
- **Hostinger hPanel:** https://hpanel.hostinger.com


