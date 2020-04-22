const images = require.context('../assets/png/1x', true);

export default class Card {

  constructor(suit, face) {
    this._suit = suit;
    this._face = face;
    this._flip = false;
    this._image = images(`./${face}_${suit}.png`);
    this._flipImage = images(`./back-navy.png`);
  }

  get suit() {
    return this._suit;
  }

  get face() {
    return this._face;
  }

  get index() {
    return this._index;
  }

  get player() {
    return this._player;
  }

  set index(i) {
    this._index = i;
  }

  set player(p) {
    this._player = p;
  }

  get name() {
    return this._face + "_" + this._suit;
  }

  get image() {
    return this.flip ? this._flipImage : this._image;
  }

  get flip(){
    return this._flip;
  }

  set flip(f) {
    this._flip = f;
  }

  get value() {
    if (this.face === 'blank') {
      return null;
    }
    let v = 0
    if (this.face === 'queen' && this.suit === 'spade') {
      v = 13;
    } else if (this.face === 'king'  ||
        this.face === 'queen' ||
        this.face === 'jack') {
            v = 10;
        } else if (this.suit === 'joker') {
            v = 0;
        } else {
            v = Number(this.face) ;
        }
    if (this.suit === 'heart' ||
        this.suit === 'diamond') {
          v *= -1;
        }
    return v;
  }
}
