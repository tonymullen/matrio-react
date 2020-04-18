
export default class Player {

    constructor(gc, order, color, human=false, level='easy') {
      this.gc = gc;
      this.color = color;
      this.order = order;
      this.human = human;
      this.level = level;
      this.score = null;
      this.cards = [];
      this.bust = false;
    }

    makeMove(card) {
      if (!this.human) {
        this.computerMakeMove[this.level](card);
       }
    }

    computerMakeMove = {
      'easy' : (card=null) => {
          setTimeout(() => {
          this.randomMove(card);
          this.gc.nextMove(this.order);
        }, 500);
      },
      'medium': () =>  {

      },
      'hard': () => {

      }
    }

    randomMove(cardInd=null) {
      let r;
      if (cardInd) {
        r = cardInd;
      } else {
        r = Math.floor(Math.random()*this.cards.length);
      }
      const card = this.cards[r];
      card.flip = false;
      this.cards.splice(r, 1);
      const position = this.selectRandomLegalPosition(card);
      this.gc.placeCard(card, position[0], position[1], position[2]);
    }

    selectRandomLegalPosition(card){
      const legalPositions = this.gc.getLegalPositions(card);
      const top = legalPositions.topMatrix.length > 0 ? Math.random(): 0;
      const left = legalPositions.leftMatrix.length > 0 ? Math.random(): 0;
      if (top > left) {
        return (['topMatrix', ...legalPositions.topMatrix[
            Math.floor(Math.random()*legalPositions.topMatrix.length)]
        ]);
      } else {
        return (['leftMatrix', ...legalPositions.leftMatrix[
            Math.floor(Math.random()*legalPositions.leftMatrix.length)]
        ]);
      }

    }

  }

