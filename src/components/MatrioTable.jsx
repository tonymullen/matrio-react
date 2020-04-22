import React from 'react';
import Hand from './Hand.jsx';
import MatrixBoard from './MatrixBoard.jsx';
import ButtonPanel from './ButtonPanel.jsx';

import '../style/CardView.css';
import '../style/Dot.css';
import '../style/Hand.css';
import '../style/ButtonPanel.css';
import '../style/MatrioTable.css';


//export default class MatrioTable extends React.Component {
const MatrioTable = ({ gc,
          gameState: { playerCards, topMatrix, leftMatrix,
            dots, status, toPlay, selectedIndex, legalMoves,
            firstMove, busts, playerScores } }) => (
  <div>
    <table className='matrioTable'>
      <tbody>
        <tr>
          <td></td>
          <td className='matrioTableCell'>
            <div className='north'>
                <Hand
                cards={playerCards[1]}
                player='north'
                bust={busts[1]}
                />
              </div>
            </td>
          <td></td>
        </tr>
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
          <td>
          <MatrixBoard
            gc={gc}
            topMatrix={topMatrix}
            leftMatrix={leftMatrix}
            toPlay={toPlay}
            dots={dots}
            legalMoves={legalMoves}
            />
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
);


export default MatrioTable;