const getListItemPath = 'views/list-item.hbs';

(() => {
    isEmptyList();
    $('.todos-container > button').click(() => addForm());
    $('form > button').click(() => addTask(event));
})();

function dismissTask() {
    $(this).parent().parent().remove();
    isEmptyList();
}

function isEmptyList() {
    document.querySelector('ul').children.length === 0 ? $('h4').show(200) : $('h4').hide(200);
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
            var context = { content: task };
            var html = templateHbs(context);
            li.innerHTML = html;
            
            li.querySelector('button.dismiss').addEventListener('click', dismissTask);
            li.querySelector('button.success').addEventListener('click', checkedTask);

            $('ul').append(li);
            
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