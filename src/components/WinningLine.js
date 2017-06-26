import React, { Component } from 'react';
import winningLine from '../../public/images/winning-line.png' ;
import '../css/winning-line.css'
import WinningLineAnimations from '../animations/winningLineAnimations';

class WinningLine extends Component {
  render() {
    let Animation = WinningLineAnimations(this.props.delay);
    const imgCount = [1, 2, 3, 4, 5];
    return (
        <div className="winning-line hide-at-beginning fade-in" style={Animation.fadeInRules}>
            {
                imgCount.map((i) => {
                    return (<img key={i} className='winning' src={winningLine} alt='winning-ring'/>)
                })
            }
        </div>
    );
  }
}
export default WinningLine;