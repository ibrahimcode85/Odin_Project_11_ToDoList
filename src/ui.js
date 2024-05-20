// This module will handle all the UI-related functions, such as showing dialogs, updating the dashboard display, 
// and managing user inputs.

import {deleteCard, upRank, downRank} from './task'

function showInputDialog() {
    const inputDialog = document.querySelector('dialog');
    inputDialog.showModal();
}

function closeInputDialog() {
    const inputDialog = document.querySelector('dialog');
    inputDialog.close();
}

function cardButton(buttonName){
    const button = document.createElement('button');
    button.setAttribute('id', `${buttonName}Card`);
    button.textContent = buttonName;

    return button;
}

function cardDisplay(card, cardDeck) {
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
    deleteButton.addEventListener('click', (e) => {
        deleteCard(e,cardDeck);
    });
    cardContainer.appendChild(deleteButton);
    
    // add up rank button
    const upRankButton = cardButton('upRank');
    upRankButton.textContent = 'Up Rank';
    upRankButton.addEventListener('click', (e) => {
        upRank(e,cardDeck);
    });
    cardContainer.appendChild(upRankButton);

    // add down rank button
    const downRankButton = cardButton('downRank');
    downRankButton.textContent = 'Down Rank';
    downRankButton.addEventListener('click', (e) => {
        downRank(e,cardDeck);
    });
    cardContainer.appendChild(downRankButton);
    
    
    return cardContainer;
}

function dashboardDisplay(cardDeck) {
    
    for (let cardIndex in cardDeck) {

        let cardElement =  cardDisplay(cardDeck[cardIndex], cardDeck);
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

    localStorage.clear();
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

export { 
    showInputDialog, closeInputDialog, 
    dashboardDisplay, clearDashboard,
    summaryValueDisplay
}