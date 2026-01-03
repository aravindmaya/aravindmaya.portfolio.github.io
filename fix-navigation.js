// Fix navigation by unregistering service worker and clearing cache (optional - uncomment if needed)
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.getRegistrations().then(function(registrations) {
//     for(let registration of registrations) {
//       registration.unregister();
//       console.log('Service worker unregistered');
//     }
//   });
// }

// Clear all caches (optional - uncomment if needed)
// if ('caches' in window) {
//   caches.keys().then(function(names) {
//     for (let name of names) {
//       caches.delete(name);
//       console.log('Cache deleted:', name);
//     }
//   });
// }

// Override Next.js routing to allow normal navigation
document.addEventListener('DOMContentLoaded', function() {
  // Find all links that should use normal navigation
  const links = document.querySelectorAll('a[href]');
  
  links.forEach(function(link) {
    const href = link.getAttribute('href');
    
    // Only override internal HTML links
    if (href && 
        !href.startsWith('http') && 
        !href.startsWith('mailto:') && 
        !href.startsWith('#') &&
        !href.startsWith('javascript:') &&
        (href.includes('.html') || href.startsWith('/') || href.startsWith('./')) &&
        link.target !== '_blank') {
      
      link.addEventListener('click', function(e) {
        // Prevent Next.js from intercepting the click
        e.preventDefault();
        e.stopImmediatePropagation();
        
        // Use normal navigation instead of Next.js routing
        window.location.href = href;
      }, true); // Use capture phase to intercept before Next.js
    }
  });
  
  console.log('Navigation override applied to', links.length, 'links');
});
