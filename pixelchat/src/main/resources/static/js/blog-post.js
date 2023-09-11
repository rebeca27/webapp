let loggedInUserId;

document.addEventListener('DOMContentLoaded', function() {

    var secretKey = "MySuperSecretKey";

    function decrypt(text) {
        var bytes = CryptoJS.AES.decrypt(text, secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    // Decryption of the email from session storage
    var emailEncrypted = sessionStorage.getItem("loggedInEmail");
    loggedInEmail = emailEncrypted ? decrypt(emailEncrypted) : "fallback@example.com";
    
    fetchLoggedInUserDetails();

    const form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        if (!loggedInUserId) {
            alert('Please wait while we fetch user details.');
            return;
        }

        const image = document.getElementById("imageUpload").files[0].name;
        const content = document.getElementById("postText").value;

        let formData = new FormData();
        formData.append('image', image);
        formData.append('content', content);
        console.log(loggedInEmail)
        console.log(loggedInUserId)
        formData.append('user_id', loggedInUserId);

        fetch('/blog/addPost', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to upload post.');
            }
        })
        .then(data => {
            if(data.id) {
                alert('Post uploaded successfully!');
                window.location.href = 'blog-overview.html';
            } else {
                alert('Error uploading post. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error uploading post. Please try again.');
        });
    });
});

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
        })
        .catch(error => console.error("Error fetching user details:", error));
}
