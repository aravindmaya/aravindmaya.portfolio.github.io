// Chat Widget for Rachel Chen's Portfolio
// This script can be added to any page to enable the chat functionality

(function() {
    'use strict';

    // Create chat widget HTML
    function createChatWidget() {
        const chatHTML = `
            <div id="rachelChatWidget" style="display: none;">
                <!-- Chat Toggle Button -->
                <div class="chat-toggle" id="chatToggle">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                </div>

                <!-- Chat Container -->
                <div class="chat-container hidden" id="chatContainer">
                    <div class="chat-header">
                        <div class="chat-avatar">R</div>
                        <h3>Chat with Rachel</h3>
                    </div>
                    
                    <div class="chat-messages" id="chatMessages">
                        <div class="message bot">
                            <div class="message-avatar">R</div>
                            <div class="message-content">
                                Hi! I'm Rachel. I'm a Product Designer & Engineer who loves bringing ideas to life with design + code. Ask me anything about my work, projects, or expertise!
                            </div>
                        </div>
                        
                        <div class="suggestions">
                            <div class="suggestion" onclick="window.rachelChat.askQuestion('Tell me about your background')">Background</div>
                            <div class="suggestion" onclick="window.rachelChat.askQuestion('What projects have you worked on?')">Projects</div>
                            <div class="suggestion" onclick="window.rachelChat.askQuestion('What are your skills?')">Skills</div>
                            <div class="suggestion" onclick="window.rachelChat.askQuestion('Where have you worked?')">Experience</div>
                        </div>
                    </div>
                    
                    <div class="chat-input">
                        <div class="input-group">
                            <input type="text" id="messageInput" placeholder="Ask me anything..." maxlength="500">
                            <button id="sendButton" onclick="window.rachelChat.sendMessage()">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Create a container for the chat widget
        const chatContainer = document.createElement('div');
        chatContainer.innerHTML = chatHTML;
        document.body.appendChild(chatContainer);

        // Show the widget
        document.getElementById('rachelChatWidget').style.display = 'block';
    }

    // Add CSS styles
    function addChatStyles() {
        const styles = `
            .chat-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 350px;
                height: 500px;
                background: white;
                border-radius: 16px;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                border: 1px solid #e5e7eb;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                z-index: 1000;
                transition: all 0.3s ease;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }

            .chat-header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 16px 20px;
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .chat-header h3 {
                font-size: 16px;
                font-weight: 600;
                margin: 0;
            }

            .chat-avatar {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 14px;
            }

            .chat-messages {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 16px;
            }

            .message {
                display: flex;
                gap: 12px;
                animation: fadeInUp 0.3s ease;
            }

            .message.user {
                flex-direction: row-reverse;
            }

            .message-avatar {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: 600;
                flex-shrink: 0;
            }

            .message.user .message-avatar {
                background: #667eea;
                color: white;
            }

            .message.bot .message-avatar {
                background: #f3f4f6;
                color: #6b7280;
            }

            .message-content {
                max-width: 80%;
                padding: 12px 16px;
                border-radius: 18px;
                font-size: 14px;
                line-height: 1.4;
                margin: 0;
            }

            .message.user .message-content {
                background: #667eea;
                color: white;
                border-bottom-right-radius: 6px;
            }

            .message.bot .message-content {
                background: #f3f4f6;
                color: #1f2937;
                border-bottom-left-radius: 6px;
            }

            .chat-input {
                padding: 20px;
                border-top: 1px solid #e5e7eb;
                background: white;
            }

            .input-group {
                display: flex;
                gap: 8px;
            }

            .chat-input input {
                flex: 1;
                padding: 12px 16px;
                border: 1px solid #d1d5db;
                border-radius: 24px;
                font-size: 14px;
                outline: none;
                transition: border-color 0.2s ease;
                font-family: inherit;
            }

            .chat-input input:focus {
                border-color: #667eea;
            }

            .chat-input button {
                padding: 12px 16px;
                background: #667eea;
                color: white;
                border: none;
                border-radius: 24px;
                font-size: 14px;
                cursor: pointer;
                transition: background-color 0.2s ease;
                font-family: inherit;
            }

            .chat-input button:hover {
                background: #5a67d8;
            }

            .chat-input button:disabled {
                background: #9ca3af;
                cursor: not-allowed;
            }

            .chat-toggle {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 10px 25px -5px rgba(102, 126, 234, 0.4);
                transition: all 0.3s ease;
                z-index: 1001;
            }

            .chat-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 15px 35px -5px rgba(102, 126, 234, 0.5);
            }

            .chat-toggle svg {
                width: 24px;
                height: 24px;
                color: white;
            }

            .chat-container.hidden {
                transform: translateY(20px);
                opacity: 0;
                pointer-events: none;
            }

            .typing-indicator {
                display: flex;
                gap: 4px;
                padding: 12px 16px;
                background: #f3f4f6;
                border-radius: 18px;
                border-bottom-left-radius: 6px;
                width: fit-content;
            }

            .typing-dot {
                width: 8px;
                height: 8px;
                background: #9ca3af;
                border-radius: 50%;
                animation: typing 1.4s infinite ease-in-out;
            }

            .typing-dot:nth-child(1) { animation-delay: -0.32s; }
            .typing-dot:nth-child(2) { animation-delay: -0.16s; }

            .suggestions {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-top: 16px;
            }

            .suggestion {
                padding: 8px 16px;
                background: #f3f4f6;
                border: 1px solid #e5e7eb;
                border-radius: 20px;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .suggestion:hover {
                background: #e5e7eb;
                border-color: #d1d5db;
            }

            @keyframes typing {
                0%, 80%, 100% {
                    transform: scale(0.8);
                    opacity: 0.5;
                }
                40% {
                    transform: scale(1);
                    opacity: 1;
                }
            }

            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @media (max-width: 768px) {
                .chat-container {
                    width: calc(100vw - 40px);
                    height: calc(100vh - 120px);
                    bottom: 10px;
                    right: 20px;
                    left: 20px;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    // Chat functionality
    const rachelChat = {
        isOpen: false,
        knowledgeBase: {
            background: "I'm Rachel Chen, a Product Designer & Engineer currently working as a Software Engineering Intern at Bloomberg. I have a passion for building products that combine beautiful design with functional code. I'm always thinking about designing for the future - what's possible today and what will be possible tomorrow.",
            
            projects: "I've worked on several exciting projects! My main projects include: 1) 1Password - Native macOS autofill for logins and passkeys, 2) PokerGPT - The world's first AI poker coach, 3) Earth - End-to-end hackathon management for Fortune 500s, 4) LinkedIn - Job application tracking, 5) RBC heyHR - A patent-pending AI for RBC's Global HR Center, 6) Chattin - A dating app for professional connections, and 7) Biogenesis - Home page for an emerging biotech startup.",
            
            skills: "My core skills include Product Design, UX/UI Design, Software Engineering, Full Stack Development, and Product Management. I'm proficient in both design tools and programming languages, allowing me to bridge the gap between design and development. I love prototyping ideas quickly and iterating based on user feedback.",
            
            experience: "Currently I'm a Software Engineering Intern at Bloomberg. Previously, I've worked as a Product Design Intern at 1Password, Product Designer at The Brain & Mind Institute, Software Engineering Intern at Royal Bank of Canada, and Product Design & Engineering Intern at Onova. I've also won 1st place at the UXL designathon 2024.",
            
            design: "I approach design with a user-centered mindset, always starting with understanding the problem and user needs. I believe great design should be both beautiful and functional, solving real problems while delighting users. I love exploring new design patterns and staying ahead of trends.",
            
            engineering: "I enjoy building full-stack applications and love the challenge of turning designs into working code. I'm comfortable with modern web technologies and enjoy creating smooth, performant user experiences. I believe in writing clean, maintainable code that scales.",
            
            future: "I'm passionate about designing for the future - understanding current technological capabilities while anticipating what's coming next. I love exploring emerging technologies like AI and thinking about how they can enhance user experiences and solve complex problems.",
            
            contact: "You can reach me through LinkedIn, GitHub, or email. I'm always open to interesting conversations about product design, engineering, and building the future!",
            
            default: "That's an interesting question! I'd be happy to elaborate on any specific aspect of my work, projects, or experience. Feel free to ask me about my background, specific projects, skills, or anything else you're curious about."
        },

        init: function() {
            this.bindEvents();
        },

        bindEvents: function() {
            const chatToggle = document.getElementById('chatToggle');
            const messageInput = document.getElementById('messageInput');

            if (chatToggle) {
                chatToggle.addEventListener('click', () => {
                    this.toggleChat();
                });
            }

            if (messageInput) {
                messageInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        this.sendMessage();
                    }
                });
            }
        },

        toggleChat: function() {
            this.isOpen = !this.isOpen;
            const chatContainer = document.getElementById('chatContainer');
            
            if (this.isOpen) {
                chatContainer.classList.remove('hidden');
                setTimeout(() => {
                    const messageInput = document.getElementById('messageInput');
                    if (messageInput) messageInput.focus();
                }, 100);
            } else {
                chatContainer.classList.add('hidden');
            }
        },

        sendMessage: function() {
            const messageInput = document.getElementById('messageInput');
            const message = messageInput.value.trim();
            
            if (!message) return;

            // Add user message
            this.addMessage(message, 'user');
            messageInput.value = '';

            // Show typing indicator
            this.showTypingIndicator();

            // Simulate response delay
            setTimeout(() => {
                this.hideTypingIndicator();
                const response = this.generateResponse(message);
                this.addMessage(response, 'bot');
            }, 1000 + Math.random() * 1000);
        },

        addMessage: function(content, sender) {
            const chatMessages = document.getElementById('chatMessages');
            
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}`;
            
            const avatar = document.createElement('div');
            avatar.className = 'message-avatar';
            avatar.textContent = sender === 'user' ? 'Y' : 'R';
            
            const messageContent = document.createElement('div');
            messageContent.className = 'message-content';
            messageContent.textContent = content;
            
            messageDiv.appendChild(avatar);
            messageDiv.appendChild(messageContent);
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        },

        showTypingIndicator: function() {
            const chatMessages = document.getElementById('chatMessages');
            
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message bot typing-indicator-container';
            typingDiv.id = 'typingIndicator';
            
            const avatar = document.createElement('div');
            avatar.className = 'message-avatar';
            avatar.textContent = 'R';
            
            const typingContent = document.createElement('div');
            typingContent.className = 'typing-indicator';
            typingContent.innerHTML = `
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            `;
            
            typingDiv.appendChild(avatar);
            typingDiv.appendChild(typingContent);
            
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        },

        hideTypingIndicator: function() {
            const typingIndicator = document.getElementById('typingIndicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
        },

        generateResponse: function(message) {
            const lowerMessage = message.toLowerCase();
            
            if (lowerMessage.includes('background') || lowerMessage.includes('who are you') || lowerMessage.includes('about you')) {
                return this.knowledgeBase.background;
            } else if (lowerMessage.includes('project') || lowerMessage.includes('work on') || lowerMessage.includes('built')) {
                return this.knowledgeBase.projects;
            } else if (lowerMessage.includes('skill') || lowerMessage.includes('what can you do') || lowerMessage.includes('expertise')) {
                return this.knowledgeBase.skills;
            } else if (lowerMessage.includes('experience') || lowerMessage.includes('worked') || lowerMessage.includes('job') || lowerMessage.includes('company')) {
                return this.knowledgeBase.experience;
            } else if (lowerMessage.includes('design') || lowerMessage.includes('ux') || lowerMessage.includes('ui')) {
                return this.knowledgeBase.design;
            } else if (lowerMessage.includes('engineer') || lowerMessage.includes('code') || lowerMessage.includes('develop') || lowerMessage.includes('programming')) {
                return this.knowledgeBase.engineering;
            } else if (lowerMessage.includes('future') || lowerMessage.includes('tomorrow') || lowerMessage.includes('next')) {
                return this.knowledgeBase.future;
            } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email') || lowerMessage.includes('linkedin')) {
                return this.knowledgeBase.contact;
            } else {
                return this.knowledgeBase.default;
            }
        },

        askQuestion: function(question) {
            const messageInput = document.getElementById('messageInput');
            if (messageInput) {
                messageInput.value = question;
                this.sendMessage();
            }
        }
    };

    // Initialize chat widget when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            addChatStyles();
            createChatWidget();
            rachelChat.init();
        });
    } else {
        addChatStyles();
        createChatWidget();
        rachelChat.init();
    }

    // Make chat functions globally available
    window.rachelChat = rachelChat;
})();