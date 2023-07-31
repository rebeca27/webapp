
(function () {
    "use strict";
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
})();