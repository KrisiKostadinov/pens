var header = document.querySelector('button');
var menu = document.querySelector('ul');

header.addEventListener('click', open);

function open() {
    menu.classList.toggle('in');
    menu.classList.toggle('out');
    setTimeout(() => {
        if(menu.classList.contains('out')) {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
    }, 200);
}

menu.querySelectorAll('li').forEach(li => li.addEventListener('click', (event) => {
    var item = event.target;
    header.innerText = item.innerText;
    open();
}));