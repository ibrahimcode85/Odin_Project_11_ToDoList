const taskInputButton = document.getElementById('showInput');
const addTaskButton = document.getElementById('createTask');


// add event listener
taskInputButton.addEventListener('click', showInputDialog);
addTaskButton.addEventListener('click', createCard);

// functions
function showInputDialog() {
    const inputDialog = document.querySelector('dialog');
    inputDialog.showModal();
}

function getInput() {
    const task = document.querySelector('input#taskName').value;
    const project = document.querySelector('input#projectName').value;
    const personInCharge = document.querySelector('input#personInCharge').value;
    const dueDate = document.querySelector('input#dueDate').value;

    return {task, project, personInCharge, dueDate};
}

function createCard() {
    const card = getInput();
    console.log(card);
}