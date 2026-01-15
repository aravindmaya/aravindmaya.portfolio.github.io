// Google Analytics 4 (GA4) Configuration
// Replace 'G-XXXXXXXXXX' with your actual GA4 Measurement ID
const GA4_MEASUREMENT_ID = 'G-LX6ZJQBQM8'; // Your GA4 Measurement ID

// Initialize Google Analytics 4
(function() {
  // Load gtag.js
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA4_MEASUREMENT_ID, {
    page_path: window.location.pathname + window.location.search,
    page_title: document.title,
    page_location: window.location.href
  });
})();

// Track page views
function trackPageView(pageName, pagePath) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'page_view', {
      page_title: pageName,
      page_location: window.location.href,
      page_path: pagePath
    });
  }
}

// Track project views
function trackProjectView(projectName) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'view_project', {
      project_name: projectName,
      page_path: window.location.pathname,
      page_title: document.title
    });
  }
}

// Track engagement metrics
let engagementStartTime = Date.now();
let maxScrollDepth = 0;
let scrollCheckInterval;

// Track scroll depth
function trackScrollDepth() {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollPercent = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);
  
  if (scrollPercent > maxScrollDepth) {
    maxScrollDepth = scrollPercent;
    
    // Track milestones: 25%, 50%, 75%, 100%
    if (scrollPercent >= 25 && maxScrollDepth < 50) {
      trackEvent('scroll', { scroll_depth: 25 });
    } else if (scrollPercent >= 50 && maxScrollDepth < 75) {
      trackEvent('scroll', { scroll_depth: 50 });
    } else if (scrollPercent >= 75 && maxScrollDepth < 100) {
      trackEvent('scroll', { scroll_depth: 75 });
    } else if (scrollPercent >= 100) {
      trackEvent('scroll', { scroll_depth: 100 });
    }
  }
}

// Track time on page
function trackTimeOnPage() {
  const timeOnPage = Math.round((Date.now() - engagementStartTime) / 1000); // in seconds
  
  // Track milestones: 30s, 1min, 2min, 5min
  if (timeOnPage === 30) {
    trackEvent('engagement_time', { time_seconds: 30 });
  } else if (timeOnPage === 60) {
    trackEvent('engagement_time', { time_seconds: 60 });
  } else if (timeOnPage === 120) {
    trackEvent('engagement_time', { time_seconds: 120 });
  } else if (timeOnPage === 300) {
    trackEvent('engagement_time', { time_seconds: 300 });
  }
}

// Generic event tracking
function trackEvent(eventName, eventParams = {}) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, {
      ...eventParams,
      page_path: window.location.pathname,
      page_title: document.title
    });
  }
}

// Track link clicks
function trackLinkClick(linkText, linkUrl) {
  trackEvent('click', {
    link_text: linkText,
    link_url: linkUrl,
    event_category: 'outbound'
  });
}

// Track resume downloads
function trackResumeDownload() {
  trackEvent('download', {
    file_name: 'resume',
    file_type: 'pdf',
    event_category: 'download'
  });
}

// Initialize engagement tracking when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Track scroll depth
  window.addEventListener('scroll', trackScrollDepth);
  
  // Track time on page every 10 seconds
  scrollCheckInterval = setInterval(trackTimeOnPage, 10000);
  
  // Track link clicks
  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', function() {
      const linkText = this.textContent.trim() || this.getAttribute('aria-label') || 'Unknown';
      const linkUrl = this.href;
      
      // Track outbound links
      if (linkUrl && !linkUrl.includes(window.location.hostname)) {
        trackLinkClick(linkText, linkUrl);
      }
      
      // Track resume downloads
      if (linkUrl && linkUrl.includes('Resume') && linkUrl.includes('.pdf')) {
        trackResumeDownload();
      }
    });
  });
  
  // Detect project pages and track them
  const path = window.location.pathname;
  if (path.includes('/projects/')) {
    const projectName = path.split('/projects/')[1]?.replace('.html', '') || 'unknown';
    trackProjectView(projectName);
  }
  
  // Track page view
  trackPageView(document.title, path);
});

// Track engagement when user leaves page
window.addEventListener('beforeunload', function() {
  const totalTime = Math.round((Date.now() - engagementStartTime) / 1000);
  if (typeof gtag !== 'undefined') {
    gtag('event', 'page_engagement', {
      engagement_time_msec: totalTime * 1000,
      max_scroll_depth: maxScrollDepth,
      page_path: window.location.pathname
    });
  }
  
  if (scrollCheckInterval) {
    clearInterval(scrollCheckInterval);
  }
});

// Export functions for manual tracking if needed
window.analytics = {
  trackPageView,
  trackProjectView,
  trackEvent,
  trackLinkClick,
  trackResumeDownload
};
