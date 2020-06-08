var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

var isCheckWord = false;

$('.todos-container > form > i').hide(200);

recognition.onstart = function() {
    $('.todos-container > form > i').show(200);
}

recognition.onend = function() {
    $('.todos-container > form > i').hide(200);
}

recognition.onspeechstart = function() {
    console.log('Voice recognition speecking end');
}

recognition.onresult = function(event) {
    var text = event.results[0][0].transcript;
    isCheckWord ? $('#randow-todo-container > form > input').val(text) : $('textarea').val(text);;
}

$('#start-record-btn').on('click', function() {
    recognition.start();
});

$('#pause-record-btn').on('click', function() {
    recognition.stop();
});

$('#sound').click(() => {
    recognition.start();
    isCheckWord = true;
});