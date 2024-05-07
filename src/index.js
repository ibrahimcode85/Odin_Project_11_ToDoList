import { differenceInCalendarDays } from "date-fns"; // libray to process date
import './style.css';

const taskInputButton = document.getElementById('showInput');
const addTaskButton = document.getElementById('createTask');
const clearButton = document.getElementById('clearDashboard');

let cardDeck = [];

// dummy data for testing purposes
const obj1 = {  task:'task1',
                project: 'project1',
                personInCharge: 'pic1',
                dueDate: '2024-12-30',
                status:'planned'
            }

const obj2 = {  task:'task2',
                project: 'project2',
                personInCharge: 'pic2',
                dueDate: '2024-12-30',
                status:'inProgress'
            }

const obj3 = {  task:'task3',
                project: 'project3',
                personInCharge: 'pic3',
                dueDate: '2024-12-30',
                status:'completed'
}    

cardDeck.push(obj1, obj2, obj3)

// add event listener
taskInputButton.addEventListener('click', showInputDialog);
addTaskButton.addEventListener('click', createCard);
addTaskButton.addEventListener('click', closeInputDialog);
clearButton.addEventListener('click', clearDashboard);

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
    const task = document.querySelector('#input-task').value;
    const project = document.querySelector('#input-project').value;
    const personInCharge = document.querySelector('#input-personInCharge').value;
    const dueDate = document.querySelector('#input-dueDate').value;
    const status = document.querySelector('#input-status').value;

    return {task, project, personInCharge, dueDate, status};
}

function clearInput(card) {

    for (let key in card) {
        let cardID = `#input-${key}`;
        document.querySelector(cardID).value = '';
    }
    
}

function cardDisplay(card) {
    const cardContainer = document.createElement('div');
    cardContainer.setAttribute('class', 'card-container');

    // add tasks information
    for (let key in card) {
        if (key === 'status') {continue;} // TODO: no need to display status info? what if want to update/edit status?

        const div = document.createElement('div');
        div.setAttribute('class', `card-${key}`);
        div.textContent = card[key];

        cardContainer.appendChild(div);
    }

    // add delete button
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('id', 'deleteCard');
    deleteButton.textContent = 'Delete';
    cardContainer.appendChild(deleteButton);

    deleteButton.addEventListener('click', deleteCard);
    
    return cardContainer;
}

function dashboardDisplay(cardDeck) {
    
    for (let cardNum in cardDeck) {

        let cardElement =  cardDisplay(cardDeck[cardNum]);
        let dashboardID = `.dashboard-child#${cardDeck[cardNum].status}`
        
        const dashboard = document.querySelector(dashboardID);
        dashboard.appendChild(cardElement);

    }

}

function clearDashboard() {
    const dashboardStatus = ['planned', 'inProgress', 'completed'];
    const titleMap = {planned : 'Planned', inProgress : 'In Progress', completed : 'Completed'};

    for (let statusNum in dashboardStatus) {
        let dashboardID = `.dashboard-child#${dashboardStatus[statusNum]}`
        const dashboardElement = document.querySelector(dashboardID)
        dashboardElement.replaceChildren()

        // add back title element
        const div = document.createElement('div');
        div.setAttribute('class', `dashboard-title`);
        div.textContent = titleMap[dashboardStatus[statusNum]];
        dashboardElement.appendChild(div);
    }
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
    dashboardDisplay(cardDeck);
}

function deleteCard(e) {
    const card = e.target.parentNode;
    const cardItem = ['task', 'project', 'personInCharge', 'dueDate'];
    let cardID = '';

    // create unique id based on card input
    for (let itemNum in cardItem) {
        const input = card.querySelector(`.card-${cardItem[itemNum]}`).textContent;
        cardID = cardID + '_' + input;
    }

    console.log(cardID);
}