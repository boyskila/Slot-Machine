import React, { Component } from 'react';
import ReactDOM  from 'react-dom';
import WinningLine from './winning-line';
import ImageItems from './ImageItems';
import winningLine from '../../public/images/winning-line.png' ;

class Slot extends Component {
  render() {
    var sprite = {
        height: '355px',
        overflow: 'hidden',
        position: 'relative',
        zIndex: '5'
    }
    return (
      <div className="Slot" style={sprite}>
        <ImageItems id={'slot-one'} dekay={0}/>
        <ImageItems id={'slot-two'} delay={0.8} />
        <ImageItems id={'slot-three'} delay={1} />
        <ImageItems id={'slot-four'} delay={1.2}/>
        <ImageItems id={'slot-five'} delay={1.4}/>
        <WinningLine  image={winningLine}/>
      </div>
    );
  }
}

export default Slot;
