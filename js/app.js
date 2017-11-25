$(document).ready(function() {

    class Cards {
      constructor() {
        this.numberOfCards = 20;
        this.cardsInRow = 5;
        this.boardOfCards = [];
        this.cardsImages = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        this.gameBoard = $('#gameBoard');
      }


      makeBoard() {

        for(let i=0; i<this.numberOfCards; i++) {
          this.boardOfCards.push(Math.floor(i/2));
        }

        for(let i=this.numberOfCards-1; i>0; i--) {
          var swap = Math.floor(Math.random()*i);
          var temp = this.boardOfCards[i];
          this.boardOfCards[i] = this.boardOfCards[swap];
          this.boardOfCards[swap] = temp;
        }

        for(let i=0; i<this.numberOfCards; i++) {
          var card = $('<div class=card></div>');
          card.addClass('card-type-'+this.boardOfCards[i]);
          card.data('cardType', this.boardOfCards[i]);
          card.data('index', i);
          card.text(`${this.boardOfCards[i]+1}`);
          this.gameBoard.append(card);
        }
        
      }

    }

    let game = new Cards;
    game.makeBoard()


});
