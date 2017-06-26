import React, { Component } from 'react';
import Slot from './Slot';
import WinningLine from './WinningLine';
import winningLine from '../../public/images/winning-line.png' ;
import SocketIOClient from 'socket.io-client';

class SlotContainer extends Component {
  constructor(props) {
    super(props);
    this.socket = SocketIOClient('http://localhost:4000');
    console.log(this.props.name)
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
    return (
      
      <div className="Slot" style={sprite}>
        <Slot id={'slot-one'} duration={this.state.speed} delay={0}/>
        <Slot id={'slot-two'} duration={this.state.speed} delay={0.8} />
        <Slot id={'slot-three'} duration={this.state.speed} delay={1} />
        <Slot id={'slot-four'} duration={this.state.speed} delay={1.2}/>
        <Slot id={'slot-five'} duration={this.state.speed} delay={1.4}/>
        <WinningLine delay={this.state.speed} image={winningLine}/>
      </div>
    );
  }
}

export default SlotContainer;
