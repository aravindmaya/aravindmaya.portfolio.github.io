# GitHub Secrets Setup - Quick Reference

## Your FTP Credentials

- **FTP_HOST:** `89.117.9.216` (remove ftp://)
- **FTP_USERNAME:** `u236519824`
- **FTP_PASSWORD:** `Hostinger**12`

## Step-by-Step: Add to GitHub

1. **Go to GitHub Secrets:**
   - Open: https://github.com/aravindmaya/aravindmaya.portfolio.github.io/settings/secrets/actions

2. **Add FTP_HOST:**
   - Click **"New repository secret"**
   - **Name:** `FTP_HOST`
   - **Secret:** `89.117.9.216` (just the IP, no ftp://)
   - Click **"Add secret"**

3. **Add FTP_USERNAME:**
   - Click **"New repository secret"** again
   - **Name:** `FTP_USERNAME`
   - **Secret:** `u236519824`
   - Click **"Add secret"**

4. **Add FTP_PASSWORD:**
   - Click **"New repository secret"** again
   - **Name:** `FTP_PASSWORD`
   - **Secret:** `Hostinger**12`
   - Click **"Add secret"**

## After Adding Secrets

1. **Go to Actions:**
   - https://github.com/aravindmaya/aravindmaya.portfolio.github.io/actions

2. **Run Workflow:**
   - Click **"Deploy to Hostinger"** (left sidebar)
   - Click **"Run workflow"** (top right)
   - Select branch: `main`
   - Click **"Run workflow"** button

3. **Watch It Deploy:**
   - Click on the running workflow
   - You'll see real-time deployment progress
   - Green checkmark ✅ = Success!

## Important Notes

- **FTP_HOST:** Use just `89.117.9.216` (no `ftp://` prefix)
- **Secrets are encrypted:** GitHub stores them securely
- **After first deployment:** Every `git push` will auto-deploy

## Troubleshooting

If deployment fails:
- Check the Actions logs for error messages
- Verify the server path is `/public_html/`
- Make sure FTP is enabled in Hostinger

