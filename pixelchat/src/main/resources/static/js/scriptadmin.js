let loggedInEmail;


document.addEventListener('DOMContentLoaded', (even) => {
    var secretKey = "MySuperSecretKey";


    function decrypt(text) {
        var bytes = CryptoJS.AES.decrypt(text, secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    // Decryption of the email from session storage
    var emailEncrypted = sessionStorage.getItem("loggedInEmail");
    loggedInEmail = emailEncrypted ? decrypt(emailEncrypted) : "fallback@example.com";

    console.log(loggedInEmail)
    //fetchCurrentUserDetails();
    fetchChatrooms();
    fetchAllUsers();
    fetchReportedMessages();
});

function fetchChatrooms() {
    fetch('/chatrooms')
        .then(response => response.json())
        .then(chatrooms => {
            const chatroomSection = document.querySelector('#chatrooms');
            let chatroomHTML = '<h2>Chatrooms</h2>';
            chatrooms.forEach(chatroom => {
                chatroomHTML += `
                <div class="chatroom-name">
                    <span>${chatroom.name}</span>
                    <button class="button" onclick="fetchMessagesForChatroom(${chatroom.id})">View Messages</button>
                </div>
                <div id="messages-${chatroom.id}"></div>
            `;

            });
            chatroomSection.innerHTML = chatroomHTML;
        })
        .catch(error => {
            console.error('Error fetching chatrooms:', error);
        });
}

function fetchMessagesForChatroom(chatroomId) {
    fetch(`/chatrooms/${chatroomId}/messages`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'User-Email': loggedInEmail
            }
        })
        .then(response => response.json())
        .then(messages => {
            let messagesHTML = '<span class="close" onclick="closeModal()">&times;</span><h3>Messages</h3>';
            messages.forEach(message => {
                messagesHTML += `
                <div class="message ${message.user.email === loggedInEmail ? 'myMessage' : 'otherMessage'}">
                    <div class="user-initial">${message.user.name.charAt(0).toUpperCase()}</div>
                    <span class="message-content">${message.content}</span>
                </div>
                `;
            });
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `<div class="modal-content" style="height: 400px; overflow-y: auto;">${messagesHTML}</div>`;
            document.body.appendChild(modal);
            modal.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching messages:', error);
        });
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.style.display = 'none';
        modal.remove();
    }
}

function fetchReportedMessages() {
    fetch('/reports/reportedmessages')
        .then(response => response.json())
        .then(reports => {
            const reportsSection = document.querySelector('#reports');
            let reportsHTML = '<h2>Reported Messages</h2>';
            reports.forEach(report => {
                reportsHTML += `
                <div class="report-card" id="report-${report.id}"> <!-- Assign a unique ID here -->
                    <h3>Reported Message</h3>
                    <p><strong>Content:</strong> ${report.message.content}</p>
                    <p><strong>Reported by:</strong> ${report.reporter.name} (${report.reporter.email})</p>
                    <p><strong>Message sent by:</strong> ${report.message.user.name} (${report.message.user.email})</p>
                    <button onclick="acceptReport(${report.id})">Accept</button>
                    <button onclick="showRejectPopup(${report.id})">Reject</button>
                </div>
                `;
            });
            reportsSection.innerHTML = reportsHTML;
        })
        .catch(error => {
            console.error('Error fetching reported messages:', error);
        });
}

function showRejectPopup(reportId) {
    const reason = prompt("Enter the reason for rejecting this report:");
    if (reason) {
        rejectReport(reportId, reason);
    }
}

function acceptReport(reportId) {
    fetch(`/reports/accept/${reportId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.text()) // Treat the response as plain text
        .then(data => {
            console.log('Response from server:', data);
            // Remove the report card from the DOM
            const reportCard = document.getElementById(`report-${reportId}`);
            if (reportCard) {
                reportCard.remove();
            }
        })
        .catch(error => {
            console.error('Error accepting report:', error);
        });
}

function rejectReport(reportId, reason) {
    fetch(`/reports/reject/${reportId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rejectionReason: reason
            })
        })
        .then(response => response.text()) // Treat the response as plain text
        .then(data => {
            console.log('Response from server:', data);
            // Remove the report card from the DOM
            const reportCard = document.getElementById(`report-${reportId}`);
            if (reportCard) {
                reportCard.remove();
            }
        })
        .catch(error => {
            console.error('Error rejecting report:', error);
        });
}

function fetchAllUsers() {
    fetch('/users')
        .then(response => response.json())
        .then(users => {
            const userSection = document.querySelector('#users');
            let usersHTML = '<h2>Users</h2>';
            users.forEach(user => {
                usersHTML += `
                <div>
                    <p>Email: ${user.email}</p>
                    <p>Name: ${user.name}</p>
                </div>
                <hr>
                `;
            });
            userSection.innerHTML = usersHTML;
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
}