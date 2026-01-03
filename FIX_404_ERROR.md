# Fix 404 Error on www.aravindmaya.com

## Possible Causes

1. **Deployment failed** - Check GitHub Actions
2. **Wrong server path** - Files might be in wrong directory
3. **Domain not configured** - Domain might not point to Hostinger
4. **Files not uploaded** - Deployment didn't complete

## Step 1: Check GitHub Actions Status

1. Go to: https://github.com/aravindmaya/aravindmaya.portfolio.github.io/actions
2. Click on the latest workflow run
3. Check if it shows:
   - ✅ **Green checkmark** = Deployment succeeded (but files might be in wrong place)
   - ❌ **Red X** = Deployment failed (check error message)
   - 🟡 **Yellow dot** = Still running (wait for it)

## Step 2: Check Deployment Logs

If deployment succeeded but you get 404:

1. **Click on the workflow run**
2. **Click on "Deploy to Hostinger" step**
3. **Look for:**
   - "Uploaded X files" message
   - Any error messages
   - The server path it used

## Step 3: Verify Server Path

The workflow uses `/public_html/` but Hostinger might use:
- `/public_html/`
- `/www/`
- `/domains/aravindmaya.com/public_html/`
- `/domains/www.aravindmaya.com/public_html/`

## Step 4: Check via Hostinger File Manager

1. **Log in to Hostinger hPanel**
2. **Go to Files → File Manager**
3. **Check these locations:**
   - Is there a `public_html` folder?
   - Does it contain `index.html`?
   - What's the exact path structure?

## Common Fixes

### Fix 1: Update Server Path in Workflow

If files are in a different directory, I can update the workflow file.

### Fix 2: Check Domain Configuration

1. In Hostinger hPanel → **Domains**
2. Make sure `aravindmaya.com` is connected
3. Check if `www.aravindmaya.com` is set up

### Fix 3: Manual Upload Test

1. Upload `index.html` manually via File Manager
2. See if it works
3. This confirms the correct path

## What to Tell Me

Please share:
1. **GitHub Actions status** (success/failed/running)
2. **Any error messages** from the workflow
3. **File Manager path** you see in Hostinger
4. **Domain status** in Hostinger

Then I can fix the workflow path or help troubleshoot!


