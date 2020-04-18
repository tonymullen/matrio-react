import React from 'react';
import Matrix from './Matrix'
import MatrixProduct from './MatrixProduct'
import { turnMarkerStyle } from '../style/PlayerColorStyles';

import '../style/MatrixBoard.css';
import logo from '../assets/logo-angle.png'

export default class MatrixBoard extends React.Component {

    render() {
        const {
            gc, topMatrix, leftMatrix,
            dots, toPlay, legalMoves } = this.props;
            const totalLegalMoves =
                    legalMoves.leftMatrix.length +
                    legalMoves.topMatrix.length
        return (
            <div>
            <table className='matBoardTable'>
            <tbody>
            <tr>
                <td>
                    <div
                        style={turnMarkerStyle(toPlay)}>
                </div>
                    <img src={logo} className='logo' alt=''></img>
                </td>
                <td>
                <Matrix className='topMatrix'
                    gc={gc}
                    left_or_top='topMatrix'
                    matrix={topMatrix}
                    legalMoves={legalMoves.topMatrix}
                    totalLegalMoves={totalLegalMoves}
                  />
                </td>
            </tr>
            <tr>
                <td>
                <Matrix className='leftMatrix'
                    gc={gc}
                    left_or_top='leftMatrix'
                    matrix={leftMatrix}
                    legalMoves={legalMoves.leftMatrix}
                    totalLegalMoves={totalLegalMoves}
                />
                </td>
                <td>
                <MatrixProduct
                    dots={dots}
                />
                </td>
            </tr>
            </tbody>
            </table>
        </div>
        );
        }
  }

