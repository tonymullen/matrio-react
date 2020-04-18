import React from 'react';
import '../style/Matrix.css';

export default class Matrix extends React.Component {

    onDragOver = (ev) => {
      ev.preventDefault();
    }

    // onDrop = (ev, row, col) => {
    //   const { left_or_top } = this.props;
    //   ev.preventDefault();
    //   let cardname = ev.dataTransfer.getData("text");
    //   this.props.placeCard(cardname, row, col, left_or_top);
    // }

    render() {
      const { gc, matrix,
              left_or_top,
              legalMoves,
              totalLegalMoves } = this.props;

      let matClass, rows, columns;
      if (left_or_top === 'topMatrix') {
        matClass = 'matBCell'
        rows = 4;
        columns = 3;
      } else if (left_or_top === 'leftMatrix') {
        matClass = 'matACell'
        rows = 3;
        columns = 4;
      }
      //matClass = matClass + ' droppable';

      let tbody = [];
      for (let i = 0; i < rows; i++) {
        let cells = [];
        for (let j = 0; j < columns; j++) {
          const id = columns * i + j;
          let r = j;
          let c = i;
          if (left_or_top === 'topMatrix') {
            r = i;
            c = j;
          }
          const moveToMake = totalLegalMoves > 0
          const possibleMove = !moveToMake ? true : (
            legalMoves.reduce(
              (b, l) => {
                return ((l[0] === r) && (l[1] === c)) || b
              }, false)
          )

          cells.push(
            <td  key={id}>
              <div
              className={matClass}>
              <img
                src={matrix[r][c].image}
                alt="card"
                onClick={() => {
                  if (moveToMake && possibleMove) {
                    gc.placeCardOnMatrix(left_or_top, r, c);
                  }
                }}
                className={
                  [possibleMove ? 'active' : 'grayOut',
                   moveToMake ? 'move' : ''].join(' ')}
                ></img>

               </div>
            </td>
          );
        }
        tbody.push(<tr key={i}>{cells}</tr>)
      }

      return (
        <div>
          <table className={left_or_top}>
            <tbody>{tbody}</tbody>
          </table>
        </div>
      );
    }
  }

