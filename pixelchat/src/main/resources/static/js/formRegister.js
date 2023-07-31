function registerUser(event) {
    // Prevent form from being submitted normally
    event.preventDefault();

    // Get form data
    var email = $('#emailInput').val();
    var password = $('#passwordInput').val();

    // Create JSON object with data
    var userData = {
        email: email,
        password: password
    };

    // Make AJAX request
    $.ajax({
        url: 'http://localhost:3308/register',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(userData),
        success: function(data) {
            // Handle successful response
            console.log('Registration successful!');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Handle error response
            console.log('Error: ' + errorThrown);
        }
    });
}
