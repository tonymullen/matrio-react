import React from 'react';
import CardView from './CardView.jsx';

export default class Hand extends React.Component {
  render() {
    const { cards, toPlay, player,
            selectedIndex, bust, firstMove } = this.props;
    let clickable = false;
    let gc = null;
    if (player === 'player' && toPlay === 3) {
      if (!firstMove) {
        clickable = true;
      }
      gc = this.props.gc;
    }
    let bustClass;
    if (bust && (player === 'west')) {
      bustClass = 'bustl';
    } else if (bust) {
      bustClass = 'bust';
    }

    const handContent = !bust ?
        cards.map((card, i) =>
          <div className='hand' key={i}>
            <CardView
              clickable={clickable}
              card={card}
              gc={gc}
              gray={selectedIndex !== undefined
                    && selectedIndex !== -1
                    && selectedIndex !== i}
              ></CardView>
          </div>)
          :
          <div className={bustClass}><strong>BUST</strong></div>;

    return (
      <div className='hand-container'>
        {handContent}
      </div>
    )
  }
}