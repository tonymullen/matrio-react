import React from 'react';
import { colors } from '../style/PlayerColorStyles';

const Dot = ({ dot: {player, score}}) =>  (
    (player === 'nobody') ?
    (
        <div></div>
    ) : (
        <div className='dot' style={{backgroundColor: colors[player]}} >
            <div className='dotInner'>
                <div className='dotText'>
                    {score}
                </div>
            </div>
        </div>
    )
);

export default Dot;