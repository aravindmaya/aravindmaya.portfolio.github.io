# Troubleshooting Deployment Issues

## Common Issues and Solutions

### Issue 1: GitHub Actions Workflow Not Running

**Symptoms:**
- Workflow doesn't trigger on push
- Workflow fails with "secrets not found" error

**Solutions:**

1. **Check if secrets are set:**
   - Go to: https://github.com/aravindmaya/aravindmaya.portfolio.github.io/settings/secrets/actions
   - Make sure these secrets exist:
     - `FTP_HOST`
     - `FTP_USERNAME`
     - `FTP_PASSWORD`

2. **Get FTP credentials from Hostinger:**
   - Log in to Hostinger hPanel
   - Go to **Files** → **FTP Accounts**
   - Copy the FTP host, username, and password
   - Add them as GitHub secrets

3. **Check workflow file location:**
   - Must be in: `.github/workflows/deploy.yml`
   - File must be committed and pushed to GitHub

4. **Manually trigger workflow:**
   - Go to **Actions** tab in GitHub
   - Select "Deploy to Hostinger" workflow
   - Click "Run workflow"

### Issue 2: Hostinger Git Integration Not Available

**Symptoms:**
- Can't find "Git" option in Hostinger hPanel
- Git integration feature not available

**Solutions:**

1. **Check your Hostinger plan:**
   - Some plans don't include Git integration
   - Use GitHub Actions method instead (see Issue 1)

2. **Alternative: Use File Manager:**
   - Download your repo as ZIP from GitHub
   - Extract and upload via File Manager

### Issue 3: Files Showing as Deleted in Git

**Symptoms:**
- `git status` shows many files as deleted
- Files exist on disk but Git thinks they're gone

**Solutions:**

1. **Restore deleted files:**
   ```bash
   git restore .
   ```

2. **Or commit the deletions if intentional:**
   ```bash
   git add -A
   git commit -m "Remove unused files"
   ```

3. **Check .gitignore:**
   - Make sure important files aren't being ignored
   - Files in `.gitignore` won't be tracked

### Issue 4: Deployment Fails with FTP Errors

**Symptoms:**
- GitHub Actions fails with FTP connection errors
- "Connection refused" or "Authentication failed"

**Solutions:**

1. **Verify FTP credentials:**
   - Double-check FTP_HOST, FTP_USERNAME, FTP_PASSWORD
   - Make sure no extra spaces in secrets

2. **Check FTP server path:**
   - Try `/public_html` or `/www` or `/domains/yourdomain.com/public_html`
   - Contact Hostinger support for correct path

3. **Test FTP connection:**
   - Use FileZilla to test credentials manually
   - Make sure FTP is enabled in Hostinger

### Issue 5: Website Not Updating After Deployment

**Symptoms:**
- Deployment succeeds but website doesn't change
- Old version still showing

**Solutions:**

1. **Clear browser cache:**
   - Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

2. **Check deployment directory:**
   - Verify files are in correct folder (`public_html`)
   - Check if there are multiple domains/subdomains

3. **Check deployment logs:**
   - In GitHub Actions, check the deployment log
   - Verify files were actually uploaded

### Issue 6: Can't Commit Changes

**Symptoms:**
- Git commit fails
- Permission errors

**Solutions:**

1. **Check Git configuration:**
   ```bash
   git config user.name
   git config user.email
   ```

2. **Set Git user if needed:**
   ```bash
   git config user.name "Your Name"
   git config user.email "your.email@example.com"
   ```

3. **Check repository permissions:**
   - Make sure you have write access to the GitHub repo

## Quick Diagnostic Commands

Run these to check your setup:

```bash
# Check Git status
git status

# Check if workflow file exists
ls -la .github/workflows/

# Check remote repository
git remote -v

# Test FTP connection (if you have FTP client)
# Use FileZilla or similar to test credentials
```

## Still Having Issues?

1. **Check GitHub Actions logs:**
   - Go to Actions tab → Click on failed workflow → Check logs

2. **Contact Hostinger Support:**
   - They can verify FTP settings and paths

3. **Try manual upload first:**
   - Upload via File Manager to verify everything works
   - Then set up automated deployment

