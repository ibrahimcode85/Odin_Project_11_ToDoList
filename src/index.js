import { differenceInCalendarDays, isExists } from "date-fns"; // libray to process date
import './style.css';

const taskInputButton = document.getElementById('showInput');
const addTaskButton = document.getElementById('createTask');
const clearButton = document.getElementById('clearDashboard');
const summaryButton = document.getElementById('input-summary');

let cardDeck = [];

// sample cards to guide user
// TODO sample card to be updated with more 'believable' value
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

// initialize dashboard 
dashboardDisplay(cardDeck);

// add event listener
taskInputButton.addEventListener('click', showInputDialog);
addTaskButton.addEventListener('click', createCard);
addTaskButton.addEventListener('click', closeInputDialog);
clearButton.addEventListener('click', clearDashboard);
summaryButton.addEventListener('change',getSummaryValue);

// functions (TODO to be grouped in module later)
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
    downRankButton.addEventListener('click', downRank);
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
    clearDashboard();
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
    
    const cardIndex = findDeckIndex(cardDeck, deleteID);
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
    const currentNode = e.target.parentNode;
    const prevNode = currentNode.previousElementSibling;

    if (prevNode.className === 'dashboard-title') {return;}

    const prevCardID = getCardID(prevNode);
    const prevCardDeckIndex = findDeckIndex(cardDeck, prevCardID);

    const currentCardID = getCardID(currentNode);
    const currentCardDeckIndex = findDeckIndex(cardDeck, currentCardID);

    // get the current object from deck
    const currentCard = cardDeck[currentCardDeckIndex];
    
    // delete the current object from deck
    deleteCardFromDeck(currentCardID);

    // add the current card object based on the location of the previous card index
    cardDeck.splice(prevCardDeckIndex,0,currentCard);

    // regenerate the dashboard based on the updated deck
    clearDashboard()
    dashboardDisplay(cardDeck);


}

function downRank(e) {
    const currentNode = e.target.parentNode;
    const nextNode = currentNode.nextElementSibling;

    if (nextNode === null) {return;}

    const nextCardID = getCardID(nextNode);
    const nextCardDeckIndex = findDeckIndex(cardDeck, nextCardID);

    const currentCardID = getCardID(currentNode);
    const currentCardDeckIndex = findDeckIndex(cardDeck, currentCardID);

    // get the current object from deck
    const currentCard = cardDeck[currentCardDeckIndex];
    
    // delete the current object from deck
    deleteCardFromDeck(currentCardID);

    // add the current card object based on the location of the previous card index
    cardDeck.splice(nextCardDeckIndex,0,currentCard);

    // regenerate the dashboard based on the updated deck
    clearDashboard()
    dashboardDisplay(cardDeck);
}

function getSummaryValue(e) {
    const summaryValue = e.target.value;
    let valueList = [];

    for (let cardIndex in cardDeck){

        const currentValue = cardDeck[cardIndex][summaryValue];
        let valueExists = valueList.includes(currentValue); 

        if (valueExists === false){
            valueList.push(currentValue);
        }

    }

    // display the selection for user to choose
    summaryValueDisplay(valueList);

}

function summaryValueDisplay(valueList) {
    
    const summaryValueSelection = document.getElementById('summary-value');

    // clear previous display first
    summaryValueSelection.replaceChildren()

    // update value with current summary selection
    for (let valueIndex in valueList){
        let value = valueList[valueIndex];

        const option = document.createElement('option');
        option.setAttribute('value', value);
        option.textContent = value;

        summaryValueSelection.appendChild(option);
    }

}