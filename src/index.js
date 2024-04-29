const taskInputButton = document.getElementById('showInput');
const addTaskButton = document.getElementById('createTask');
let cardDeck = [];


// add event listener
taskInputButton.addEventListener('click', showInputDialog);
addTaskButton.addEventListener('click', createCard);
addTaskButton.addEventListener('click', closeInputDialog);

// functions
function showInputDialog() {
    const inputDialog = document.querySelector('dialog');
    inputDialog.showModal();
}

function closeInputDialog() {
    const inputDialog = document.querySelector('dialog');
    inputDialog.close();
}

function getInput() {
    const task = document.querySelector('input#taskName').value;
    const project = document.querySelector('input#projectName').value;
    const personInCharge = document.querySelector('input#personInCharge').value;
    const dueDate = document.querySelector('input#dueDate').value;

    return {task, project, personInCharge, dueDate};
}

function clearInput() {
    document.querySelector('input#taskName').value = '';
    document.querySelector('input#projectName').value = '';
    document.querySelector('input#personInCharge').value = '';
    document.querySelector('input#dueDate').value = '';
}

function createCard() {
    const card = getInput();
    console.log(card);
    clearInput();

    cardDeck.push(card);
}