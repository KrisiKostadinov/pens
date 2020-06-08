var word = new SpeechSynthesisUtterance();
var randomNumber = 0;
var splitTodo = '';
const notLearnedArr = [...todos].filter(x => x?.learned !== true);

console.log(todos.filter(x => x.learned === true));

function getRandomTodo() {
    randomNumber = Math.floor(Math.random() * notLearnedArr.length);
    splitTodo = [...notLearnedArr[randomNumber].content.split('-')].map(x => x.trim());
    $('#random-todo-container > h2').text(splitTodo[0]);
}

$('#random-todo-container > h2').click(() => {
    word.text = splitTodo[0];
    window.speechSynthesis.speak(word);
});

getRandomTodo();

$('#random-todo-container > form').submit(event => {
    event.preventDefault();
    var word = $('#random-todo-container > form > input').val();
    if(word.trim() === splitTodo[1].trim()) {
        $('#random-todo-container > h4').slideDown(200).text('Correct: ' + word);
    } else {
        $('#random-todo-container > h4').slideDown(200).text('Incorrect: ' + splitTodo[1]);
    }

    setTimeout(() => {
        $('#random-todo-container > h4').slideUp(200);
    }, 2000);
    
    $('#random-todo-container > form').trigger("reset");
    $('#random-todo-container > form > input').focus();
    getRandomTodo();
});