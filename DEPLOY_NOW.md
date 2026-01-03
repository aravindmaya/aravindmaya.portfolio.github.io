# 🚀 Quick Deployment Guide for www.aravindmaya.com

## Current Status
✅ Deployment files are ready and committed locally  
✅ GitHub Actions workflow is set up  
⏳ Need to push to GitHub and configure deployment

---

## Step 1: Push Code to GitHub

You have 3 options:

### Option A: Add SSH Key to GitHub (Recommended for future)

1. **Copy your SSH public key:**
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
   Copy the entire output (starts with `ssh-ed25519`)

2. **Add to GitHub:**
   - Go to: https://github.com/settings/ssh/new
   - Paste your key
   - Click "Add SSH key"

3. **Then push:**
   ```bash
   git push origin main
   ```

### Option B: Use Personal Access Token (Quick)

1. **Generate token:**
   - Go to: https://github.com/settings/tokens/new
   - Name: "Deployment Token"
   - Select: `repo` scope
   - Click "Generate token"
   - **Copy the token immediately** (you won't see it again!)

2. **Change remote back to HTTPS:**
   ```bash
   git remote set-url origin https://github.com/aravindmaya/aravindmaya.portfolio.github.io.git
   ```

3. **Push (use token as password):**
   ```bash
   git push origin main
   ```
   - Username: `aravindmaya`
   - Password: `[paste your token]`

### Option C: Use GitHub Desktop or VS Code

- Use GitHub Desktop app or VS Code's Git integration
- They handle authentication automatically

---

## Step 2: Set Up Hostinger Deployment

After code is pushed, choose ONE deployment method:

### Method 1: GitHub Actions (Automated - Recommended)

1. **Get FTP credentials from Hostinger:**
   - Log in: https://hpanel.hostinger.com
   - Go to **Files** → **FTP Accounts**
   - Note down:
     - FTP Host (e.g., `ftp.aravindmaya.com` or IP address)
     - FTP Username
     - FTP Password

2. **Add GitHub Secrets:**
   - Go to: https://github.com/aravindmaya/aravindmaya.portfolio.github.io/settings/secrets/actions
   - Click **"New repository secret"** and add:
     - Name: `FTP_HOST` → Value: (your FTP host)
     - Name: `FTP_USERNAME` → Value: (your FTP username)  
     - Name: `FTP_PASSWORD` → Value: (your FTP password)

3. **Trigger deployment:**
   - Go to: https://github.com/aravindmaya/aravindmaya.portfolio.github.io/actions
   - Click "Deploy to Hostinger" workflow
   - Click "Run workflow" → "Run workflow" button
   - Or just push to `main` branch - it auto-deploys!

### Method 2: Hostinger Git Integration

1. **In Hostinger hPanel:**
   - Go to **Files** → **Git**
   - Click **"Create Repository"** or **"Connect Repository"**

2. **Connect GitHub:**
   - Click **"Connect with GitHub"**
   - Authorize Hostinger
   - Select repo: `aravindmaya/aravindmaya.portfolio.github.io`
   - Branch: `main`
   - Deployment directory: `/public_html`

3. **Enable Auto-Deploy:**
   - Toggle "Auto Deploy" ON
   - Click "Deploy Now"

### Method 3: Manual Upload (One-time)

If automated methods don't work:

1. **Download from GitHub:**
   - Go to: https://github.com/aravindmaya/aravindmaya.portfolio.github.io
   - Click **"Code"** → **"Download ZIP"**
   - Extract the ZIP file

2. **Upload to Hostinger:**
   - Log in to Hostinger hPanel
   - Go to **Files** → **File Manager**
   - Open `public_html` folder
   - Upload ALL files and folders
   - Maintain exact folder structure

---

## Step 3: Verify Deployment

1. **Visit your website:**
   - https://www.aravindmaya.com
   - https://aravindmaya.com

2. **Test pages:**
   - Homepage loads
   - `/about.html` works
   - `/fun.html` works
   - `/projects/google.html` works
   - Images load correctly

3. **Check GitHub Actions (if using Method 1):**
   - Go to Actions tab
   - See deployment status (green = success)

---

## Troubleshooting

### Can't push to GitHub?
- **SSH not working?** → Use Option B (Personal Access Token)
- **Token not working?** → Make sure you selected `repo` scope
- **Still stuck?** → Use GitHub Desktop app

### Deployment fails?
- **FTP credentials wrong?** → Double-check in Hostinger
- **Path incorrect?** → Try `/public_html` or `/www` or `/domains/aravindmaya.com/public_html`
- **Files not uploading?** → Check GitHub Actions logs for errors

### Website not updating?
- Clear browser cache (Cmd+Shift+R)
- Check if files are in correct directory
- Verify deployment actually completed

---

## Quick Commands Reference

```bash
# Check status
git status

# Push to GitHub (after authentication setup)
git push origin main

# Check remote URL
git remote -v

# View SSH key
cat ~/.ssh/id_ed25519.pub
```

---

## Next Steps After Deployment

1. ✅ Enable SSL certificate in Hostinger (required for service worker)
2. ✅ Test all pages and functionality
3. ✅ Set up custom domain if needed
4. ✅ Monitor GitHub Actions for future deployments

**Need help?** Check `TROUBLESHOOTING.md` for more details.


