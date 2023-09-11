document.addEventListener("DOMContentLoaded", function() {
    function sendSupportRequest() {
        // Prevent form submission
        event.preventDefault();

        // Replace the form content with the confirmation message
        const formContainer = document.querySelector('.wrap-register');
        formContainer.innerHTML = `
            <div class="confirmation-message">
                <h2>Thank You!</h2>
                <p>Your request has been received. Our User Authentication Support Team will contact you shortly via the provided email.</p>
                <a href="index.html" class="back-btn">Back to Home</a>
            </div>
        `;
    }

    const nextBtn = document.getElementById("nextBtn");
    if (nextBtn) {
        nextBtn.addEventListener("click", sendSupportRequest);
    }
});
