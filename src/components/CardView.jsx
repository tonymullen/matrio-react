import React from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import '../style/CardView.css';


export default class CardView extends React.Component {

  selectCard(e, card) {
      const { gc } = this.props;
      // const element = e.currentTarget;
      gc.selectCard(card);
  }

  render() {
    const { card, clickable, gray } = this.props;
    return (
      <div>
      <Flippy
        isFlipped={card.flip}>
        <FrontSide>
          <img
            onClick={(e) => {
              if (clickable) {
                  this.selectCard(e, card);
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
    )
  }
}
