import React from 'react';
import Dot from '../components/Dot'
import '../style/MatrixProduct.css';


const MatrixProduct = ({ dots }) => {
      let tbody = [];
      for (let i = 0; i < 3; i++) {
        let cells = [];
        for (let j = 0; j < 3; j++) {
          const id = 3 * i + j;
          cells.push(
            <td key={id}>
              <div className='dotCell'>
                <Dot dot={dots[i][j]} />
              </div>
            </td>
          );
        }
        tbody.push(<tr key={i}>{cells}</tr>)
      }

  return (
    <div>
      <table className='dotsTable' id="board">
        <tbody>{tbody}</tbody>
      </table>
    </div>
  );
}

export default MatrixProduct;