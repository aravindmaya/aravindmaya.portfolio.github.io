/**
 * Visual Editor for Static HTML Site
 * Allows inline editing of content directly on the page
 */

(function() {
  'use strict';

  // Configuration
  const EDITOR_CONFIG = {
    enabled: false,
    storageKey: 'visualEditorEnabled',
    editButtonText: '✏️ Edit',
    saveButtonText: '💾 Save',
    cancelButtonText: '❌ Cancel',
    toggleKey: 'e', // Press 'e' key to toggle editor
    requireCtrl: true // Require Ctrl/Cmd key with 'e'
  };

  // Check if editor should be enabled from localStorage
  if (localStorage.getItem(EDITOR_CONFIG.storageKey) === 'true') {
    EDITOR_CONFIG.enabled = true;
  }

  // Create editor UI
  function createEditorUI() {
    const editorBar = document.createElement('div');
    editorBar.id = 'visual-editor-bar';
    editorBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 12px 20px;
      z-index: 10000;
      display: ${EDITOR_CONFIG.enabled ? 'flex' : 'none'};
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
    `;

    const leftSection = document.createElement('div');
    leftSection.style.cssText = 'display: flex; align-items: center; gap: 15px;';

    const statusIndicator = document.createElement('div');
    statusIndicator.id = 'editor-status';
    statusIndicator.textContent = '✏️ Visual Editor Active';
    statusIndicator.style.cssText = 'font-weight: 600;';

    const instructions = document.createElement('div');
    instructions.textContent = 'Click any text to edit | Press Ctrl+E to toggle';
    instructions.style.cssText = 'opacity: 0.9; font-size: 12px;';

    leftSection.appendChild(statusIndicator);
    leftSection.appendChild(instructions);

    const rightSection = document.createElement('div');
    rightSection.style.cssText = 'display: flex; align-items: center; gap: 10px;';

    const saveBtn = document.createElement('button');
    saveBtn.id = 'editor-save-btn';
    saveBtn.textContent = EDITOR_CONFIG.saveButtonText;
    saveBtn.style.cssText = `
      background: rgba(255,255,255,0.2);
      border: 1px solid rgba(255,255,255,0.3);
      color: white;
      padding: 6px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
      transition: all 0.2s;
    `;
    saveBtn.onmouseover = () => saveBtn.style.background = 'rgba(255,255,255,0.3)';
    saveBtn.onmouseout = () => saveBtn.style.background = 'rgba(255,255,255,0.2)';

    const cancelBtn = document.createElement('button');
    cancelBtn.id = 'editor-cancel-btn';
    cancelBtn.textContent = EDITOR_CONFIG.cancelButtonText;
    cancelBtn.style.cssText = saveBtn.style.cssText;

    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'editor-toggle-btn';
    toggleBtn.textContent = EDITOR_CONFIG.enabled ? '👁️ View Mode' : EDITOR_CONFIG.editButtonText;
    toggleBtn.style.cssText = saveBtn.style.cssText;

    rightSection.appendChild(saveBtn);
    rightSection.appendChild(cancelBtn);
    rightSection.appendChild(toggleBtn);

    editorBar.appendChild(leftSection);
    editorBar.appendChild(rightSection);

    // Add padding to body when editor is active
    if (EDITOR_CONFIG.enabled) {
      document.body.style.paddingTop = '50px';
    }

    return editorBar;
  }

  // Make elements editable
  function makeEditable() {
    if (!EDITOR_CONFIG.enabled) return;

    const editableSelectors = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'span', 'div', 'a',
      'li', 'td', 'th',
      '[data-editable]'
    ];

    editableSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        // Skip if already editable or is a script/style element
        if (el.isContentEditable || el.tagName === 'SCRIPT' || el.tagName === 'STYLE') {
          return;
        }

        // Skip navigation and interactive elements
        if (el.closest('nav') || el.closest('button') || el.closest('input')) {
          return;
        }

        el.setAttribute('data-editable', 'true');
        el.style.cursor = 'text';
        el.style.outline = 'none';
        el.style.transition = 'background-color 0.2s';

        el.addEventListener('mouseenter', function() {
          if (EDITOR_CONFIG.enabled) {
            this.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
            this.style.borderRadius = '3px';
          }
        });

        el.addEventListener('mouseleave', function() {
          if (EDITOR_CONFIG.enabled) {
            this.style.backgroundColor = '';
          }
        });

        el.addEventListener('click', function(e) {
          if (!EDITOR_CONFIG.enabled) return;
          e.stopPropagation();
          makeElementEditable(this);
        });
      });
    });
  }

  // Make a specific element editable
  function makeElementEditable(element) {
    if (!EDITOR_CONFIG.enabled) return;

    element.contentEditable = true;
    element.style.backgroundColor = 'rgba(102, 126, 234, 0.15)';
    element.style.border = '2px dashed #667eea';
    element.style.borderRadius = '4px';
    element.style.padding = '4px';
    element.focus();

    // Save original content
    const originalContent = element.innerHTML;

    element.addEventListener('blur', function() {
      this.contentEditable = false;
      this.style.backgroundColor = '';
      this.style.border = '';
      this.style.padding = '';
    });

    element.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey && this.tagName !== 'P' && this.tagName !== 'DIV') {
        e.preventDefault();
        this.blur();
      }
      if (e.key === 'Escape') {
        this.innerHTML = originalContent;
        this.blur();
      }
    });
  }

  // Save changes
  function saveChanges() {
    const editableElements = document.querySelectorAll('[data-editable="true"]');
    const changes = {};

    editableElements.forEach((el, index) => {
      const id = el.id || `editable-${index}`;
      if (!el.id) el.id = id;
      changes[id] = {
        html: el.innerHTML,
        text: el.textContent,
        selector: getSelector(el)
      };
    });

    localStorage.setItem('visualEditorChanges', JSON.stringify(changes));
    
    // Show success message
    showNotification('Changes saved! (stored in browser localStorage)', 'success');
    
    // Optionally, you can send changes to a server here
    // sendChangesToServer(changes);
  }

  // Load saved changes
  function loadChanges() {
    const saved = localStorage.getItem('visualEditorChanges');
    if (!saved) return;

    try {
      const changes = JSON.parse(saved);
      Object.keys(changes).forEach(id => {
        const element = document.getElementById(id);
        if (element && changes[id].html) {
          element.innerHTML = changes[id].html;
        }
      });
    } catch (e) {
      console.error('Error loading changes:', e);
    }
  }

  // Get CSS selector for an element
  function getSelector(element) {
    if (element.id) return `#${element.id}`;
    let path = [];
    while (element && element.nodeType === Node.ELEMENT_NODE) {
      let selector = element.nodeName.toLowerCase();
      if (element.className) {
        selector += '.' + element.className.split(' ').join('.');
      }
      path.unshift(selector);
      element = element.parentNode;
    }
    return path.join(' > ');
  }

  // Toggle editor
  function toggleEditor() {
    EDITOR_CONFIG.enabled = !EDITOR_CONFIG.enabled;
    localStorage.setItem(EDITOR_CONFIG.storageKey, EDITOR_CONFIG.enabled.toString());

    const editorBar = document.getElementById('visual-editor-bar');
    const toggleBtn = document.getElementById('editor-toggle-btn');
    
    if (editorBar) {
      editorBar.style.display = EDITOR_CONFIG.enabled ? 'flex' : 'none';
      document.body.style.paddingTop = EDITOR_CONFIG.enabled ? '50px' : '';
    }

    if (toggleBtn) {
      toggleBtn.textContent = EDITOR_CONFIG.enabled ? '👁️ View Mode' : EDITOR_CONFIG.editButtonText;
    }

    if (EDITOR_CONFIG.enabled) {
      makeEditable();
      showNotification('Visual Editor Activated! Click any text to edit.', 'info');
    } else {
      // Remove editable attributes
      document.querySelectorAll('[data-editable="true"]').forEach(el => {
        el.contentEditable = false;
        el.style.cursor = '';
        el.style.backgroundColor = '';
      });
      showNotification('Visual Editor Deactivated', 'info');
    }
  }

  // Show notification
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: ${EDITOR_CONFIG.enabled ? '70px' : '20px'};
      right: 20px;
      background: ${type === 'success' ? '#10b981' : '#667eea'};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10001;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideIn 0.3s ease-out reverse';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Initialize editor
  function init() {
    // Create and add editor UI
    const editorBar = createEditorUI();
    document.body.insertBefore(editorBar, document.body.firstChild);

    // Set up event listeners
    document.getElementById('editor-toggle-btn').addEventListener('click', toggleEditor);
    document.getElementById('editor-save-btn').addEventListener('click', saveChanges);
    document.getElementById('editor-cancel-btn').addEventListener('click', () => {
      location.reload();
    });

    // Keyboard shortcut
    document.addEventListener('keydown', (e) => {
      if ((EDITOR_CONFIG.requireCtrl ? (e.ctrlKey || e.metaKey) : true) && 
          e.key.toLowerCase() === EDITOR_CONFIG.toggleKey && 
          !e.target.isContentEditable) {
        e.preventDefault();
        toggleEditor();
      }
    });

    // Load saved changes on page load
    loadChanges();

    // Initialize editable elements if editor is enabled
    if (EDITOR_CONFIG.enabled) {
      setTimeout(() => makeEditable(), 500);
    }

    // Add floating toggle button when editor is disabled
    if (!EDITOR_CONFIG.enabled) {
      const floatingBtn = document.createElement('button');
      floatingBtn.id = 'floating-editor-btn';
      floatingBtn.textContent = '✏️';
      floatingBtn.title = 'Enable Visual Editor (Ctrl+E)';
      floatingBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 20px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 9999;
        transition: transform 0.2s;
      `;
      floatingBtn.onmouseover = () => floatingBtn.style.transform = 'scale(1.1)';
      floatingBtn.onmouseout = () => floatingBtn.style.transform = 'scale(1)';
      floatingBtn.addEventListener('click', toggleEditor);
      document.body.appendChild(floatingBtn);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Watch for dynamically added content
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(() => {
      if (EDITOR_CONFIG.enabled) {
        makeEditable();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
})();

