
// Initialize the OpenAI API client
// Get the chatbot input and content elements
var input = document.querySelector(".chatbot-input");
var content = document.querySelector(".chatbot-messages");
var sendButton = document.querySelector(".chatbot-button");
var toggleButton = document.querySelector(".toggleButton");
var chatbot = document.querySelector(".chatbot");

// Define a function to send a message to the chatbot

function sendMessage(message) {
    // Display the user's message in the chatbot content
    content.innerHTML += "<div class='chatbot-message user'>" + message + "</div>";
    
    // Send the user's message to ChatGPT using the OpenAI API
    fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
    },
    body: JSON.stringify({
        max_tokens: 150,
        model:"gpt-3.5-turbo-0301",
        n: 1,
        temperature: 0.7,
        messages:[{role:"assistant",content:message}]
            
    })
    })
    .then(response => response.json())
    .then(data => {
    // Display the AI's response in the chatbot content
    var answer = data.choices[0].message.content;
    content.innerHTML += "<div class='chatbot-message-ai'>" + answer + "</div>";
    });
    }
    toggleButton.addEventListener("click", function() {
        var chatbot = document.querySelector(".chatbot");
        var messageField = document.querySelector(".messagefield");
        var header = document.querySelector(".chatbot-header");
      
        if (chatbot.classList.contains("chatbot-open")) {
          // Slide up to hide the chatbot
          chatbot.classList.remove("chatbot-open");
          chatbot.style.height = header.offsetHeight + "px";
          messageField.style.display = "none";
        } else {
          // Slide down to show the chatbot
          messageField.style.display = "block";
          chatbot.classList.add("chatbot-open");
          chatbot.style.height = chatbot.scrollHeight + "px";
        }
      });
      
// Add an event listener to the chatbot input
input.addEventListener("keydown", function(event) {
    // If the user hits the Enter key
    if (event.keyCode === 13) {
    // Prevent the default form submission
    event.preventDefault();
    
    // Get the user's message from the input element
    var message = input.value;
    
    // Send the user's message to the chatbot
    sendMessage(message);
    
    // Clear the input field
    input.value = "";
    }
    });
sendButton.addEventListener("click", function(event) {
    
    // Get the user's message from the input element
    var message = input.value;
    
    // Send the user's message to the chatbot
    sendMessage(message);
    
    // Clear the input field
    input.value = "";
    }
    )