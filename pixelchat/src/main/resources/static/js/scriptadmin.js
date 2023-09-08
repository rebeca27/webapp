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
    fetchDashboardOverview();
    fetchLogs();
    fetchAnalytics();

    document.getElementById('userSearch').addEventListener('input', searchUser);

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
            const userList = document.getElementById('userList');
            let usersHTML = '';
            users.forEach(user => {
                usersHTML += `
                <div>
                    <p>Email: ${user.email}</p>
                    <p>Name: ${user.name}</p>
                </div>
                <hr>
                `;
            });
            userList.innerHTML = usersHTML;
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
}


function fetchDashboardOverview() {
    fetch('/api/dashboard-overview')
        .then(response => response.json())
        .then(data => {
            const dashboardSection = document.querySelector('#dashboard-overview');
            dashboardSection.innerHTML = `
                <h3>Dashboard Overview</h3>
                <p>Total Users: ${data.totalUsers}</p>
                <p>Active Chatrooms: ${data.activeChatrooms}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching dashboard overview:', error);
        });
}


function fetchLogs() {
    fetch('/api/logs')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const logsSection = document.querySelector('#logs');
            if (data.length === 0) {
                logsSection.innerHTML = '<h3>All is good. No recent logs.</h3>';
            } else {
                let logsHTML = '<h3>Recent Logs</h3>';
                data.forEach(log => {
                    logsHTML += `<p>${log.timestamp}: ${log.message}</p>`;
                });
                logsSection.innerHTML = logsHTML;
            }
        })
        .catch(error => {
            console.error('Error fetching logs:', error);
        });
}

function fetchAnalytics() {
    fetch('/api/analytics')
        .then(response => response.json())
        .then(data => {
            const analyticsSection = document.querySelector('#analytics');
            
            // User Growth Chart
            const userGrowthCtx = document.getElementById('userGrowthChart').getContext('2d');
            new Chart(userGrowthCtx, {
                type: 'line',
                data: {
                    labels: data.userGrowth.dates,
                    datasets: [{
                        label: 'User Growth',
                        data: data.userGrowth.counts,
                        borderColor: 'blue',
                        fill: false
                    }]
                }
            });
            
            // Message Traffic Chart
            const messageTrafficCtx = document.getElementById('messageTrafficChart').getContext('2d');
            new Chart(messageTrafficCtx, {
                type: 'bar',
                data: {
                    labels: data.messageTraffic.dates,
                    datasets: [{
                        label: 'Message Traffic',
                        data: data.messageTraffic.counts,
                        backgroundColor: 'green'
                    }]
                }
            });
            
            // Peak Times Chart
            const peakTimesCtx = document.getElementById('peakTimesChart').getContext('2d');
            new Chart(peakTimesCtx, {
                type: 'pie',
                data: {
                    labels: data.peakTimes.times,
                    datasets: [{
                        data: data.peakTimes.counts,
                        backgroundColor: ['red', 'yellow', 'blue', 'orange']
                    }]
                }
            });
            
        })
        .catch(error => {
            console.error('Error fetching analytics:', error);
        });
}

function searchUser() {
    const searchTerm = document.getElementById('userSearch').value;
    fetch(`/users/search?query=${searchTerm}`)
        .then(response => response.json())
        .then(users => {
            const userList = document.getElementById('userList');
            let usersHTML = '';
            users.forEach(user => {
                usersHTML += `
                <div class="user-item">
                    <p>Email: ${user.email}</p>
                    <button onclick="viewUserProfile(${user.id})">View Profile</button>
                    <button onclick="banUser(${user.id})">Ban</button>
                    <button onclick="muteUser(${user.id})">Mute</button>
                </div>
                `;
            });
            userList.innerHTML = usersHTML;
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
}

function viewUserProfile(userId) {
    fetch(`/user/${userId}`)
        .then(response => response.json())
        .then(user => {
            const userDetails = document.getElementById('userDetails');
            userDetails.innerHTML = `
                <p>Name: ${user.name}</p>
                <p>Email: ${user.email}</p>
            `;
            
            // Show the modal
            const modal = document.getElementById('userModal');
            modal.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching user profile:', error);
        });
}

function banUser(userId) {
    fetch(`/user/${userId}/ban`, {
        method: 'POST'
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => {
        console.error('Error banning user:', error);
    });
}

function muteUser(userId) {
    fetch(`/user/${userId}/mute`, {
        method: 'POST'
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => {
        console.error('Error muting user:', error);
    });
}

function createChatroom() {
    const chatroomName = prompt("Enter chatroom name:");
    fetch('/chatrooms/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: chatroomName
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(`Chatroom ${data.name} created with ID: ${data.id}`);
    })
    .catch(error => {
        console.error('Error creating chatroom:', error);
    });
}

function setModerator(chatroomId, userId) {
    fetch(`/chatrooms/${chatroomId}/setModerator`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId
        })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => {
        console.error('Error setting moderator:', error);
    });
}

function deleteChatroom(chatroomId) {
    fetch(`/chatrooms/${chatroomId}`, {
        method: 'DELETE'
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => {
        console.error('Error deleting chatroom:', error);
    });
}
