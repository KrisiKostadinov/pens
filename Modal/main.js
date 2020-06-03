const buttonCancel = document.querySelector('[cancel]');
const buttonOpen = document.querySelector('[open]');
var modal = document.querySelector('.modal');

buttonOpen.addEventListener('click', openModal);
buttonCancel.addEventListener('click', cancelModal);

function openModal() {
    modal.classList.add('in');
    modal.classList.remove('out');
}

function cancelModal() {
    modal.classList.remove('in');
    modal.classList.add('out');
}