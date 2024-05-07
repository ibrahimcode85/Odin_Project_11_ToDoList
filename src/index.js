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
    const deleteButton = cardButton('delete');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', deleteCard);
    cardContainer.appendChild(deleteButton);
    
    // add up rank button
    const upRankButton = cardButton('upRank');
    upRankButton.textContent = 'Up Rank';
    upRankButton.addEventListener('click', upRank);
    cardContainer.appendChild(upRankButton);

    // add down rank button
    const downRankButton = cardButton('downRank');
    downRankButton.textContent = 'Down Rank';
    cardContainer.appendChild(downRankButton);
    
    
    return cardContainer;
}

function cardButton(buttonName){
    const button = document.createElement('button');
    button.setAttribute('id', `${buttonName}Card`);
    button.textContent = buttonName;

    return button;
}

function dashboardDisplay(cardDeck) {
    
    for (let cardIndex in cardDeck) {

        let cardElement =  cardDisplay(cardDeck[cardIndex]);
        let dashboardID = `.dashboard-child#${cardDeck[cardIndex].status}`
        
        const dashboard = document.querySelector(dashboardID);
        dashboard.appendChild(cardElement);

    }

}

function clearDashboard() {
    const dashboardStatus = ['planned', 'inProgress', 'completed'];
    const titleMap = {planned : 'Planned', inProgress : 'In Progress', completed : 'Completed'};

    for (let statusIndex in dashboardStatus) {
        let dashboardID = `.dashboard-child#${dashboardStatus[statusIndex]}`
        const dashboardElement = document.querySelector(dashboardID)
        dashboardElement.replaceChildren()

        // add back title element
        const div = document.createElement('div');
        div.setAttribute('class', `dashboard-title`);
        div.textContent = titleMap[dashboardStatus[statusIndex]];
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
    
    // get ID to delete and delete from deck
    let deleteID = getCardID(card);
    deleteCardFromDeck(deleteID);

    // regenerate updated deck
    clearDashboard();
    dashboardDisplay(cardDeck);
}

function getCardID(card){
    const cardItem = ['task', 'project', 'personInCharge', 'dueDate'];
    let cardObject = card;
    let cardID = '';

    // parameter is either a node or an array.
    // if its not array, convert node info to array first.
    let checkNode = card.nodeType // return undefined if it is an array

    if (checkNode !== undefined) {
        cardObject = {};

        for (let itemIndex in cardItem) {
            const input = card.querySelector(`.card-${cardItem[itemIndex]}`).textContent;
            cardObject[cardItem[itemIndex]] = input;
        }

    } 

    for (let itemIndex in cardItem){
        let input = cardObject[cardItem[itemIndex]];
        cardID = cardID + '_' + input;
    }

    return cardID;
}

function deleteCardFromDeck(deleteID){
    
    const cardIndex = findDeckIndex(deleteID);
    cardDeck.splice(cardIndex,1);

}

function findDeckIndex(cardDeck, id){

    for (let cardIndex in cardDeck){
        let card = cardDeck[cardIndex];
        const cardID = getCardID(card);

        if (cardID === id) {return cardIndex}
    }

}

function upRank(e) {
    const parentNode = e.target.parentNode;
    const prevNode = parentNode.previousElementSibling;

    if (prevNode.className === 'dashboard-title') {return;}

    const prevCardID = getCardID(prevNode);

}