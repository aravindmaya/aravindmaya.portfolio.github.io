// Add heading to nav#contents element
(function() {
  'use strict';
  
  function addHeadingToContents() {
    const contentsNav = document.getElementById('contents');
    
    if (contentsNav) {
      // Check if heading already exists to avoid duplicates
      if (contentsNav.querySelector('h2, h3, h4')) {
        return;
      }
      
      // Create heading element
      const heading = document.createElement('h4');
      heading.textContent = 'Contents';
      heading.className = 'mb-2 font-semibold';
      heading.style.marginBottom = '0.5rem';
      
      // Insert heading at the beginning of the nav element
      contentsNav.insertBefore(heading, contentsNav.firstChild);
    }
  }
  
  // Try to add heading when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addHeadingToContents);
  } else {
    // DOM is already ready
    addHeadingToContents();
  }
  
  // Also try after a short delay in case content is rendered dynamically
  setTimeout(addHeadingToContents, 100);
  setTimeout(addHeadingToContents, 500);
  setTimeout(addHeadingToContents, 1000);
  
  // Use MutationObserver to watch for the element being added dynamically
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length) {
        addHeadingToContents();
      }
    });
  });
  
  // Start observing the document body for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();





















