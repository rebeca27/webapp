document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    console.log("Script initialization.");

    document.querySelector("html").classList.add('js');

    const uploadButton = document.querySelector('.input-file-trigger');
    const fileInput = document.querySelector("#share1");
    const nextBtn = document.querySelector("#nextBtn");

    if (uploadButton && fileInput && nextBtn) { // Checking existence of the DOM elements
        fileInput.addEventListener("change", function (event) {
            var fileName = this.value.split("\\").pop();
            var fileReturn = document.querySelector(".file-return");
            fileReturn.innerHTML = fileName;

            // Enable the "Next" button when a file is selected
            nextBtn.disabled = false;
        });

        nextBtn.addEventListener('click', function () {
            console.log("Upload button clicked.");

           // const email = sessionStorage.getItem('loggedInEmail');

            /**
             * The 'secretKey' variable below is an encryption key used to encrypt and decrypt the email 
             * stored in the session storage. Encrypting the email ensures that even if an unauthorized 
             * individual gains access to the session storage, they cannot easily discern the actual email 
             * unless they possess the encryption key.
             * 
             * IMPORTANT NOTE FOR PRODUCTION:
             * Never store the secret key directly in the JavaScript code as anyone who can view the 
             * source code can retrieve it. In real-world applications:
             *   - The secret key should be securely stored on the server-side.
             *   - For client-side secrets (like API keys), consider using environment variables or 
             *     server-side configurations.
             *   - In advanced setups, consider using a secure key management system.
             * 
             * For the purpose of this educational example, we're simplifying things by placing the key 
             * in the code, but it's imperative to understand that this method isn't suitable for a 
             * production environment.
             */

            var secretKey = "MySuperSecretKey";

            function decrypt(text) {
                var bytes = CryptoJS.AES.decrypt(text, secretKey);
                return bytes.toString(CryptoJS.enc.Utf8);
            }
            var emailEncrypted = sessionStorage.getItem("loggedInEmail");
            var email = emailEncrypted ? decrypt(emailEncrypted) : "fallback@example.com";


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
                    console.log(data);
                    if (data && data.message && data.message.includes('matches')) {
                        console.log("Uploaded share matches!");
                        window.location.href = 'adminpanel.html';
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

});