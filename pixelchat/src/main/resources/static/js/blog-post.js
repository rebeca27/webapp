document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector("form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const imageName = document.getElementById("imageUpload").files[0].name;
        console.log(imageName)
        const content = document.getElementById("postText").value;


        fetch('/blog/addPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({  imageName, content })
        })
        .then(response => response.json())
        .then(data => {
            if(data.id) {
                alert('Post uploaded successfully!');
                window.location.href = 'blog-overview.html';
            } else {
                alert('Error uploading post. Please try again.');
            }
        });
    });
});
