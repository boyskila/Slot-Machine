import React, { Component } from 'react';
import Slot from './Slot';
import Scores from './Scores';
import WinningLine from './WinningLine';
import winningLine from '../../public/images/winning-line.png' ;

class SlotContainer extends Component {
  
  render() {
    var slotContainerStyles = {
        height: '355px',
        overflow: 'hidden',
        marginTop: '152px',
        marginLeft: '142px'
    }
    var speed = this.props.speed;
    return (
      <div className="SlotContainer" style={slotContainerStyles}>
        <Slot id={'slot-one'} duration={speed} delay={0}/>
        <Slot id={'slot-two'} duration={speed} delay={0.8} />
        <Slot id={'slot-three'} duration={speed} delay={1} />
        <Slot id={'slot-four'} duration={speed} delay={1.2}/>
        <Slot id={'slot-five'} duration={speed} delay={1.4}/>
        <WinningLine delay={speed} image={winningLine}/>
        <Scores />
      </div>
    );
  }
}

export default SlotContainer;
