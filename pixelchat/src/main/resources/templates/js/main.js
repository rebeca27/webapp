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

    let email = document.querySelector('#emailInput').value;
    let password = document.querySelector('#passwordInput').value;
let color = document.querySelector('#colorInput').value;
    let profileImage = document.querySelector('#photoUpload').files[0];

    // Gather your form data here...
    let formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('color', color);
    formData.append('profileImage', profileImage);


    console.log("About to fetch data");  // <-- Add this line
    console.log(formData);
    
    fetch('/register', {
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
      window.location.href = '/login';
  })
  .catch((error) => {
      console.error('Fetch had an error:', error.message);
      if (error.message === "Email is already in use.") {
          alert("The email you entered is already associated with an account.");
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
  
    // Get the color pop-up element
    var colorPopup = document.getElementById('colorPopup');
  
    // Use a variable to track the state of the color pop-up (true: visible, false: hidden)
    var colorPopupVisible = false;
  
    // Attach a click event listener to the "Choose a Color" button to show/hide the pop-up
    document.getElementById('colorPopupBtn').addEventListener('click', function (event) {
      event.preventDefault(); // Prevent the form submission behavior
  
      // Toggle the state of the color pop-up
      colorPopupVisible = !colorPopupVisible;
  
      // Set the display property of the color pop-up based on its state
      colorPopup.style.display = colorPopupVisible ? 'block' : 'none';
    });
  
    // Attach a click event listener to each color option to apply the selected color to the button (for demonstration purposes)
    var colorOptions = document.querySelectorAll('.color-option');
    for (var i = 0; i < colorOptions.length; i++) {
      colorOptions[i].addEventListener('click', function () {
        var selectedColor = this.style.backgroundColor;
        document.getElementById('colorPopupBtn').style.backgroundColor = selectedColor;
        colorPopup.style.display = 'none';
        colorPopupVisible = false;
      });
    }
    
    document.querySelector("html").classList.add('js');

    var fileInput = document.querySelector("#photoUpload"),
        button = document.querySelector(".input-file-trigger"),
        nextBtn = document.querySelector("#nextBtn");
    
    button.addEventListener("keydown", function (event) {
        if (event.keyCode == 13 || event.keyCode == 32) {
            fileInput.focus();
        }
    });
    
    button.addEventListener("click", function (event) {
        fileInput.focus();
        return false;
    });
    
    fileInput.addEventListener("change", function (event) {
        var fileName = this.value;
        var fileReturn = document.querySelector(".file-return");
        fileReturn.innerHTML = fileName;
    
        // Enable the "Next" button when a file is selected
        nextBtn.disabled = false;
    });

    $('.color-option').click(function() {
      var selectedColor = $(this).attr('data-color');
      $('#colorInput').val(selectedColor);
  });

    
  })();
  