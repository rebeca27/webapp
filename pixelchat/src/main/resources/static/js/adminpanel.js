// Main application state
const orbData = [{
        tooltip: "Chatroom 1 - 15 Active Users",
        url: "chatroom1.html",
        image: "space1.jpg"
    },
    {
        tooltip: "Chatroom 2 - 7 Active Users",
        url: "chatroom2.html",
        image: "space7.png"
    },
    {
        tooltip: "Friend Requests - 5 New",
        url: "friendrequests.html",
        image: "space3.jpg"
    },
    {
        tooltip: "User Reports - 2 Pending",
        url: "userreports.html",
        image: "space4.jpg"
    },
    {
        tooltip: "Blog Posts - 3 New",
        url: "blogposts.html",
        image: "space12.webp"
    }, // Example data for Blog Posts
    {
        tooltip: "Pictures - 10 New",
        url: "pictures.html",
        image: "space6.png"
    }, // Example data for Pictures
    {
        tooltip: "Staff - 5 Active",
        url: "staff.html",
        image: "space11.jpg"
    }, // Example data for Staff
    // Additional orb data can be added
];

let loggedInEmail;

let scene, camera, renderer, globe;
const chatRoomId = document.body.getAttribute('data-id');

document.addEventListener('DOMContentLoaded', (event)=> {

    var secretKey = "MySuperSecretKey";

    function decrypt(text) {
        var bytes = CryptoJS.AES.decrypt(text, secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    // Decryption of the email from session storage
    var emailEncrypted = sessionStorage.getItem("loggedInEmail");
    loggedInEmail = emailEncrypted ? decrypt(emailEncrypted) : "fallback@example.com";

    const chatRoomId = document.body.getAttribute('data-id');

    console.log(loggedInEmail);
    initGlobe();
    initOrbs();
    initJoystickControls();
    initOrbHoverEffects();
    initOrbClickEvents();
    startStarGenerator();
    initMenuToggle();


    const aiBox = document.querySelector('.ai-box');
    const toggleAIButton = document.getElementById('toggleAIButton');
    const chatWindow = document.querySelector(".chat-window");
    const askOrionInput = document.getElementById("askOrion");

    if (aiBox && toggleAIButton) {
        toggleAIButton.addEventListener('click', function () {
            aiBox.classList.toggle('minimized');
        });
    } else {
        console.warn("AI box or Toggle AI button not found in the document.");
    }

    window.talkToOrion = function () {
        const userQuestion = askOrionInput.value.trim(); // Trim to remove any leading or trailing spaces
        let aiResponse = ""; // Default response

        if (userQuestion) {
            chatWindow.innerHTML += `<div class="user-message">${userQuestion}</div>`;

            // Check the user's question and set the appropriate response
            switch (userQuestion.toLowerCase()) {
                case "how are you?":
                    aiResponse = "I'm just a program, so I don't have feelings, but thanks for asking!";
                    break;
                case "who created you?":
                    aiResponse = "I was created by the talented developers at your company.";
                    break;
                case "who created you?":
                    aiResponse = "I was crafted by the brilliant minds behind PixelChat.";
                    break;
                case "what can you do?":
                    aiResponse = "I can guide you through PixelChat, help moderate chat rooms, and provide assistance.";
                    break;
                case "tell me about chat rooms":
                    aiResponse = "Chat rooms are where users converse. You can monitor, join, or even create new ones from the radial menu. Remember, it's crucial to ensure a safe environment for all participants.";
                    break;
                case "i need emotional support":
                    aiResponse = "I'm really sorry you're feeling this way. Consider visiting the <a href='safe-space.html'>Orbit of Optimism</a> for some positivity. If it's urgent, please talk to a trusted individual or professional.";
                    break;
                    // Emotional support and wellbeing
                case "i'm sad":
                case "i feel depressed":
                case "i need help":
                case "i don't feel okay":
                case "i'm not doing well":
                    aiResponse = "I'm really sorry you're feeling this way, but I'm glad you reached out. Please consider visiting <a href='safe-space.html'>Safe Place</a> or talk to someone who can help.";
                    break;
                case "i need someone to talk to":
                case "i feel lonely":
                    aiResponse = "It's important to talk to someone who can help, whether it's friends or family. You can also visit our <a href='safe-space.html'>Safe Place</a> to chat with a specialist.";
                    break;
                case "i'm feeling anxious":
                case "i'm scared":
                    aiResponse = "I'm really sorry you're feeling this way. Consider visiting the <a href='safe-space.html'>Orbit of Optimism</a> for some positivity or join one of our support chat rooms.";
                    break;
                case "how to create a chatroom?":
                    aiResponse = "Go to the dashboard and click on 'Create Chatroom'.";
                    break;
                case "what services do you offer?":
                    aiResponse = "We offer a range of services including chatrooms, private messaging, and more.";
                    break;
                case "how can I get in touch with customer support?":
                    aiResponse = "You can reach our customer support via the 'Contact' section.";
                    break;
                case "is my data secure?":
                    aiResponse = "Yes, we prioritize user data security and have implemented multiple layers of protection.";
                    break;
                case "can I change my username?":
                    aiResponse = "Yes, navigate to 'Profile Settings' to modify your username.";
                    break;
                case "hi":
                case "hello":
                    aiResponse = "Hello! How can I assist you today?";
                    break;
                case "what's up?":
                case "how's it going?":
                    aiResponse = "I'm here to help! What can I do for you?";
                    break;
                case "thanks":
                case "thank you":
                    aiResponse = "You're welcome!";
                    break;
                case "bye":
                case "goodbye":
                    aiResponse = "Goodbye! If you have any more questions, just ask.";
                    break;

                    // Specific questions
                case "how are you?":
                    aiResponse = "I'm just a program, so I don't have feelings, but thanks for asking!";
                    break;
                case "how to reset my password?":
                    aiResponse = "Click on 'Forgot Password' on the login page and follow the instructions.";
                    break;
                case "are there any premium features?":
                    aiResponse = "Yes, we offer a premium subscription with added benefits and features.";
                    break;
                case "how do I delete my account?":
                    aiResponse = "Please contact customer support to proceed with account deletion.";
                    break;
                case "how often are new features added?":
                    aiResponse = "We regularly update our platform and add new features based on user feedback.";
                    break;
                case "is there a mobile app?":
                    aiResponse = "Yes, we have a mobile app available for both Android and iOS.";
                    break;
                case "how to report a bug?":
                    aiResponse = "Navigate to 'Help' and select 'Report a Bug'.";
                    break;
                case "can I suggest a feature?":
                    aiResponse = "Absolutely! We value user feedback. Please submit your suggestions via the 'Feedback' section.";
                    break;
                case "is there a user guide?":
                    aiResponse = "Yes, you can find the user guide in the 'Help' section.";
                    break;
                case "can I customize notifications?":
                    aiResponse = "Yes, go to 'Settings' and adjust your notification preferences.";
                    break;
                case "how to add friends?":
                    aiResponse = "Navigate to 'Friends' and click on 'Add New Friend'.";
                    break;
                case "is there a limit to the number of chatrooms I can create?":
                    aiResponse = "There's a limit of 10 chatrooms for free users. Premium users have no limit.";
                    break;
                case "can I mute a chatroom?":
                    aiResponse = "Yes, open the chatroom settings and select 'Mute Notifications'.";
                    break;
                case "how do I know if someone read my message?":
                    aiResponse = "You'll see a blue tick next to your message once it's been read.";
                    break;
                case "what's the difference between logging out and deactivating my account?":
                    aiResponse = "Logging out will simply sign you out, but deactivating will temporarily disable your account.";
                    break;
                case "how can I advertise on your platform?":
                    aiResponse = "Please contact our marketing team for advertising opportunities.";
                    break;
                case "do you have a referral program?":
                    aiResponse = "Yes! Refer friends and earn rewards. Check the 'Referrals' section for more details.";
                    break;
                case "can I sync my contacts?":
                    aiResponse = "Yes, navigate to 'Settings' and select 'Sync Contacts'.";
                    break;
                case "is there a dark mode?":
                    aiResponse = "Yes, you can toggle between light and dark mode in 'Settings'.";
                    break;
                case "do you support multi-language?":
                    aiResponse = "Currently, we support English. More languages will be added soon.";
                    break;
                case "are there any age restrictions to use this platform?":
                    aiResponse = "Users must be 13 years or older to use our platform.";
                    break;
                case "how can I upgrade to premium?":
                    aiResponse = "Navigate to 'Billing' and select the 'Upgrade to Premium' option.";
                    break;
                case "can I use this platform on a tablet?":
                    aiResponse = "Absolutely! Our platform is optimized for both tablets and smartphones.";
                    break;
                case "why was my account banned?":
                    aiResponse = "Accounts may be banned due to violations of our terms. Please contact support for details.";
                    break;
                case "can I change the theme of the chatroom?":
                    aiResponse = "Yes, premium users have the option to customize chatroom themes.";
                    break;
                case "is video chat available?":
                    aiResponse = "Yes, we offer both voice and video chat features.";
                    break;
                case "how do I block a user?":
                    aiResponse = "Navigate to the user's profile and select 'Block User'.";
                    break;
                case "do you offer end-to-end encryption?":
                    aiResponse = "Yes, all chats are end-to-end encrypted for user privacy.";
                    break;
                case "how to organize contacts?":
                    aiResponse = "You can create contact groups and categorize your contacts for better organization.";
                    break;
                case "how do I share files?":
                    aiResponse = "Click on the attachment icon in the chat window to share files.";
                    break;
                case "can I backup my chats?":
                    aiResponse = "Yes, navigate to 'Settings' and select 'Backup Chats'.";
                    break;
                case "how do I change profile picture?":
                    aiResponse = "Go to 'Profile Settings' and click on the profile picture to change it.";
                    break;
                default:
                    aiResponse = "I'm not sure about that. Can you ask something else?";
            }

            // Clear the input after asking
            askOrionInput.value = "";
        }
    }

    //  connectWebSocket(chatRoomId);

    // Fetch the Logged-In User's Details
    fetchLoggedInUserDetails();

    // Fetch Previous Messages for the Chatroom
    //  fetchMessagesForChatRoom(chatRoomId);
});


function initGlobe() {
    const container = document.querySelector('.globe');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#globeCanvas"),
        antialias: true,
        alpha: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);

    const geometry = new THREE.SphereGeometry(3, 32, 32);
    const texture = new THREE.TextureLoader().load('images/earth.jpg');
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        wireframe: true
    });
    globe = new THREE.Mesh(geometry, material);

    scene.add(globe);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    animateGlobe();
}

