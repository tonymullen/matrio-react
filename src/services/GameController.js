import Dealer from './Dealer.js';
import Player from './Player.js';
import Card from './Card.js';
import Dot from './Dot.js';

// const RESTART_WAIT= 3000;
// const MESSSAGE_WAIT = 1000;

export default class GameController {
  constructor(app) {
    this.app = app;
    this.setup();
  }

  get gameState() {
    return {
      leftMatrix: this.leftMatrix,
      topMatrix: this.topMatrix,
      playerCards: this.players.map(p => p.cards),
      playerScores: this.players
                      .map(p => ({
                          color:  p.color,
                          score: p.score
                          }))
                      .filter(p => p.score !== null)
                      .sort((a, b) => b.score - a.score),
      dots: this.dots,
      status: this.status,
      toPlay: this.toPlay,
      playersActive: this.playersActive,
      humanMove: this.toPlay === 3,
      selectedIndex: this.selectedIndex,
      legalMoves: this.legalMoves,
      firstMove: this.firstMove,
      busts: this.players.map((p) => p.bust),
    }
  }

  deal() {
    this.status = 'Dealing';
    this.app.reveal();
    this.dealer.deal();
  }

  setUpDealSubscription() {
    this.dealer.deal$.subscribe(c => {
      if(Array.isArray(c)) {
        let card = c[1][1];
        card.flip = true;
        card.player = c[1][0];
        if (card.player === 3) { card.flip = false };
        card.index = this.players[card.player].cards.length;
        this.players[card.player].cards.push(card);
        this.app.setState(this.gameState);
      }
    },
    err => { console.log(err)},
    () => {
        console.log("Finished dealing");
        setTimeout(() => {
          this.beginPlay();
        }, 1000);
      }
    );
  }

  beginPlay() {
    const firstPlayer = this.getFirstPlayer();
    this.toPlay = firstPlayer.player;
    this.app.setState(this.gameState);
    this.startTurns(firstPlayer.player, firstPlayer.card);
  }

  setup() {
    this.suitOrder = {
      'spade': 0,
      'diamond': 1,
      'club': 2,
      'heart': 3
    }

    this.dealer = new Dealer();

    this.leftMatrix = [
      [new Card('spade', 'blank'), new Card('spade', 'blank'), new Card('spade', 'blank')],
      [new Card('diamond', 'blank'), new Card('diamond', 'blank'), new Card('diamond', 'blank')],
      [new Card('club', 'blank'), new Card('club', 'blank'), new Card('club', 'blank')],
      [new Card('heart', 'blank'), new Card('heart', 'blank'), new Card('heart', 'blank')],
    ];

    this.topMatrix = [
      [new Card('spade', 'blank'), new Card('spade', 'blank'), new Card('spade', 'blank')],
      [new Card('diamond', 'blank'), new Card('diamond', 'blank'), new Card('diamond', 'blank')],
      [new Card('club', 'blank'), new Card('club', 'blank'), new Card('club', 'blank')],
      [new Card('heart', 'blank'), new Card('heart', 'blank'), new Card('heart', 'blank')],
    ];

    this.dots = [
      [new Dot('nobody', null), new Dot('nobody', null), new Dot('nobody', null)],
      [new Dot('nobody', null), new Dot('nobody', null), new Dot('nobody', null)],
      [new Dot('nobody', null), new Dot('nobody', null), new Dot('nobody', null)],
    ];

    this.emptyTrays = {
        heart: 6,
        spade: 6,
        club: 6,
        diamond: 6,
    };

    this.players = [
      new Player(this, 0, 'Orange', false),
      new Player(this, 1, 'Purple', false),
      new Player(this, 2, 'Yellow', false),
      new Player(this, 3, 'Blue', true)]

    this.toPlay = null;

    this.status = 'Start';

    this.selectedIndex = -1;

    this.legalMoves = {
      topMatrix: [],
      leftMatrix: [],
    }
    this.firstMove = true;

    this.setUpDealSubscription();

  }

  getFirstPlayer() {
    console.log('getting first player');
    let startPlayer = -1;
    for (let i = 0; i < 4; i++) {
      // eslint-disable-next-line no-loop-func
      this.players[i].cards.forEach((c, cardInd) => {
        if (c.face === '2' && c.suit === 'club') {
          startPlayer = {
            player: i,
            card: cardInd,
            };
        }
      });
    }
    return startPlayer;
  }

  startTurns(firstPlayer, card) {
    this.takeTurn(firstPlayer, card);
  }

  takeTurn(player, cardInd=null) {
    if (cardInd && player===3) {
      this.selectedIndex = cardInd;
      this.selectCard(this.players[player].cards[cardInd])
      this.app.setState(this.gameState);
    }
    if (this.players.map(p => p.cards.length).reduce((x, y) => x + y, 0) > 0) {
      this.players[player].makeMove(cardInd)
    } else {
      console.log("Game over");
      this.status = "GameOver";
      this.calculateScores();
      this.app.conceal();
      this.app.setState();
    }
  }

  nextMove(player) {
    this.updateDots(player);
    this.toPlay = ((player + 1) % 4);
    while (this.players[this.toPlay].bust) {
      this.toPlay = ((this.toPlay + 1) % 4);
    }
    this.app.setState(this.gameState);
    this.takeTurn(this.toPlay);
  }

  placeCardOnMatrix(matrix, r, c) {
    const card = this.players[this.toPlay].cards[this.selectedIndex];
    const firstPart = this.players[this.toPlay].cards
                      .slice(0, this.selectedIndex)
    const secondPart = this.players[this.toPlay].cards
                      .slice(
                        this.selectedIndex+1,
                        this.players[this.toPlay].cards.length)
                          .map((c) => {
                            c.index = c.index - 1
                            return c
                          });
    this.players[this.toPlay].cards = firstPart.concat(secondPart);
    this.selectedIndex = -1;
    this.legalMoves = {
      topMatrix: [],
      leftMatrix: [],
    }
    this.placeCard(card, matrix, r, c)
    this.nextMove(this.toPlay);
  }

