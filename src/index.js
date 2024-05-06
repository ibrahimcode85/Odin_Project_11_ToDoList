import { differenceInCalendarDays } from "date-fns"; // libray to process date
import './style.css';

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
    const task = document.querySelector('input#task').value;
    const project = document.querySelector('input#project').value;
    const personInCharge = document.querySelector('input#personInCharge').value;
    const dueDate = document.querySelector('input#dueDate').value;

    return {task, project, personInCharge, dueDate};
}

function clearInput(card) {

    for (let key in card) {
        let cardID = `input#${key}`;
        document.querySelector(cardID).value = '';
    }
    
}

function cardDisplay(card) {
    const cardContainer = document.createElement('div');
    cardContainer.setAttribute('class', 'card-container');

    for (let key in card) {
        const div = document.createElement('div');
        div.setAttribute('class', `card-${key}`);
        div.textContent = card[key];

        cardContainer.appendChild(div);
    }
    
    // TODO: make it dynamic based on the status of the project.
    document.querySelector('#dashboard-planned').appendChild(cardContainer);
}

function daysRemaining(date) {
    const nowDate = new Date();
    return differenceInCalendarDays(date, nowDate);
    
}

function createCard() {
    const card = getInput();
    const daysRemain = daysRemaining(card.dueDate);

    clearInput(card);
    cardDeck.push(card);
    cardDisplay(card);
}