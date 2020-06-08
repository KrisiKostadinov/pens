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
            li.querySelector('button.success').addEventListener('click', learnedTask);

            if(todo.learned) {
                li.classList.add('checked');
            }

            $('ul').append(li);
        });
    });
}

getTodos();

isEmptyList();

(() => {
    $('#add-buttom').click(() => addForm());
    $('.todos-container > form > button').click(() => addTask(event));
    $('.todos-container > h2').text(`To do list ${todos.length}`);
    $('#fading-list').click(() => {
        $('.todos-container > ul').slideToggle(200);
        if($('#fading-list').text() == 'Скрии списъка') {
            $('#fading-list').text('Покажи списъка');
        } else {
            $('#fading-list').text('Скрии списъка');
        }
    });
})();

function dismissTask() {
    var id = this.parentElement.parentElement.id;
    todos = todos.filter(x => x.id !== parseInt(id));
    localStorage.setItem('todos', JSON.stringify(todos));
    $(this).parent().parent().remove();
    isEmptyList();
}

function isEmptyList() {
    todos.length === 0 ? $('.todos-container > h4').show(200) : $('.todos-container > h4').hide(200);
}

function learnedTask() {
    $(this).parent().parent().toggleClass('checked', '');
    var id = parseInt(this.parentElement.parentElement.id);
    todos[id].learned = !todos[id].learned;
    localStorage.setItem('todos', JSON.stringify(todos));
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
            li.querySelector('button.success').addEventListener('click', learnedTask);

            $('ul').append(li);
            
            var element = document.querySelector("ul");
            element.scrollTop = element.scrollHeight;

            isEmptyList();
         });

    
        $('.todos-container > form').fadeOut(200)
            .trigger('reset');

        $('#recognation').fadeOut(200)
        .trigger('reset');
    }
}

function addForm() {
    $('.todos-container > form').toggle(200)
        .css('display', 'flex');
    
    $('#recognation').toggle(200)
        .css('display', 'flex');
        
    $('.todos-container > form textarea').focus();
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