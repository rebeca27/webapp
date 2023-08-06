(function () {
  "use strict";

 
// Get all input fields that need validation
var inputs = document.querySelectorAll('.validate-input .input');

document.querySelector('.validate-form').addEventListener('submit', function (event) {
var isValid = true;

for (var i = 0; i < inputs.length; i++) {
  if (!validate(inputs[i])) {
    showValidate(inputs[i]);
    isValid = false;
  }
}

if (isValid) {
  event.preventDefault(); // Prevent default form submission if validation passes

  console.log("rebeca");
  let email = document.querySelector('#emailInput').value;
  let password = document.querySelector('#passwordInput').value;

  // Gather your form data here...
  let formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);


  console.log("About to fetch data");  // <-- Add this line
  console.log(formData);
  
  fetch('/login', {
      method: 'POST',
      body: formData
  })
  .then(response => {
    console.log("Received response from server");

    if (!response.ok) {
        console.log("Response was not OK");
        return response.text().then(errorText => {
            throw new Error(errorText);
        });
    } else {
        console.log("Response was OK");
        return response.text();
    }
})
.then(data => {
    console.log("Processing returned data", data);
    window.location.href = '/login2';
})
.catch((error) => {
    console.error('Fetch had an error:', error.message);
    if (error.message === "Invalid email or password.") {
        alert("Invalid email or password.");
    } else {
        alert("There was an error during registration. Please try again.");
    }
});

}

});

  // Attach a focus event listener to each input field to hide validation error indicators
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('focus', function () {
      hideValidate(this);
    });
  }

  // Validation function to check input fields
  function validate(input) {
    if (input.type === 'email' || input.name === 'email') {
      if (!input.value.trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/)) {
        return false;
      }
    } else if (input.type === 'password' || input.name === 'pass') {
      if (input.value.trim().length < 8) {
        return false;
      }
    } else {
      if (input.value.trim() === '') {
        return false;
      }
    }
    return true;
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
  
})();
