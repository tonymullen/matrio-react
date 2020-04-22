import React from 'react';
import CardView from './CardView.jsx';

const Hand = ({ gc, cards, toPlay,
                player, selectedIndex,
                bust, firstMove }) => {
  const humanPlayer = (player === 'player' && toPlay === 3);
  const handContent = !bust ? (
      cards.map((card, i) =>
        <div className='hand' key={i}>
          <CardView
            clickable={!firstMove && humanPlayer}
            card={card}
            gc={humanPlayer? gc : null}
            gray={selectedIndex !== undefined
                  && selectedIndex !== -1
                  && selectedIndex !== i}
          />
        </div>)
      ) : (
        <div className={ bust? (player==='west' ? 'bustl' : 'bust') : null }>
          <strong>BUST</strong>
        </div>
      );

  return (
    <div className='hand-container'>
      {handContent}
    </div>
  );
}

export default Hand;