function animateGlobe() {
    requestAnimationFrame(animateGlobe);
    globe.rotation.y += 0.005;
    renderer.render(scene, camera);
}

function initOrbs() {
    const mediaGalaxy = document.querySelector('.media-galaxy');
    orbData.forEach((data, i) => {
        const orb = document.createElement('div');
        orb.classList.add('media-orb');
        const randomTop = Math.floor(Math.random() * 80) + 5;
        const randomLeft = Math.floor(Math.random() * 80) + 5;

        orb.style.top = `${randomTop}%`;
        orb.style.left = `${randomLeft}%`;
        orb.style.backgroundImage = `url('images/${data.image}')`;
        orb.setAttribute('data-tooltip', data.tooltip);
        orb.setAttribute('data-url', data.url);

        // Tooltip creation

        // Add the event listeners here
        orb.addEventListener('mouseenter', function () {
            // Check if orb is near the upper boundary and adjust tooltip position if needed
            if (parseInt(orb.style.top, 10) < 15) {
                orb.classList.add('top-boundary');
            }
        });

        orb.addEventListener('mouseleave', function () {
            orb.classList.remove('top-boundary');
        });


        // Now, append the orb to mediaGalaxy
        mediaGalaxy.appendChild(orb);
    });
}

function initOrbHoverEffects() {
    const orbs = document.querySelectorAll('.media-orb');
    orbs.forEach(orb => {
        orb.addEventListener('mouseenter', function () {
            orb.classList.add('hovered');
            if (parseInt(orb.style.top, 10) < 15) {
                orb.classList.add('top-boundary');
            }
        });

        orb.addEventListener('mouseleave', function () {
            orb.classList.remove('hovered', 'top-boundary');
        });
    });
}

