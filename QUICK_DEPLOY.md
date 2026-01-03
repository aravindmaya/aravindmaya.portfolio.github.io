# 🚀 Quick Deploy Steps

## Step 1: Add SSH Key to GitHub

**Your SSH Key (ed25519):**
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKDdYQsUFaNmFIkcGXFoJzTN8ooI9tDVkH3oH8kKzR+P hostinger
```

**Add it to GitHub:**
1. Go to: https://github.com/settings/ssh/new
2. **Title:** "MacBook - Hostinger Key"
3. **Key:** Paste the key above
4. Click **"Add SSH key"**

## Step 2: Test Connection

After adding, run:
```bash
ssh -T git@github.com
```

You should see: "Hi aravindmaya! You've successfully authenticated..."

## Step 3: Push Code

```bash
git push origin main
```

## Step 4: Set Up Hostinger Deployment

After code is pushed to GitHub:

### Option A: GitHub Actions (Automated)

1. **Get FTP credentials:**
   - Hostinger hPanel → Files → FTP Accounts
   - Note: FTP Host, Username, Password

2. **Add GitHub Secrets:**
   - Go to: https://github.com/aravindmaya/aravindmaya.portfolio.github.io/settings/secrets/actions
   - Add 3 secrets:
     - `FTP_HOST` = (your FTP host)
     - `FTP_USERNAME` = (your FTP username)
     - `FTP_PASSWORD` = (your FTP password)

3. **Deploy:**
   - Go to: https://github.com/aravindmaya/aravindmaya.portfolio.github.io/actions
   - Click "Run workflow" → "Run workflow"
   - Or just push to main - it auto-deploys!

### Option B: Hostinger Git Integration

1. Hostinger hPanel → Files → Git
2. Connect with GitHub
3. Select your repo
4. Deploy directory: `/public_html`
5. Enable auto-deploy

---

**The RSA key you provided looks like a Hostinger server key - use that for Hostinger SSH access, not GitHub.**


