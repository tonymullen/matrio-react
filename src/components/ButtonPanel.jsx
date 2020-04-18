import React from 'react';
import '../style/ButtonPanel.css';

export default class ButtonPanel extends React.Component {
  render() {
    const { gc, status, playerScores} = this.props;
    let winningColor, winningScore;
    if (status === 'GameOver') {
      winningColor = playerScores[0].color;
      winningScore = playerScores[0].score;
    }
    return (
        <div>
        {
          {
              'Start':
                <button type="button" onClick={() => {gc.deal()}}  className="start">
                  <strong>START</strong>
                </button>,
              'GameOver':
                <div className="scoreBoard">
                  <div className="message gameOver"><strong>GAME OVER</strong></div>
                   <div className="message winner">
                      <p>
                      {winningColor} wins with a score of {winningScore}
                      </p>
                    </div>
                    <p></p>
                  <button type="button" onClick={() => {gc.resetGame()}}  className="playAgain">
                    <strong>PLAY AGAIN</strong>
                  </button>
                </div>,
          }[status]
        }
        </div>
      )
  }
}