function initOrbClickEvents() {
    const orbs = document.querySelectorAll('.media-orb');
    orbs.forEach(orb => {
        orb.addEventListener('click', function () {
            orb.classList.toggle('expanded');
        });
    });
}

function initJoystickControls() {
    const joystick = document.getElementById('joystick');
    const sections = document.querySelectorAll('.menu-list li');
    let isDragging = false;

    joystick.addEventListener('mousedown', function (e) {
        isDragging = true;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        joystick.style.left = e.pageX - joystick.clientWidth / 2 + 'px';
        joystick.style.top = e.pageY - joystick.clientHeight / 2 + 'px';
        sections.forEach(section => section.classList.remove('highlighted'));
        closestSection().classList.add('highlighted');
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    function closestSection() {
        let closest = null;
        let closestDistance = Infinity;

        sections.forEach(section => {
            const sectionRect = section.getBoundingClientRect();
            const joystickRect = joystick.getBoundingClientRect();

            const sectionCenter = {
                x: sectionRect.left + sectionRect.width / 2,
                y: sectionRect.top + sectionRect.height / 2
            };

            const joystickCenter = {
                x: joystickRect.left + joystickRect.width / 2,
                y: joystickRect.top + joystickRect.height / 2
            };

            const distance = Math.sqrt(
                Math.pow(joystickCenter.x - sectionCenter.x, 2) +
                Math.pow(joystickCenter.y - sectionCenter.y, 2)
            );

            if (distance < closestDistance) {
                closestDistance = distance;
                closest = section;
            }
        });

        return closest;
    }

    joystick.addEventListener('dblclick', function () {
        const selectedSection = closestSection();
        if (selectedSection) {
            const targetURL = selectedSection.getAttribute('data-url');
            const modalID = targetURL.replace('.html', 'Modal');
            const modalElement = document.getElementById(modalID);

            if (modalID === "friendrequestsModal") {
                // Fetch the data only when the "Friend Requests" modal is about to be displayed
                fetchIncomingRequests();
            } else if (modalID === "chatroom1Modal" || modalID === "chatroom2Modal") {
                const chatRoomId = modalElement.getAttribute('data-id');
                fetchMessagesForChatRoom(chatRoomId);

                // Connect to WebSocket when the chatroom modal is opened
                connectWebSocket(chatRoomId);
            }

            if (modalElement) {
                modalElement.style.display = "block";
            } else {
                // If there's no modal for the selected section, navigate to the page
                window.location.href = targetURL;
            }
        }
    });



}


function closeModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = "none";

    // Disconnect from WebSocket when the chatroom modal is closed
    if (id === "chatroom1Modal" || id === "chatroom2Modal") {
        disconnectWebSocket();
    }
}




function initOrbClickEvents() {
    const orbs = document.querySelectorAll('.media-orb');
    orbs.forEach(orb => {
        orb.addEventListener('click', function () {
            orb.classList.toggle('expanded');
        });
    });
}

function startStarGenerator() {
    function generateStar() {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        document.querySelector('.space-background').appendChild(star);
        star.addEventListener('animationend', function () {
            star.remove();
        });
    }
    setInterval(generateStar, 600000);
}


function initMenuToggle() {
    const items = document.querySelectorAll(".menu-list li");
    const toggle = document.querySelector(".menu-button");
    document.getElementById("menu-toggle").addEventListener("click", function () {
        const isOpen = toggle.classList.contains("open");

        if (isOpen) {
            items.forEach((item) => {
                item.style.transform = "scale(0) translateY(-100px)";
                item.style.opacity = "0";
            });
            toggle.classList.remove("open");
        } else {
            const radius = 180;
            items.forEach((item, i, arr) => {
                const angle = (i / arr.length) * Math.PI * 2;
                const x = radius * Math.cos(angle - Math.PI / 2); // -PI/2 to start from the top
                const y = radius * Math.sin(angle - Math.PI / 2);

                item.style.left = `50%`;
                item.style.bottom = `50%`;
                item.style.transform = `translate(${x}px, ${y}px) scale(1)`;
                item.style.opacity = "1";
            });
            toggle.classList.add("open");
        }
    });
}


function emergencyEject() {
    const confirmEject = confirm("Are you sure you want to initiate Emergency Eject? You will be logged out!");

    if (confirmEject) {
        // Send a request to the server to log out
        function logout() {
            fetch('/logout', {
                    method: 'POST'
                })
                .then(response => {
                    if (response.ok) {
                        sessionStorage.removeItem("loggedInEmail");
                        window.location.href = '/login'; // Redirect to login page
                    } else {
                        console.error('Error logging out.');
                    }
                });
        }

        logout(); // Call the logout function
    }
}



// System Settings Sphere Functionality --------------------------------------------------------------

document.querySelector('.settings-button').addEventListener('click', function () {
    const settingsList = document.querySelector('.settings-list');
    settingsList.style.display = (settingsList.style.display === "none" || settingsList.style.display === "") ? "block" : "none";
});

// Get all the list items inside the settings-list
const settingsItems = document.querySelectorAll('.settings-list li');

settingsItems.forEach(item => {
    item.addEventListener('click', function () {
        switch (item.textContent) {
            case 'Backup Data':
                if (confirm('Do you want to backup all the data?')) {
                    setTimeout(() => {
                        alert('Data backed up successfully!');
                    }, 2000); // Simulating a delay for backup
                }
                break;

            case 'Adjust Settings':
                document.getElementById('adjustSettingsModal').style.display = 'block';
                break;

            case 'Site-wide Announcements':
                document.getElementById('siteWideAnnouncementsModal').style.display = 'block';
                break;


            default:
                alert('Option not recognized!');
        }
    });
});

// Close buttons
document.getElementById('closeAdjustSettings').addEventListener('click', function () {
    document.getElementById('adjustSettingsModal').style.display = 'none';
});

document.getElementById('closeAnnouncements').addEventListener('click', function () {
    document.getElementById('siteWideAnnouncementsModal').style.display = 'none';
});

// Save Settings Function
function saveSettings() {
    // Logic to save settings
    alert('Settings saved successfully!');
    document.getElementById('adjustSettingsModal').style.display = 'none';
}

// Send Announcement Function
function sendAnnouncement() {
    const text = document.getElementById('announcementText').value;
    if (text) {
        // Logic to send announcement
        alert('Announcement sent successfully!');
        document.getElementById('siteWideAnnouncementsModal').style.display = 'none';
    } else {
        alert('Please enter an announcement text.');
    }
}

// Friend Request Logic -------------------------------------------------------------

function fetchIncomingRequests() {
    fetch("/friendRequests/incoming", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "User-Email": loggedInEmail
            }
        })
        .then(response => response.json())
        .then(data => {
            displayIncomingRequests(data);
        })
        .catch(error => console.error("Error fetching friend requests:", error));
}


