(function () {
    "use strict";

    console.log("Script initialization.");

    document.querySelector("html").classList.add('js');

    const uploadButton = document.querySelector('.input-file-trigger');
    const fileInput = document.querySelector("#share1"); 
    const nextBtn = document.querySelector("#nextBtn");

    if(uploadButton && fileInput && nextBtn) {  // Checking existence of the DOM elements

        uploadButton.addEventListener('click', function() {
            console.log("Upload button clicked.");

            const email = sessionStorage.getItem('loggedInEmail');
            if (!email) {
                alert("Please login first!");
                return;
            }

            const imageFile = fileInput.files[0];
            if (!imageFile) {
                alert("Please select an image to upload.");
                return;
            }

            const formData = new FormData();
            formData.append('email', email);
            formData.append('share1Upload', imageFile);

            console.log("Sending image for comparison...");

            fetch('/compareShare', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Add this line to inspect the data
                if (data && data.message && data.message.includes('matches')) {
                    console.log("Uploaded share matches!");
                   // window.location.href = '/dashboard';
                } else {
                    console.log("Uploaded share does not match.");
                }
            })
            
            .catch(error => {
                console.error('Error uploading and comparing the share:', error);
            });
        });
    } else {
        console.error("One or more required DOM elements are missing.");
    }

    console.log("Script initialization complete.");

})();
