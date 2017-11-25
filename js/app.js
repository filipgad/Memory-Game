$(document).ready(function() {

    let numberOfCards = 20;
    let boardOfCards = [];
    let activeCards = [];
    let canClick = true;
    let tries = 0;
    let correctPairs = 0;

    // function to start game
    const startGame = () => {
        boardOfCards = [];
        activeCards = [];
        canClick = true;
        tries = 0;
        correctPairs = 0;

        const gameBoard = $('#gameBoard').empty(); // clean game board

        // put card number into array
        for(let i=0; i<numberOfCards; i++) {
            boardOfCards.push(Math.floor(i/2));
        }

        // shuffle cards numbers
        for(let i=numberOfCards-1; i>0; i--) {
            const swap = Math.floor(Math.random()*i);
            const temp = boardOfCards[i];
            boardOfCards[i] = boardOfCards[swap];
            boardOfCards[swap] = temp;
        }

        // create cards and put into game board
        for(let i=0; i<numberOfCards; i++) {
            const card = $('<div>');
            card.addClass('card');
            card.addClass('front');
            card.addClass('card-type-'+boardOfCards[i]);
            card.attr('data-card-type', boardOfCards[i]);
            card.attr('data-index', i);

            gameBoard.append(card);
        }

        // event on clicked card
        $('.card').on('click', function() {clickedCard($(this))});
    }

    // compare clicked cards
    const clickedCard = (card) => {
        if (canClick) {

            if (!activeCards[0] || (activeCards[0].data('index') != card.data('index'))) {
                activeCards.push(card);
                card.removeClass('front');
                card.addClass('back');
            }

            if (activeCards.length === 2) {
                canClick = false;
                if (activeCards[0].data('card-type') == activeCards[1].data('card-type')) {
                  setTimeout( () => {
                    deleteCorrectPair()
                  }, 1000);
                } else {
                  setTimeout( () => {
                    resetCards()
                  }, 1000);
                }

                tries ++;
            }
        }
    }

    // remove correct pair
    const deleteCorrectPair = () => {
        activeCards[0].fadeOut( function() {$(this).remove()} );
        activeCards[1].fadeOut( function() {
            $(this).remove();

            correctPairs++;
            if (correctPairs >= numberOfCards / 2) {
              gameOver();
            }

            activeCards = new Array();
            canClick = true;
        });
    }

    // reset wrong pair
    const resetCards = () => {
        activeCards[0].removeClass('back');
        activeCards[0].addClass('front');

        activeCards[1].removeClass('back');
        activeCards[1].addClass('front');

        activeCards = new Array();
        canClick = true;
    }

    // score information
    const gameOver = () => {
      console.log('koniec gry');
    }

    startGame();
});
