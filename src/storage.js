function uploadToStorage(cardDeck) {

    localStorage.clear();

    for (let cardIndex in cardDeck) {

        const cardNum = parseInt(cardIndex) + 1;
        const keyStorage = `card${cardNum}`;
        const jsonValue = JSON.stringify(cardDeck[cardIndex]);
        
        localStorage.setItem(keyStorage,jsonValue)
    }
   
}

function downloadFromStorage() {

    const maxCard = localStorage.length;
    let cardDeck = [];

    for (let cardIndex = 1; cardIndex < maxCard+1; cardIndex++){

        const keyStorage = `card${cardIndex}`;
        const cardObject = JSON.parse(localStorage[keyStorage]);

        cardDeck.push(cardObject);

    }

    return cardDeck;

}

export {uploadToStorage, downloadFromStorage}