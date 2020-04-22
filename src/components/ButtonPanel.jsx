import React from 'react';

const ButtonPanel = ({ gc, status, playerScores }) => {
  const gameOver = (status === 'GameOver')
  const winningColor =  gameOver ? playerScores[0].color : null;
  const winningScore =  gameOver ? playerScores[0].score : null;
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


export default ButtonPanel;