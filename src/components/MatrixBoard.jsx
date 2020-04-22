import React from 'react';
import Matrix from './Matrix'
import MatrixProduct from './MatrixProduct'
import { turnMarkerStyle } from '../style/PlayerColorStyles';

import '../style/MatrixBoard.css';
import logo from '../assets/logo-angle.png'

const MatrixBoard = ({ gc, topMatrix, leftMatrix,
                       dots, toPlay, legalMoves }) => (
    <div>
        <table className='matBoardTable'>
            <tbody>
                <tr>
                    <td>
                        <div
                            style={turnMarkerStyle(toPlay)}>
                         </div>
                        <img src={logo} className='logo' alt='' />
                    </td>
                    <td>
                        <Matrix className='topMatrix'
                            gc={gc}
                            left_or_top='topMatrix'
                            matrix={topMatrix}
                            legalMoves={legalMoves.topMatrix}
                            totalLegalMoves={legalMoves.leftMatrix.length +
                                                legalMoves.topMatrix.length}
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
                        totalLegalMoves={legalMoves.leftMatrix.length +
                                            legalMoves.topMatrix.length}
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


export default MatrixBoard;
