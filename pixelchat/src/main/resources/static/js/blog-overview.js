document.addEventListener('DOMContentLoaded', function () {
    var secretKey = "MySuperSecretKey";

    function decrypt(text) {
        var bytes = CryptoJS.AES.decrypt(text, secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    var emailEncrypted = sessionStorage.getItem("loggedInEmail");
    loggedInEmail = emailEncrypted ? decrypt(emailEncrypted) : "fallback@example.com";

    fetchLoggedInUserDetails();
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

            // Now fetch the posts after getting the user ID
            fetchPostsForUser();
        })
        .catch(error => console.error("Error fetching user details:", error));
}

function fetchPostsForUser() {
    fetch(`/blog/getPosts?userId=${loggedInUserId}`)
        .then(response => response.json())
        .then(posts => {
            const postsGrid = document.querySelector(".posts-grid");
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = "post";

                const postImage = document.createElement('img');
                postImage.src = `../images/${post.imageName}/`;
                postImage.alt = "Blog post image";

                const postText = document.createElement('p');
                postText.textContent = post.content;

                postElement.appendChild(postImage);
                postElement.appendChild(postText);

                postsGrid.appendChild(postElement);
            });
        });
}
