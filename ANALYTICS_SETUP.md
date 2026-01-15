# Analytics Setup Guide for www.aravindmaya.com

This guide will help you set up Google Analytics 4 (GA4) to track visitors, project views, and engagement on your portfolio website.

## What's Already Set Up

✅ Analytics script (`analytics.js`) has been added to all HTML pages
✅ Automatic tracking for:
- Page views
- Project page views
- Scroll depth (25%, 50%, 75%, 100%)
- Time on page (30s, 1min, 2min, 5min)
- Link clicks (outbound links)
- Resume downloads
- Engagement metrics

## Step 1: Create a Google Analytics 4 Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click **"Start measuring"** or **"Admin"** → **"Create Account"**
4. Fill in your account details:
   - Account name: `Aravindh Maya Portfolio` (or your preference)
   - Click **"Next"**

## Step 2: Create a Property

1. Property name: `aravindmaya.com`
2. Reporting time zone: Choose your timezone
3. Currency: Choose your currency
4. Click **"Next"**

## Step 3: Set Up Data Stream

1. Choose **"Web"** as your platform
2. Enter your website URL: `https://www.aravindmaya.com`
3. Stream name: `aravindmaya.com` (or your preference)
4. Click **"Create stream"**

## Step 4: Get Your Measurement ID

1. After creating the stream, you'll see your **Measurement ID**
2. It will look like: `G-XXXXXXXXXX`
3. Copy this ID

## Step 5: Add Your Measurement ID to the Website

1. Open the file `analytics.js` in your project root
2. Find this line:
   ```javascript
   const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Replace with your GA4 Measurement ID
   ```
3. Replace `'G-XXXXXXXXXX'` with your actual Measurement ID:
   ```javascript
   const GA4_MEASUREMENT_ID = 'G-ABC123XYZ'; // Your actual ID
   ```
4. Save the file

## Step 6: Deploy Your Changes

1. Commit and push your changes to your repository
2. If using GitHub Pages, the changes will deploy automatically
3. If using another hosting service, deploy as usual

## Step 7: Verify Analytics is Working

1. Visit your website: `https://www.aravindmaya.com`
2. Navigate to different pages and projects
3. In Google Analytics, go to **Reports** → **Realtime**
4. You should see your visit appear within a few seconds

## What You Can Track

Once set up, you'll be able to see:

### Visitor Information
- **Who visits**: Geographic location, device type, browser
- **Traffic sources**: Where visitors come from (direct, search, social media, etc.)
- **New vs Returning visitors**

### Project Engagement
- **Which projects are viewed**: Track which project pages get the most views
- **Project popularity**: See which projects visitors spend the most time on
- **Project navigation**: Understand how visitors move between projects

### Engagement Metrics
- **Time on page**: How long visitors stay on each page
- **Scroll depth**: How far visitors scroll (25%, 50%, 75%, 100%)
- **Bounce rate**: Percentage of single-page sessions
- **Pages per session**: How many pages visitors view per visit

### User Actions
- **Link clicks**: Which external links are clicked
- **Resume downloads**: Track when visitors download your resume
- **Navigation patterns**: How visitors move through your site

## Viewing Your Analytics Data

### Real-time Reports
- Go to **Reports** → **Realtime** in Google Analytics
- See visitors on your site right now

### Standard Reports
- **Reports** → **Engagement** → **Pages and screens**: See which pages are most popular
- **Reports** → **Acquisition**: See where your traffic comes from
- **Reports** → **Engagement** → **Events**: See custom events like project views and scroll depth

### Custom Reports
You can create custom reports to track:
- Most viewed projects
- Average time spent per project
- Visitor journey through your portfolio

## Troubleshooting

### Analytics not showing data?
1. **Check your Measurement ID**: Make sure it's correctly set in `analytics.js`
2. **Wait 24-48 hours**: Some reports may take time to populate
3. **Check browser console**: Open DevTools (F12) and look for any JavaScript errors
4. **Verify script is loaded**: Check that `analytics.js` is loading in the Network tab

### Events not tracking?
1. Check that the `analytics.js` file is accessible at the correct path
2. Verify there are no JavaScript errors in the browser console
3. Make sure you're not using an ad blocker (they can block analytics)

## Privacy Considerations

- Google Analytics collects anonymous data
- Consider adding a privacy policy to your website
- You can configure data retention settings in GA4
- Users can opt out using browser extensions or settings

## Next Steps

1. Set up your Measurement ID (Step 5 above)
2. Deploy your changes
3. Visit your site to generate some test data
4. Check Google Analytics in 24-48 hours for full reports
5. Set up custom reports for the metrics most important to you

## Need Help?

- [Google Analytics Help Center](https://support.google.com/analytics)
- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)

---

**Note**: The analytics script is already added to all your HTML pages. You just need to add your Measurement ID and deploy!