function acceptRequest(requestId) {
    fetch(`/friendRequests/accept/${requestId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "User-Email": loggedInEmail
            }
        })
        .then(response => {
            if (response.ok) {
                alert("Friend request accepted!");
                fetchIncomingRequests(); // Refresh the list
            } else {
                alert("Error accepting friend request.");
            }
        })
        .catch(error => console.error("Error:", error));
}

function rejectRequest(requestId) {
    fetch(`/friendRequests/reject/${requestId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "User-Email": loggedInEmail
            }
        })
        .then(response => {
            if (response.ok) {
                alert("Friend request rejected!");
                fetchIncomingRequests(); // Refresh the list
            } else {
                alert("Error rejecting friend request.");
            }
        })
        .catch(error => console.error("Error:", error));
}

function sendFriendRequest() {
    const receiverEmail = document.getElementById("friendEmail").value;

    fetch("/friendRequests/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "User-Email": loggedInEmail
            },
            body: JSON.stringify({
                sender: {
                    email: loggedInEmail
                },
                receiver: {
                    email: receiverEmail
                }
            })

        })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
        })
        .then(message => {
            alert(message);
        })
        .catch(error => {
            console.error("Error:", error);
            alert(error.message);
        });

}

function displayIncomingRequests(requests) {
    console.log(requests); // Add this line

    const list = document.getElementById("incomingRequestsList");
    list.innerHTML = ''; // Clear the list

    if (requests.length > 0) {
        const modal = document.getElementById('friendrequestsModal');
        modal.style.display = 'block';
    }

    requests.forEach(request => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
        ${request.senderEmail} 
        <button class="accept-btn" onclick="acceptRequest(${request.id})">Accept</button> 
        <button class="reject-btn" onclick="rejectRequest(${request.id})">Reject</button>
    `;
        list.appendChild(listItem);
    });
}

// Chatrooms Logic -------------------------------------------------------------

let loggedInUserId;

function connectWebSocket(chatRoomId) {
    // Create a connection to the WebSocket endpoint
    const socket = new SockJS('/chat'); // This should match the endpoint you've defined in your Spring configuration
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
        console.log('Connected to WebSocket: ' + frame);

        // Subscribe to the topic for the specific chatroom
        stompClient.subscribe(`/topic/chat/${chatRoomId}`, function (messageOutput) {
            // Handle received messages here
            const message = JSON.parse(messageOutput.body);
            console.log("Received message:", message); // Add this line
            displayMessage(message);
        });

    }, function (error) {
        console.log('WebSocket Connection Error: ' + error);
    });
}

function fetchLoggedInUserDetails() {
    fetch("chatrooms/currentUser", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'User-Email': loggedInEmail
            }
        })
        .then(response => response.json())
        .then(data => {
            loggedInUserId = data.id;
            // You can call any other functions that depend on this ID here, if needed.
            // For example, if you want to immediately fetch messages for a chatroom after getting the ID:
            // fetchMessagesForChatRoom(someChatRoomId);
        })
        .catch(error => console.error("Error fetching user details:", error));
}

function displayMessage(message) {
    const newchatRoomId = message.chatRoom && message.chatRoom.id;

    if (!newchatRoomId) {
        console.error("Received message without a chatRoomId:", message);
        return;
    }

    const modal = document.querySelector(`.modal[data-id="${newchatRoomId}"]`);

    // Check if the modal exists
    if (!modal) {
        console.error(`No modal found for chatRoomId: ${newchatRoomId}`);
        return;
    }

    const chatroomContent = modal.querySelector('.chatroom-content');

    // Check if the chatroomContent exists
    if (!chatroomContent) {
        console.error(`No chatroom content found in modal for chatRoomId: ${newchatRoomId}`);
        return;
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${message.user.id === loggedInUserId ? 'myMessage' : 'otherMessage'}`;
    messageDiv.textContent = message.content;
    chatroomContent.appendChild(messageDiv);
    chatroomContent.scrollTop = chatroomContent.scrollHeight;
}

function fetchMessagesForChatRoom(chatRoomId) {
    fetch(`/chatrooms/${chatRoomId}/messages`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'User-Email': loggedInEmail
            }
        })
        .then(response => response.json())
        .then(data => {
            const modal = document.querySelector(`.modal[data-id="${chatRoomId}"]`);
            if (!modal) {
                console.error(`No modal found for chatRoomId: ${chatRoomId}`);
                return;
            }
            const chatroomContent = modal.querySelector('.chatroom-content');

            chatroomContent.innerHTML = ''; // Clear previous messages
            data.forEach(message => {
                const messageDiv = document.createElement('div');
                console.log(`Rendering message from user ${message.user.id}. Current logged-in user ID is ${loggedInUserId}.`);
                messageDiv.className = `message ${message.user.id === loggedInUserId ? 'myMessage' : 'otherMessage'}`;

                messageDiv.textContent = message.content;
                chatroomContent.appendChild(messageDiv);
                chatroomContent.scrollTop = chatroomContent.scrollHeight;
            });
        })
        .catch(error => console.error("Error fetching messages:", error));
}


function sendMessage(chatRoomId, inputId) {
    const inputElement = document.getElementById(inputId);
    const content = inputElement.value;

    if (stompClient && content.trim() !== "") {
        const messageData = {
            content: content,
            chatRoomId: chatRoomId,
            user: {
                id: loggedInUserId,
                email: loggedInEmail
            }
        };
        stompClient.send(`/app/chat/${chatRoomId}/sendMessage`, {}, JSON.stringify(messageData));
        inputElement.value = '';  // Clear the input field
    } else {
        console.error("WebSocket is not connected or the message is empty.");
    }
}




function disconnectWebSocket() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}