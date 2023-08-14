(function () {
    "use strict";

    var email = sessionStorage.getItem("loggedInEmail") || "fallback@example.com";
    var APIemail='/target-color/'+email;

    function fetchTargetColorFromBackend(email) {
        return fetch(APIemail)
            .then(response => response.json())
            .then(data => data.targetColor);
    }

    var colorPopupLogin = document.getElementById('colorPopupLogin');
    var colorPopupVisibleLogin = false;
    var selectedColors = [];

    document.getElementById('colorPopupBtnLogin').addEventListener('click', function (event) {
        event.preventDefault();

        colorPopupVisibleLogin = !colorPopupVisibleLogin;
        colorPopupLogin.style.display = colorPopupVisibleLogin ? 'block' : 'none';
        generateRandomColorsLogin();
    });

    function getRandomColor() {
        return Math.floor(Math.random() * 256);
    }

    function getRandomPastelRGB(hue) {
        var saturation = 50 + Math.random() * 25;
        var lightness = 70 + Math.random() * 10;
        return 'hsl(' + hue + ',' + saturation + '%,' + lightness + '%)';
    }

    function generateRandomColorsLogin() {
        var colorOptionsContainer = colorPopupLogin.querySelector('.color-options-container');
        colorOptionsContainer.innerHTML = '';

        var redHue = Math.floor(Math.random() * 30);
        var blueHue = Math.floor(Math.random() * 30) + 200;
        var greenHue = Math.floor(Math.random() * 30) + 100;

        var colorOptions = [];
        for (var i = 0; i < 3; i++) {
            var redColor = getRandomPastelRGB(redHue);
            var blueColor = getRandomPastelRGB(blueHue);
            var greenColor = getRandomPastelRGB(greenHue);

            colorOptions.push(redColor);
            colorOptions.push(blueColor);
            colorOptions.push(greenColor);
        }

        shuffleArray(colorOptions);

        for (var j = 0; j < colorOptions.length; j++) {
            var colorOption = createColorOption(colorOptions[j]);
            colorOptionsContainer.appendChild(colorOption);
        }

        updateColorOptions();
    }

    function createColorOption(color) {
        var colorOption = document.createElement('button');
        colorOption.classList.add('color-option');
        colorOption.style.backgroundColor = color;
        colorOption.addEventListener('click', function () {
            selectColor(color);
        });
        return colorOption;
    }

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    function selectColor(color) {
        var index = selectedColors.indexOf(color);
        if (index === -1) {
            if (selectedColors.length < 3) {
                selectedColors.push(color);
            }
        } else {
            selectedColors.splice(index, 1);
        }

        updateColorOptions();
        checkNextButton();

        if (selectedColors.length === 3) {
            var isTargetShade = checkColorShade(selectedColors);
            console.log(`Are the colors shades of ${targetColorFromBackend}?`, isTargetShade ? "Yes" : "No");
            if (isTargetShade) {
                //window.location.href = 'login3.html';
            }
        }
    }

    function updateColorOptions() {
        var colorOptionsLogin = document.querySelectorAll('#colorPopupLogin .color-option');
        for (var i = 0; i < colorOptionsLogin.length; i++) {
            var colorOption = colorOptionsLogin[i];
            var color = colorOption.style.backgroundColor;

            if (selectedColors.includes(color)) {
                colorOption.classList.add('selected');
            } else {
                colorOption.classList.remove('selected');
            }
        }
    }

    function checkNextButton() {
        var nextBtn = document.getElementById('nextBtn');
        nextBtn.disabled = selectedColors.length !== 3;
        nextBtn.style.background = '';
    }

    function parseHSL(color) {
        var hslColor = color.substring(4, color.length - 1).split(",");
        return {
            hue: parseInt(hslColor[0]),
            saturation: parseInt(hslColor[1]),
            lightness: parseInt(hslColor[2]),
        };
    }

    // Get target color from backend and store it
    var targetColorFromBackend = null;
    fetchTargetColorFromBackend().then(color => {
        targetColorFromBackend = color;
    });

    var targetHues = {
        "#cb010": 15,
        "#00a400": 120,
        "#1100ff": 240
    };

    function checkColorShade(colors) {
        var targetHue = targetHues[targetColorFromBackend];
        var hueThreshold = 20;
        console.log('targetColorFromBackend: ', targetColorFromBackend, 'targetHue:', targetHue);

        for (var i = 0; i < colors.length; i++) {
            var selectedColorHSL = parseHSL(colors[i]);
            var hueDifference = Math.abs(selectedColorHSL.hue - targetHue);

            if (hueDifference > hueThreshold) {
                return false;
            }
        }
        return true;
    }

    document.querySelector('.login-form').addEventListener('submit', function (event) {
        event.preventDefault();
    });

    generateRandomColorsLogin();
})();
