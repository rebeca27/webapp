(function () {
  "use strict";

  // Get the color pop-up element for login2.html
  var colorPopupLogin = document.getElementById('colorPopupLogin');

    // Use a variable to track the state of the color pop-up (true: visible, false: hidden)
    var colorPopupVisibleLogin = false;

    // Array to store the selected colors
    var selectedColors = [];

  // Attach a click event listener to the "Choose a Color" button for login2.html to show/hide the pop-up
  document.getElementById('colorPopupBtnLogin').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the form submission behavior

    // Toggle the state of the color pop-up
    colorPopupVisibleLogin = !colorPopupVisibleLogin;

    // Set the display property of the color pop-up based on its state
    colorPopupLogin.style.display = colorPopupVisibleLogin ? 'block' : 'none';

    // Generate and display the random colors in the pop-up for login2.html
    generateRandomColorsLogin();
  });

  // Helper function to generate a random color component
  function getRandomColor() {
    return Math.floor(Math.random() * 256);
  }

  // Helper function to generate a random pastel shade of a given hue
  function getRandomPastelRGB(hue) {
    var saturation = 50 + Math.random() * 25; // Random saturation (50 to 75)
    var lightness = 70 + Math.random() * 10; // Random lightness (70 to 80)
    return 'hsl(' + hue + ',' + saturation + '%,' + lightness + '%)';
  }

  // Function to generate and display the random colors in the pop-up for login2.html
  function generateRandomColorsLogin() {
    var colorOptionsContainer = colorPopupLogin.querySelector('.color-options-container');
    colorOptionsContainer.innerHTML = '';

    // Generate and add 3 pastel shades of red, blue, and green to the colorOptions array
    var redHue = Math.floor(Math.random() * 30); // Random hue value for red (0 to 29)
    var blueHue = Math.floor(Math.random() * 30) + 200; // Random hue value for blue (200 to 229)
    var greenHue = Math.floor(Math.random() * 30) + 100; // Random hue value for green (100 to 129)

    var colorOptions = [];

    for (var i = 0; i < 3; i++) {
      var redColor = getRandomPastelRGB(redHue);
      var blueColor = getRandomPastelRGB(blueHue);
      var greenColor = getRandomPastelRGB(greenHue);

      colorOptions.push(redColor);
      colorOptions.push(blueColor);
      colorOptions.push(greenColor);
    }

    // Shuffle the colorOptions array
    shuffleArray(colorOptions);

    // Append the shuffled color options as buttons to the container
    for (var j = 0; j < colorOptions.length; j++) {
      var colorOption = createColorOption(colorOptions[j]);
      colorOptionsContainer.appendChild(colorOption);
    }

    // Update the visual state of color options
    updateColorOptions();
  }

  // Function to create a color option button with the specified color
  function createColorOption(color) {
    var colorOption = document.createElement('button');
    colorOption.classList.add('color-option');
    colorOption.style.backgroundColor = color;
    colorOption.addEventListener('click', function () {
      selectColor(color); // Handle color selection
    });
    return colorOption;
  }

  // Helper function to shuffle an array using the Fisher-Yates algorithm
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  // Function to handle color selection
  function selectColor(color) {
    var index = selectedColors.indexOf(color);

    if (index === -1) {
      // If the color is not already selected, add it to the array
      if (selectedColors.length < 3) {
        selectedColors.push(color);
      }
    } else {
      // If the color is already selected, remove it from the array
      selectedColors.splice(index, 1);
    }

    updateColorOptions(); // Update the visual state of color options
    checkNextButton(); // Check if the "Next" button should be enabled

    // Check if all selected colors are shades of red
    if (selectedColors.length === 3) {
      var isShadesOfRed = checkShadesOfRed(selectedColors);
      
      // Log the HSL values of the selected colors
      console.log("Selected Colors HSL Values:");
      selectedColors.forEach(function (color) {
        var hslColor = parseHSL(color);
        console.log(hslColor);
      });

      console.log("Are the colors shades of red?", isShadesOfRed ? "Yes" : "No");
      if(isShadesOfRed){
        window.location.href = 'login3.html'; // Redirect to login3.html
      }
    }
  }

 // Function to update the visual state of color options
function updateColorOptions() {
  var colorOptionsLogin = document.querySelectorAll('#colorPopupLogin .color-option');

  for (var i = 0; i < colorOptionsLogin.length; i++) {
    var colorOption = colorOptionsLogin[i];
    var color = colorOption.style.backgroundColor;

    if (selectedColors.includes(color)) {
      colorOption.classList.add('selected'); // Add the "selected" class to selected colors
      console.log('here');
    } else {
      colorOption.classList.remove('selected'); // Remove the "selected" class from unselected colors
    }
  }
}
 
  // Function to check if the "Next" button should be enabled
  function checkNextButton() {
    var nextBtn = document.getElementById('nextBtn');
    nextBtn.disabled = selectedColors.length !== 3;
    nextBtn.style.background = ''; // Remove any background styling applied earlier
  }

  // Function to parse the HSL components from the color string
  function parseHSL(color) {
    var hslColor = color.substring(4, color.length - 1).split(",");
    return {
      hue: parseInt(hslColor[0]),
      saturation: parseInt(hslColor[1]),
      lightness: parseInt(hslColor[2]),
    };
  }

  // Function to check if the selected colors are shades of red
  function checkShadesOfRed(colors) {
    var baseRedHue = 15; // Base hue value for red (0 to 359)
    var hueThreshold = 20; // Adjust this threshold as needed

    // Check each selected color
    for (var i = 0; i < colors.length; i++) {
      var selectedColorHSL = parseHSL(colors[i]);

      // Calculate the difference in hue
      var hueDifference = Math.abs(selectedColorHSL.hue - baseRedHue);

      // Check if the hue difference is within the specified threshold
      if (hueDifference > hueThreshold) {
        return false;
      }
    }

    return true;
  }

  document.querySelector('.login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    // Handle the form submission logic here if needed.
  });

  // Initial call to generate and display the random colors
  generateRandomColorsLogin();
})();
