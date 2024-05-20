// This module will manage event listeners.

// events.js
import { showInputDialog, closeInputDialog, dashboardDisplay, clearDashboard, summaryValueDisplay } from './ui';
import { createCard, getSummaryValue, getSummarizedDashboard } from './task';
import { uploadToStorage, downloadFromStorage } from './storage.js';

export function initializeEventListeners(cardDeck) {
    document.getElementById('showInput').addEventListener('click', showInputDialog);

    document.getElementById('createTask').addEventListener('click', () => {
        cardDeck = createCard(cardDeck);
        closeInputDialog();
    });

    document.getElementById('clearDashboard').addEventListener('click', clearDashboard);

    document.getElementById('input-summary').addEventListener('change', (e) => getSummaryValue(e, cardDeck));

    document.getElementById('updateDashboard').addEventListener('click', () => {
        const summaryElement = document.getElementById('input-summary').value;
        const summaryValue = document.getElementById('summary-value').value;
        getSummarizedDashboard(summaryElement, summaryValue, cardDeck);
    });

}
