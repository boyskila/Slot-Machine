import React, { Component } from 'react';
import WinningLine from './winning-line';
import ImageItems from './ImageItems';
import winningLine from '../../public/images/winning-line.png' ;

class Slot extends Component {
  render() {
    var sprite = {
        height: '355px',
        overflow: 'hidden',
        position: 'relative'
    }
    console.log(this.props.dur)
    return (
      <div className="Slot" style={sprite}>
        <ImageItems id={'slot-one'} duration={this.props.dur} delay={0}/>
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
