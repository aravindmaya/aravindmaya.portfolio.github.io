# Hostinger Deployment Guide for www.aravindmaya.com

This guide will help you deploy your portfolio website to Hostinger hosting.

## Prerequisites

1. Access to your Hostinger hosting account
2. FTP credentials or File Manager access
3. All website files ready in this directory

## Deployment Methods

### Method 1: Using Hostinger File Manager (Recommended for beginners)

1. **Log in to Hostinger**
   - Go to https://hpanel.hostinger.com
   - Log in with your credentials

2. **Access File Manager**
   - Navigate to **Files** → **File Manager**
   - Open the `public_html` folder (or `www` folder if that's your domain root)

3. **Upload Files**
   - Delete any default files in `public_html` (like index.html, cpanel-default.html, etc.)
   - Upload ALL files and folders from your local project:
     - `index.html` (must be in root)
     - `about.html`
     - `fun.html`
     - `_next/` folder (entire folder)
     - `Images/` folder (entire folder)
     - `projects/` folder (entire folder)
     - `home/` folder
     - `videos/` folder
     - All root files: `favicon.ico`, `favicon.svg`, `manifest.json`, `sw.js`, etc.
   - **Important**: Maintain the exact folder structure

4. **Verify Upload**
   - Make sure `index.html` is in the root of `public_html`
   - Check that all folders are uploaded correctly

5. **Test Your Website**
   - Visit `www.aravindmaya.com` in your browser
   - Test all pages: `/about.html`, `/fun.html`, `/projects/`, etc.

### Method 2: Using FTP Client (Faster for large files)

1. **Get FTP Credentials**
   - In Hostinger hPanel, go to **Files** → **FTP Accounts**
   - Note your FTP host, username, and password

2. **Connect via FTP Client**
   - Use FileZilla, Cyberduck, or any FTP client
   - Connect using your FTP credentials
   - Navigate to `public_html` directory

3. **Upload Files**
   - Upload all files maintaining the folder structure
   - Set transfer mode to "Binary" for images and media files
   - Set transfer mode to "ASCII" for text files (HTML, CSS, JS)

4. **Set Permissions** (if needed)
   - Folders: 755
   - Files: 644

## Important Files to Upload

```
public_html/
├── index.html (ROOT - very important!)
├── about.html
├── fun.html
├── favicon.ico
├── favicon.svg
├── manifest.json
├── sw.js
├── _next/ (entire folder with all contents)
├── Images/ (entire folder with all contents)
├── projects/ (entire folder with all contents)
├── home/ (entire folder)
├── videos/ (entire folder)
└── [all other root files]
```

## Post-Deployment Checklist

- [ ] Website loads at www.aravindmaya.com
- [ ] All images display correctly
- [ ] Navigation links work
- [ ] All project pages load (`/projects/google.html`, etc.)
- [ ] About page works (`/about.html`)
- [ ] Fun page works (`/fun.html`)
- [ ] Service worker registers (check browser console)
- [ ] Favicon displays correctly
- [ ] Mobile responsive design works
- [ ] Dark mode toggle works (if applicable)

## Troubleshooting

### Issue: 404 Errors on Pages
- **Solution**: Make sure all HTML files are uploaded and paths are correct
- Check that folder structure matches exactly

### Issue: Images Not Loading
- **Solution**: Verify `Images/` folder is uploaded completely
- Check image paths in HTML files (should be relative paths like `/Images/...`)

### Issue: CSS/JS Not Loading
- **Solution**: Ensure `_next/` folder is uploaded completely
- Check browser console for 404 errors on specific files

### Issue: Service Worker Not Working
- **Solution**: Make sure `sw.js` is in the root directory
- Check that HTTPS is enabled (service workers require HTTPS)

## SSL Certificate

1. **Enable SSL in Hostinger**
   - Go to **SSL** in hPanel
   - Install a free SSL certificate (Let's Encrypt)
   - This is required for service workers to work

## Domain Configuration

1. **Point Domain to Hostinger**
   - In Hostinger, go to **Domains**
   - Add your domain `aravindmaya.com`
   - Update DNS records if needed:
     - A record: Points to Hostinger IP
     - CNAME for www: Points to your domain

## Performance Optimization

After deployment, you can:
1. Enable GZIP compression (usually enabled by default)
2. Set up caching headers (see `.htaccess` file)
3. Optimize images if needed

## Need Help?

- Hostinger Support: https://www.hostinger.com/contact
- Check Hostinger documentation: https://support.hostinger.com


