document.addEventListener('DOMContentLoaded', function() {
    const agentId = '40df21dd-76ef-46d3-b05e-be8cb210b8ca'; // Remplacez par l'ID réel de l'agent
    const chatEndpoint = 'http://localhost:3000/src/app/api/chat'; // Remplacez par votre domaine et endpoint API
  
    // Créer la bulle de chat
    const chatBubble = document.createElement('div');
    chatBubble.style.position = 'fixed';
    chatBubble.style.bottom = '20px';
    chatBubble.style.right = '20px';
    chatBubble.style.width = '60px';
    chatBubble.style.height = '60px';
    chatBubble.style.backgroundColor = '#007bff';
    chatBubble.style.borderRadius = '50%';
    chatBubble.style.cursor = 'pointer';
    chatBubble.style.zIndex = '1000';
    chatBubble.style.display = 'flex';
    chatBubble.style.alignItems = 'center';
    chatBubble.style.justifyContent = 'center';
    chatBubble.innerHTML = '<span style="color: white; font-size: 30px;">💬</span>';
    document.body.appendChild(chatBubble);
  
    // Créer la fenêtre de chat
    const chatWindow = document.createElement('div');
    chatWindow.style.position = 'fixed';
    chatWindow.style.bottom = '80px';
    chatWindow.style.right = '20px';
    chatWindow.style.width = '300px';
    chatWindow.style.height = '400px';
    chatWindow.style.backgroundColor = 'white';
    chatWindow.style.border = '1px solid #ccc';
    chatWindow.style.borderRadius = '8px';
    chatWindow.style.zIndex = '1000';
    chatWindow.style.display = 'none';
    chatWindow.style.flexDirection = 'column';
    chatWindow.style.overflow = 'hidden';
    document.body.appendChild(chatWindow);
  
    const chatHeader = document.createElement('div');
    chatHeader.style.backgroundColor = '#007bff';
    chatHeader.style.color = 'white';
    chatHeader.style.padding = '10px';
    chatHeader.style.fontWeight = 'bold';
    chatHeader.textContent = 'Chat with our AI';
    chatWindow.appendChild(chatHeader);
  
    const chatMessages = document.createElement('div');
    chatMessages.style.flex = '1';
    chatMessages.style.padding = '10px';
    chatMessages.style.overflowY = 'scroll';
    chatWindow.appendChild(chatMessages);
  
    const chatInputContainer = document.createElement('div');
    chatInputContainer.style.display = 'flex';
    chatInputContainer.style.padding = '10px';
    chatWindow.appendChild(chatInputContainer);
  
    const chatInput = document.createElement('input');
    chatInput.style.flex = '1';
    chatInput.style.border = '1px solid #ccc';
    chatInput.style.borderRadius = '4px';
    chatInput.style.padding = '5px';
    chatInputContainer.appendChild(chatInput);
  
    const chatSendButton = document.createElement('button');
    chatSendButton.textContent = 'Send';
    chatSendButton.style.marginLeft = '10px';
    chatSendButton.style.backgroundColor = '#007bff';
    chatSendButton.style.color = 'white';
    chatSendButton.style.border = 'none';
    chatSendButton.style.borderRadius = '4px';
    chatSendButton.style.padding = '5px 10px';
    chatInputContainer.appendChild(chatSendButton);
  
    // Ouvrir/Fermer la fenêtre de chat
    chatBubble.addEventListener('click', () => {
      chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
    });
  
    // Envoyer un message
    chatSendButton.addEventListener('click', async () => {
      const userMessage = chatInput.value.trim();
      if (userMessage === '') return;
  
      const userMessageElement = document.createElement('div');
      userMessageElement.style.textAlign = 'right';
      userMessageElement.style.marginBottom = '10px';
      userMessageElement.textContent = `You: ${userMessage}`;
      chatMessages.appendChild(userMessageElement);
  
      chatInput.value = '';
  
      try {
        const response = await fetch(chatEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ agentId, userMessage }),
        });
  
        const data = await response.json();
  
        const aiMessageElement = document.createElement('div');
        aiMessageElement.style.textAlign = 'left';
        aiMessageElement.style.marginBottom = '10px';
        aiMessageElement.textContent = `AI: ${data.message}`;
        chatMessages.appendChild(aiMessageElement);
  
        chatMessages.scrollTop = chatMessages.scrollHeight;
      } catch (error) {
        console.error('Error sending message:', error);
      }
    });
  })();
  
