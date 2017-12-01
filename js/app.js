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
        const score = $('.score').text('Score: ' + tries);

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
            const cardBox = $('<div>').addClass('cardBox');
            const card = $('<div>');
            card.addClass('card');
            card.addClass('front');
            card.addClass('card-type-'+boardOfCards[i]);
            card.attr('data-card-type', boardOfCards[i]);
            card.attr('data-index', i);

            cardBox.append(card);
            gameBoard.append(cardBox);
        }

        // event on clicked card
        $('.card').on('click', function() {clickedCard($(this))});
    }

    // compare clicked cards
    const clickedCard = (card) => {
        if (canClick) {

            if (!activeCards[0] || (activeCards[0].data('index') != card.data('index'))) {
                activeCards.push(card);
                card.css('transform', 'rotateY(360deg)');
                setTimeout( () => {
                  card.removeClass('front');
                  card.addClass('back');
                }, 200);
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
                  }, 2000);
                }
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
            tries++;
            scoreInfo(tries);
        });
    }

    // reset wrong pair
    const resetCards = () => {
        activeCards[0].css('transform', 'none');
        activeCards[0].removeClass('back');
        activeCards[0].addClass('front');

        activeCards[1].css('transform', 'none');
        activeCards[1].removeClass('back');
        activeCards[1].addClass('front');

        activeCards = new Array();
        canClick = true;
        tries++;
        scoreInfo(tries);
    }

    // score information
    const scoreInfo = (tries) => {
      const score = $('.score');
      score.text('Score: ' + tries);
    }

    // game over, score
    const gameOver = () => {
      $('.slide-score').addClass('show');
      $('.slide-game').removeClass('show');
      $('#gameScore span').text(tries);
    }

    // buttons event - start/restart/new game
    $('.button').on('click', function() {
      $(this).parent().removeClass('show');
      $('.slide-game').addClass('show');
      startGame()
    });

    $('.smallBoard').on('click', function() {
      $('.slide-game').addClass('show');
      $(this).parent().parent().removeClass('show');
    });

});
