document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // Get all input fields that need validation
  var inputs = document.querySelectorAll('.validate-input .input');

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

  var secretKey = "rebeca27";


  document.querySelector('.validate-form').addEventListener('submit', function (event) {
    var isValid = true;

    for (var i = 0; i < inputs.length; i++) {
      if (!validate(inputs[i])) {
        showValidate(inputs[i]);
        isValid = false;
      }
    }

    if (!isValid) {
      event.preventDefault();
      return;
    }

    let email = document.querySelector('#emailInput').value;
    let password = document.querySelector('#passwordInput').value;

    if (!isValidEmail(email)) {
      alert('Please enter a valid email.');
      return;
    }

    if (!isValidPassword(password)) {
      alert('Password must be at least 8 characters, contain a number and a special character.');
      return;
    }

    let formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    fetch('/login', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        console.log("Received response from server");

        // First, let's determine if the response is JSON or not
        const contentType = response.headers.get("content-type");

        if (!response.ok) {
          if (contentType && contentType.includes("application/json")) {
            return response.json().then(errorData => {
              throw new Error(errorData.message);
            });
          } else {
            return response.text().then(errorText => {
              throw new Error(errorText);
            });
          }
        } else {
          if (contentType && contentType.includes("application/json")) {
            return response.json();
          } else {
            throw new Error("Invalid content type received");
          }
        }
      })
      .then(data => {
        console.log("Processing returned data", data);

        if (data.message === "Login successful") {
          //    sessionStorage.setItem("loggedInEmail", data.email);
          var encryptedEmail = encrypt(data.email);
          // console.log(encryptedEmail)
          sessionStorage.setItem("loggedInEmail", encryptedEmail);
          //console.log("Email set in sessionStorage: ", sessionStorage.getItem("loggedInEmail"));
          window.location.href = '/login2';
        } else {
          throw new Error(data.message || "Unknown error");
        }
      })
      .catch((error) => {
        console.error('Fetch had an error:', error.message);
        
        // Display message based on the server's response
        if (error.message === "Invalid input format.") {
            alert(`The email "${email}" you entered has an invalid format.`);
        } else if (error.message === "Invalid credentials.") {
            alert(`The credentials for "${email}" are incorrect.`);
        } else {
            alert(`There was an error during authentication for "${email}". Please try again.`);
        }
    });
    
  });

  function encrypt(text) {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
  }

  // Ensure email is valid
  function isValidEmail(email) {
    const re = /^[\w\.-]+@[\w\.-]+\.\w+$/;
    return re.test(email);
  }

  // Check password strength
  function isValidPassword(password) {
    // At least 12 characters long, contains a number, an uppercase letter, a lowercase letter, and a special character
    const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return re.test(password);
  }

  // Validation function to check input fields
  function validate(input) {
    if (input.type === 'email' || input.name === 'email') {
      return isValidEmail(input.value.trim());
    } else if (input.type === 'password' || input.name === 'pass') {
      return isValidPassword(input.value.trim());
    } else {
      return input.value.trim() !== '';
    }

  }

  // Function to show validation error indicators
  function showValidate(input) {
    var parent = input.parentElement;
    parent.classList.add('alert-validate');
  }

  // Function to hide validation error indicators
  function hideValidate(input) {
    var parent = input.parentElement;
    parent.classList.remove('alert-validate');
  }

  // Attach a focus event listener to each input field to hide validation error indicators
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('focus', function () {
      hideValidate(this);
    });
  }
  document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordInput = document.getElementById('passwordInput');

    // Check the current type of the input field
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text'; // Change the input type to 'text' to show the password
      this.textContent = 'Hide'; // Update the button text
    } else {
      passwordInput.type = 'password'; // Change the input type back to 'password' to hide it
      this.textContent = 'Show'; // Update the button text
    }
  });
});