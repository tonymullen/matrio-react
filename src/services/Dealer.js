import { Subject, from, timer, zip  } from 'rxjs';
import { concat } from 'rxjs/operators';
import Card from './Card.js';

export default class Dealer {
  constructor () {
    this.deck = [];
    this.freshDeck();
  }

  freshDeck() {
    const suits = ['heart', 'diamond', 'spade', 'club'];
    const faces =  [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];

    // this.deal$ = new Observable();
    this.distribution$ = new Subject(); // strings
    this.trigger$ = new Subject(); // booleans
    this.end$ = new Subject();

    this.deck = this.shuffle(
      // generate deck from suits and faces
      suits.map(s =>
        faces.map(f =>
          new Card(s,f)
        )
      ).reduce((accumulator, list) =>
        accumulator.concat(list)
      ).filter((c) =>
          !((c.face === '4' && c.suit === 'club')
          ||(c.face === '10' && c.suit === 'diamond'))
      ).concat([new Card('joker', 'black'), new Card('joker', 'red')])
    );
    //this.deck[1].flip = true;

    // The deal proper is queued up behind the trigger subject
    this.deal$ = this.trigger$.pipe(concat(
      zip(
          timer(500, 50),
          // Create observable from shuffled deck and distribution
          zip(
            this.distribution$,
            from(this.deck)
          )
        )
      )
    );
  }

  deal() {
    // feed and complete the trigger subject to release the deal
    this.trigger$.next(true);
    this.trigger$.complete();

    // create distribution of cards
    for (let i = 0; i < this.deck.length; i++) {
      this.distribution$.next(i%4);
    }
    this.distribution$.complete();
  }

  shuffle(array) {
    let currentInd = array.length, temp, randInd;
    while (0 !== currentInd ) {
      randInd = Math.floor(Math.random() * currentInd);
      currentInd--;
      temp = array[currentInd]
      array[currentInd] = array[randInd];
      array[randInd] = temp;
    }
    return array;
  }
}