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

        const gameBoard = $('.game__board').empty(); // clean game board
        scoreInfo(tries);

        // put card number into array
        for(let i=0; i<numberOfCards; i++) {
            boardOfCards.push(Math.floor(i/2));
        }

        // shuffle cards numbers
        boardOfCards.forEach ( (elem, index) => {
            const swap = Math.floor(Math.random()*index);
            const temp = boardOfCards[index];
            boardOfCards[index] = boardOfCards[swap];
            boardOfCards[swap] = temp;
        });

        // create cards and put into game board
        boardOfCards.forEach( (elem, index) => {
            const cardBox = $('<div>').addClass('game__board--cardBox');
            const card = $('<div>');
            card.addClass(`game__board--card card-type-${elem}`);
            card.attr('data-card-type', elem);
            card.attr('data-index', index);

            cardBox.append(card);
            gameBoard.append(cardBox);
        });

        // event on clicked card
        $('.game__board--card').on('click', function() { clickedCard( $(this) ) });
    }

    // compare clicked cards
    const clickedCard = (card) => {
        if (canClick) {
            
            // const transformCard = { 
            //     "transform": "rotateY(360deg)", 
            //     "-moz-transform": "rotateY(360deg)", 
            //     "-ms-transform": "rotateY(360deg)",
            //     "-webkit-transform": "rotateY(360deg)",
            //     "-o-transform": "rotateY(360deg)"
            // }

            if (!activeCards[0] || (activeCards[0].data('index') != card.data('index'))) {
                activeCards.push(card);
                card.css('transform', 'rotateY(360deg)').toggleClass('back');
            }

            if (activeCards.length === 2) {
                canClick = false;
                if (activeCards[0].data('card-type') == activeCards[1].data('card-type')) {
                  setTimeout( () => {
                    deleteCorrectPair(activeCards[0], activeCards[1])
                  }, 1000);
                } else {
                  setTimeout( () => {
                    resetCards(activeCards[0], activeCards[1])
                  }, 1000);
                }
            }
        }
    }

    // remove correct pair
    const deleteCorrectPair = (card1, card2) => {
        card1.fadeOut( () => { $(this).remove() } );
        card2.fadeOut( () => { $(this).remove() } );

        correctPairs++;
        if (correctPairs >= numberOfCards / 2) {
            tries++;
            gameOver(tries);
        } else {
            activeCards = new Array();
            canClick = true;
            tries++;
            scoreInfo(tries);
        }
    }

    // reset wrong pair
    const resetCards = (card1, card2) => {
        card1.css('transform', 'none').toggleClass('back');
        card2.css('transform', 'none').toggleClass('back');

        activeCards = new Array();
        canClick = true;
        tries++;
        scoreInfo(tries);
    }

    // score information
    const scoreInfo = (tries) => {
        const score = $('.game__score').text('Score: ' + tries);
    }

    // game over, score
    const gameOver = (tries) => {
        $('.slide__score').addClass('show');
        $('.slide__game').removeClass('show');
        $('#score__board span').text(tries);
    }

    // buttons event - start/restart/new game
    $('.game__button').on('click', function() {
        $(this).parent().removeClass('show');
        $('.slide__game').addClass('show');
        startGame();
    });

});
