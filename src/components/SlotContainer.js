import React, { Component } from 'react';
import Slot from './Slot';
import WinningLine from './WinningLine';
import winningLine from '../../public/images/winning-line.png' ;
import SocketIOClient from 'socket.io-client';

class SlotContainer extends Component {
  constructor(props) {
    super(props);
    this.socket = SocketIOClient('http://localhost:4000');
    this.state = {
        speed: 0
    }
  }
  componentDidMount(){
    this.socket.on('message', (data) => {
        this.setState({
          speed: data.speed
        })
    });
 }
  render() {
    var sprite = {
        height: '355px',
        overflow: 'hidden',
        position: 'relative'
    }
    var speed = this.state.speed;
    return (
      <div className="Slot" style={sprite}>
        <Slot id={'slot-one'} duration={speed} delay={0}/>
        <Slot id={'slot-two'} duration={speed} delay={0.8} />
        <Slot id={'slot-three'} duration={speed} delay={1} />
        <Slot id={'slot-four'} duration={speed} delay={1.2}/>
        <Slot id={'slot-five'} duration={speed} delay={1.4}/>
        <WinningLine delay={speed} image={winningLine}/>
      </div>
    );
  }
}

export default SlotContainer;