  placeCard(card, matrix, p1, p2) {
    if (this[matrix][p1][p2].face === 'blank') {
      this.emptyTrays[this[matrix][p1][p2].suit] -= 1;
    }
    this[matrix][p1][p2] = card;
    if (this.firstMove) {
      this.firstMove = false;
    }
    this.app.setState(this.gameState);
  }

  selectCard(card) {
    if (this.firstMove) {
      this.legalMoves = this.getLegalPositions(card)
    } else {
      if ((card.index === this.selectedIndex) &&
            this.players[3].cards.length > 1) {
          this.selectedIndex = -1;
          this.legalMoves = {
            topMatrix: [],
            leftMatrix: [],
          };
        } else {
          this.selectedIndex = card.index;
          this.legalMoves = this.getLegalPositions(card)
        }
    }
    this.app.setState(this.gameState);
  }

  getLegalPositions(card){
    let topMatLegal = []
    let leftMatLegal = []
    if (card.suit === 'joker') {
      this.topMatrix.forEach((row, r) => {
        row.forEach((c, i) => {
          topMatLegal.push([r, i]);
        })
      });
      this.leftMatrix.forEach((row, r) => {
        row.forEach((c, i) => {
          leftMatLegal.push([r, i]);
        })
      });
      return {
        topMatrix: topMatLegal,
        leftMatrix: leftMatLegal,
      }
    } else if (this.emptyTrays[card.suit] > 0) {
      this.topMatrix[this.suitOrder[card.suit]].forEach((c, i) => {
        if (c.value === null) {
          topMatLegal.push([this.suitOrder[card.suit], i]);
        }
      });
      this.leftMatrix[this.suitOrder[card.suit]].forEach((c, i) => {
        if (c.value === null) {
          leftMatLegal.push([this.suitOrder[card.suit], i]);
        }
      });
      return {
        topMatrix: topMatLegal,
        leftMatrix: leftMatLegal,
      }
    } else {
      this.topMatrix.forEach((row, r) => {
          row.forEach((c, i) => {
          if (c.value !== null) {
            topMatLegal.push([r, i]);
          }
        })
      });
      this.leftMatrix.forEach((row, r) => {
          row.forEach((c, i) => {
          if (c.value !== null) {
            leftMatLegal.push([r, i]);
          }
        })
      });
      return {
        topMatrix: topMatLegal,
        leftMatrix: leftMatLegal,
      }
    }
  }

  updateDots(player) {
    for (let leftRow = 0; leftRow < 3; leftRow++) {
      let filledrows = true;
      for (let leftColumn = 0; leftColumn < 4; leftColumn++) {
        if (this.leftMatrix[leftColumn][leftRow].face === 'blank') {
          filledrows = false;
        }
      }
      if (filledrows) {
        for (let topColumn = 0; topColumn < 3; topColumn++) {
          let filledcolumns = true;
          for (let topRow = 0; topRow < 4; topRow++) {
            if (this.topMatrix[topRow][topColumn].face === 'blank') {
              filledcolumns = false;
            }
          }
          if (filledcolumns) {
            if (this.dots[leftRow][topColumn].player === 'nobody') {
              this.dots = this.dots
                .slice(0, leftRow)
                .concat([
                  this.dots[leftRow]
                    .slice(0, topColumn)
                    .concat([new Dot(player, this.getDotProduct(leftRow, topColumn))])
                    .concat(this.dots[leftRow].slice(topColumn + 1, 3)),
                ])
                .concat(this.dots.slice(leftRow + 1, 3));
            } else {
              this.dots = this.dots
                .slice(0, leftRow)
                .concat([
                  this.dots[leftRow]
                    .slice(0, topColumn)
                    .concat([
                      new Dot(
                        this.dots[leftRow][topColumn].player,
                        this.getDotProduct(leftRow, topColumn),
                      ),
                    ])
                    .concat(this.dots[leftRow].slice(topColumn + 1, 3)),
                ])
                .concat(this.dots.slice(leftRow + 1, 3));
            }
          }
        }
      }
    }
    this.setBusts();
    this.app.setState(this.gameState);
  }

  getDotProduct(leftRow, topColumn) {
    let dp = 0;
    for (let i = 0; i < 4; i++) {
      dp += this.leftMatrix[i][leftRow].value * this.topMatrix[i][topColumn].value;
    }
    return dp;
  }

  setBusts(){
    let playerDotCounts = [0, 0, 0, 0];
    let full = true;
    this.dots.forEach(row => {
      row.forEach(dot => {
        if (dot.player === 'nobody') {
          full = false;
        } else {
          playerDotCounts[Number(dot.player)]++;
        }
      });
    });

    let busts = [];
    for (let i = 0; i <= 3; i++) {
      if (playerDotCounts[i] === 0) {
        busts.push(i);
      }
    }
    if (full) {
      busts.forEach((p) => {
         this.players[p].cards = [];
         this.players[p].bust = true;
      });
    }
  }

  calculateScores() {
    this.players.forEach(player => {
      if (player.bust) {
        player.score = null;
      } else {
        player.score = 0;
      }
    });
    this.dots.forEach(row => {
      row.forEach( dot => {
          if (!this.players[dot.player].bust) {
            this.players[dot.player].score += dot.score;
          }
        });
      });
    }

  resetGame() {
    this.setup();
    this.app.conceal();
    this.app.setState({});
  }
}


