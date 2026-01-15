# How to Check if Analytics is Working

## ✅ Quick Check (Takes 2 minutes)

### Step 1: Visit Your Website
1. Go to: **https://www.aravindmaya.com**
2. Navigate to a few different pages (home, about, a project page)

### Step 2: Check Google Analytics Real-time
1. Open a new tab and go to: **https://analytics.google.com/**
2. Click **"Reports"** in the left sidebar
3. Click **"Realtime"** (under Reports)
4. You should see:
   - **Active users right now**: Should show at least 1 (you!)
   - **Page views in last 30 minutes**: Should show your page views
   - **Top pages**: Should show the pages you just visited

**If you see your visit here, analytics is working! ✅**

---

## 🔍 Detailed Verification Methods

### Method 1: Browser Console Check

1. **Visit your website**: https://www.aravindmaya.com
2. **Open Developer Tools**:
   - **Windows/Linux**: Press `F12` or `Ctrl + Shift + I`
   - **Mac**: Press `Cmd + Option + I`
3. **Go to Console tab**
4. **Type these commands one by one**:

```javascript
gtag
```
- ✅ **If you see**: `ƒ gtag() { [native code] }` or similar → Analytics is loaded!

```javascript
dataLayer
```
- ✅ **If you see**: An array with objects → Analytics is tracking!

```javascript
window.dataLayer.length
```
- ✅ **If you see**: A number greater than 0 → Events are being tracked!

### Method 2: Network Tab Check

1. **Visit your website**
2. **Open Developer Tools** (`F12`)
3. **Go to Network tab**
4. **Filter by typing**: `gtag` or `collect` in the filter box
5. **Refresh the page** (`F5` or `Cmd+R`)
6. **Look for these requests**:
   - ✅ `www.googletagmanager.com/gtag/js?id=G-520109058`
   - ✅ `www.google-analytics.com/g/collect?...`

**If you see these requests, analytics is working! ✅**

### Method 3: Google Tag Assistant (Most Reliable)

1. **Install the extension**:
   - Chrome: https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk
   - Or search "Google Tag Assistant" in Chrome Web Store
2. **Visit your website**: https://www.aravindmaya.com
3. **Click the Tag Assistant icon** in your browser toolbar
4. **Click "Enable"**
5. **Refresh your page**
6. **You should see**:
   - ✅ Green checkmark with "Google Analytics: GA4 Configuration"
   - ✅ Your Measurement ID: `G-520109058`

**If you see the green checkmark, analytics is working! ✅**

### Method 4: View Page Source

1. **Visit your website**
2. **Right-click** → **"View Page Source"** (or press `Ctrl+U` / `Cmd+Option+U`)
3. **Press `Ctrl+F`** (or `Cmd+F`) to search
4. **Search for**: `analytics.js`
5. **You should see**: `<script src="analytics.js"></script>` in the `<head>` section

**If you see this, the script is included! ✅**

---

## 📊 What You Should See in Google Analytics

### Real-time Report (Shows immediately)
- **Active users**: You (and anyone else currently on the site)
- **Page views**: Pages being viewed right now
- **Top pages**: Most viewed pages in last 30 minutes
- **Top events**: Events like scroll depth, time on page

### Standard Reports (Shows after 24-48 hours)
- **Reports → Engagement → Pages and screens**: Most popular pages
- **Reports → Acquisition**: Where your traffic comes from
- **Reports → Engagement → Events**: 
  - `view_project` - Which projects are viewed
  - `scroll` - Scroll depth (25%, 50%, 75%, 100%)
  - `engagement_time` - Time on page
  - `click` - Link clicks
  - `download` - Resume downloads

---

## ❌ Troubleshooting

### Problem: Not seeing data in Real-time

**Check 1: Is the script deployed?**
- Make sure you've pushed your changes to GitHub
- Wait a few minutes for GitHub Pages to update
- Try visiting your site in an incognito/private window

**Check 2: Ad blockers**
- Ad blockers can block Google Analytics
- Try disabling your ad blocker
- Or test in an incognito/private window

**Check 3: Correct Measurement ID**
- Open `analytics.js` in your project
- Verify line 3 shows: `const GA4_MEASUREMENT_ID = 'G-520109058';`
- Make sure there are no extra spaces or quotes

**Check 4: Browser console errors**
- Press `F12` → Console tab
- Look for red error messages
- If you see errors about `analytics.js`, the file might not be loading

### Problem: Script not loading

**Check file path:**
- Make sure `analytics.js` is in the root folder
- For project pages, it should be `../analytics.js` (one folder up)
- Verify the file exists at: `https://www.aravindmaya.com/analytics.js`

**Check file permissions:**
- Make sure the file is committed to your repository
- Check that it's not in `.gitignore`

---

## ✅ Quick Verification Checklist

After deploying your changes:

- [ ] Visit your website: https://www.aravindmaya.com
- [ ] Navigate to 2-3 different pages
- [ ] Open Google Analytics → Reports → Realtime
- [ ] See your visit appear (within 10-30 seconds)
- [ ] See page views counting up
- [ ] See pages you visited in "Top pages"

**If all checked, analytics is working perfectly! 🎉**

---

## 🎯 Expected Timeline

- **Real-time data**: Shows up within 10-30 seconds ✅
- **Standard reports**: Takes 24-48 hours to populate
- **Historical data**: Available after first 24 hours

---

## 💡 Pro Tip

**Test it right now:**
1. Open Google Analytics in one tab
2. Go to Reports → Realtime
3. Open your website in another tab
4. Navigate around your site
5. Watch yourself appear in real-time! 🎉

This is the fastest way to verify everything is working!
