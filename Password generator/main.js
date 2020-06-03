var generateButton = document.querySelector("[generate-button]");
var preview = document.querySelector("[preview]");
var length = document.querySelector("[length]");
var previewLength = document.querySelector("[preview-length]");
var copyButton = document.querySelector("[copy-button]");

var msgTextCopy = document.querySelector("[msg-text-copy]");

generateButton.addEventListener("click", generatePassword);
length.addEventListener("input", setLength);
copyButton.addEventListener("click", selectAndCopy);

function selectAndCopy(event) {
    event.preventDefault();

    preview.select();
    document.execCommand("copy");

    msgTextCopy.style.display = "block";

    setTimeout(() => {
        msgTextCopy.style.display = "none";
    }, 1000);
}

function setLength() {
    previewLength.textContent = length.value;
}

function generatePassword(event) {
    event.preventDefault();
    var password = "";
    
    for(let i = 1; i <= length.value; i++) {
        password += Math.floor(Math.random() * length.value) + 1;
    }

    preview.value = password;
}