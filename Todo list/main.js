const getListItemPath = 'views/list-item.hbs';

var todos = [];

function saveTodo(todo) {
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    todos = JSON.parse(localStorage.getItem('todos'));
    if(todos === null) {
        todos = [];
    }

    todos.forEach(todo => {
        $.get(getListItemPath).then(function(src) {
            var li = document.createElement('li');
            var templateHbs = Handlebars.compile(src);
            var html = templateHbs(todo);
            li.innerHTML = html;
            li.setAttribute('id', todo.id);
            
            li.querySelector('button.dismiss').addEventListener('click', dismissTask);
            li.querySelector('button.success').addEventListener('click', checkedTask);

            $('ul').append(li);
        }); 
    });
}

getTodos();

isEmptyList();

(() => {
    $('.todos-container > button').click(() => addForm());
    $('form > button').click(() => addTask(event));
    $('.todos-container > h2').text(`To do list ${todos.length}`);
})();

function dismissTask() {
    var id = this.parentElement.parentElement.id;
    todos = todos.filter(x => x.id !== parseInt(id));
    localStorage.setItem('todos', JSON.stringify(todos));
    $(this).parent().parent().remove();
    isEmptyList();
}

function isEmptyList() {
    todos.length === 0 ? $('h4').show(200) : $('h4').hide(200);
}

function checkedTask() {
    $(this).parent().parent().toggleClass('checked', '');
}

function addTask(event) {
    event.preventDefault();
    var task = $('textarea').val();
    if(isValid(task)) {
        $('textarea').addClass('invalid');
        setTimeout(() => {
            $('textarea').removeClass('invalid');
        }, 1000);
    } else {
        $.get(getListItemPath).then(function(src) {
            var li = document.createElement('li');
            var templateHbs = Handlebars.compile(src);
            var context = { content: task, id: todos.length + 1 };
            var html = templateHbs(context);
            li.innerHTML = html;
            
            saveTodo(context);
            
            li.querySelector('button.dismiss').addEventListener('click', dismissTask);
            li.querySelector('button.success').addEventListener('click', checkedTask);

            $('ul').append(li);
            
            var element = document.querySelector("ul");
            element.scrollTop = element.scrollHeight;

            isEmptyList();
         });

    
        $('form').fadeOut(200)
            .trigger('reset');

        $('#recognation').fadeOut(200)
        .trigger('reset');
    }
}

function addForm() {
    $('form').toggle(200)
        .css('display', 'flex');
    
    $('#recognation').toggle(200)
        .css('display', 'flex');
        
    $('form textarea').focus();
}

function isValid(val) {
    return val.length === 0;
}

function createHTMLElement(tag, text, classes, parent) {
    var element = document.createElement(tag);
    if(text) {
        element.innerText = text;
    }
    if(classes) {
        Array.from(classes).forEach(c => {
            element.classList.add(c);
        });
    }
    
    if(parent) {
        parent.appendChild(element);
    }

    return element;
}