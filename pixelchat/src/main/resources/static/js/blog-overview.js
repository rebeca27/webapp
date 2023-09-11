document.addEventListener('DOMContentLoaded', function () {
    fetch('/blog/getPosts')
        .then(response => response.json())
        .then(posts => {
            const postsGrid = document.querySelector(".posts-grid");
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = "post";

                // ... in your blog-overview.js ...

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
});