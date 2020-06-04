var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

$('form > i').hide(200);

recognition.onstart = function() {
    $('form > i').show(200);
}

recognition.onend = function() {
    $('form > i').hide(200);
}

recognition.onspeechstart = function() {
    console.log('Voice recognition speecking end');
}

recognition.onresult = function(event) {
    console.log(event);
    var text = event.results[0][0].transcript;
    $('textarea').val(text);
}

$('#start-record-btn').on('click', function() {
    recognition.start();
});

$('#pause-record-btn').on('click', function() {
    recognition.stop();
});