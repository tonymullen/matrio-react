import React from 'react';
import { colors } from '../style/PlayerColorStyles';

export default class Dot extends React.Component {

    render() {
        if (this.props.dot.player === 'nobody') {
             return (
                 <div></div>
             )
         } else {
             const color = colors[this.props.dot.player];
            return (
                <div className='dot' style={{backgroundColor: color}} >
                    <div className='dotInner'>
                        <div className='dotText'>
                            {this.props.dot.score}
                        </div>
                    </div>
                </div>
            );
        }
    }
  }

