import React from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';

const CardView = ({ gc, clickable, gray, card }) => (
  <div>
    <Flippy
      isFlipped={card.flip}>
      <FrontSide>
        <img
          onClick={() => {
            if (clickable) {
                gc.selectCard(card);
              }
            }
          }
          className={ gray ? 'grayOut': ''}
          src={card.image} alt=""
          />
      </FrontSide>
      <BackSide>
        <img src={card.image} alt="" />
      </BackSide>
    </Flippy>
  </div>
);

export default CardView;