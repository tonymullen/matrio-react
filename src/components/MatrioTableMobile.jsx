import React from 'react';
import Hand from './Hand.jsx';
import MatrixBoard from './MatrixBoard.jsx';
import ButtonPanel from './ButtonPanel.jsx';

import '../style/mobile/CardView.css';
import '../style/mobile/Dot.css';
import '../style/mobile/Hand.css';
import '../style/mobile/ButtonPanel.css';
import '../style/mobile/Matrix.css';
import '../style/mobile/MatrixBoard.css';
import '../style/mobile/MatrixProduct.css';
import '../style/mobile/MatrioTable.css';

const MatrioTableMobile = ({ gc,
              gameState: { playerCards, topMatrix, leftMatrix,
                dots, status, toPlay, selectedIndex, legalMoves,
                firstMove, busts, playerScores } }) => (
  <div>
    <table className='matrioTable'>
      <tbody>
        <tr>
          <td className='matrioTableCell'>
          <div className='cardTray'>
                <div className='sideTray west' >
                <Hand
                  cards={playerCards[0]}
                  player='west'
                  bust={busts[0]}
                />
                </div>
            </div>
            </td>
          <td className='matrioTableCell'>
            <div className='north'>
                <Hand
                  cards={playerCards[1]}
                  player='north'
                  bust={busts[1]}
                />
              </div>
            </td>
          <td className='matrioTableCell'>
            <div className='cardTray'>
                <div  className='sideTray east transOrigin' >
                <Hand
                  cards={playerCards[2]}
                  player='east'
                  bust={busts[2]}
                />
                </div>
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan="3">
          <MatrixBoard
            gc={gc}
            topMatrix={topMatrix}
            leftMatrix={leftMatrix}
            toPlay={toPlay}
            dots={dots}
            legalMoves={legalMoves}
            />
          </td>
        </tr>
        </tbody>
      </table>
      <div className='south'>
      <Hand
        cards={playerCards[3]}
        bust={busts[3]}
        player='player'
        toPlay={toPlay}
        firstMove={firstMove}
        selectedIndex={selectedIndex}
        gc={gc}
        />
      </div>
      <ButtonPanel
        gc={gc}
        playerScores={playerScores}
        status={status}>
      </ButtonPanel>
    </div>
)

export default MatrioTableMobile;