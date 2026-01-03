# Solutions When There's No FTP Password

## Option 1: Create FTP Account in Hostinger (Recommended)

If you don't have FTP credentials, create them:

1. **Log in to Hostinger hPanel:**
   - Go to: https://hpanel.hostinger.com

2. **Create FTP Account:**
   - Go to **Files** → **FTP Accounts**
   - Click **"Create FTP Account"** or **"Add FTP Account"**
   - Fill in:
     - **FTP Username:** (choose a username, e.g., `aravindmaya` or `deploy`)
     - **FTP Password:** (create a strong password)
     - **Directory:** `/public_html` (or leave default)
   - Click **"Create"**

3. **Use These Credentials:**
   - FTP Host: Usually `ftp.aravindmaya.com` or your server IP
   - FTP Username: The username you just created
   - FTP Password: The password you just created

4. **Add to GitHub Secrets:**
   - Use these new credentials in GitHub Actions

## Option 2: Use Hostinger Git Integration (Easiest - No FTP!)

This doesn't require FTP at all:

1. **In Hostinger hPanel:**
   - Go to **Files** → **Git**
   - If you don't see "Git", it might not be available on your plan

2. **Connect GitHub:**
   - Click **"Create Repository"** or **"Connect Repository"**
   - Click **"Connect with GitHub"**
   - Authorize Hostinger to access GitHub
   - Select repository: `aravindmaya/aravindmaya.portfolio.github.io`
   - Branch: `main`
   - Deployment directory: `/public_html`

3. **Enable Auto-Deploy:**
   - Toggle "Auto Deploy" ON
   - Click **"Deploy Now"**

**Done!** No FTP needed. Every push to GitHub auto-deploys.

## Option 3: Use SSH Deployment (If Available)

If Hostinger supports SSH:

1. **Enable SSH in Hostinger:**
   - Go to **Advanced** → **SSH Access**
   - Generate SSH keys or use existing ones

2. **Update GitHub Actions Workflow:**
   - I can modify the workflow to use SSH instead of FTP
   - Requires SSH credentials instead of FTP

3. **Deploy via SSH:**
   - Uses `rsync` or `scp` instead of FTP

## Option 4: Use Main Hosting Account Credentials

Sometimes your main hosting account can be used for FTP:

1. **Check Hostinger Account:**
   - Your main hosting account might have FTP access
   - Check **Files** → **File Manager** - sometimes shows FTP info there

2. **Contact Hostinger Support:**
   - Ask them for FTP credentials
   - Or ask for the correct FTP host/username/password

## Option 5: Manual Upload (One-Time)

If all else fails, manual upload works:

1. **Download from GitHub:**
   - Go to: https://github.com/aravindmaya/aravindmaya.portfolio.github.io
   - Click **"Code"** → **"Download ZIP"**
   - Extract the ZIP file

2. **Upload via File Manager:**
   - Hostinger hPanel → **Files** → **File Manager**
   - Navigate to `public_html`
   - Upload all files and folders
   - Maintain exact folder structure

## Which Option Should You Use?

**Best Choice:** Option 2 (Hostinger Git Integration)
- ✅ No FTP needed
- ✅ Automatic deployment
- ✅ Easiest to set up
- ✅ Works directly with GitHub

**If Git Integration Not Available:** Option 1 (Create FTP Account)
- ✅ Full control
- ✅ Works with GitHub Actions
- ✅ Standard method

## Quick Decision Tree

```
Do you see "Git" in Hostinger hPanel?
├─ YES → Use Option 2 (Git Integration) ⭐ EASIEST
└─ NO → Create FTP Account (Option 1)
         └─ Still can't? → Contact Hostinger Support
```

## Need Help?

1. **Check Hostinger Plan:**
   - Some plans don't include Git integration
   - All plans should have FTP access

2. **Contact Hostinger Support:**
   - They can help you set up FTP
   - Or confirm if Git integration is available
   - Live chat: Usually available in hPanel

3. **Check Hostinger Documentation:**
   - https://support.hostinger.com
   - Search for "FTP" or "Git deployment"

