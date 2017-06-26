import React, { Component } from 'react';
import Slot from './slot';
// import Websocket from 'react-websocket';
import SocketIOClient from 'socket.io-client';

class SlotOverlay extends Component {
  constructor(props) {
    super(props);
    this.socket = SocketIOClient('http://localhost:4000');
    this.newGame = this.newGame.bind(this);
    this.state = {
        game: () => <Slot />,
        speed: 0
    };
  }
  newGame () {
    this.setState({
        game: () => <Slot />
    });
  }
 

  componentWillMount(){
  }
 
  render() {

    let that = this;
    this.socket.on('message', (data) => {
        that.setState({
          speed: data.speed
        })
    })
    // console.log(this.state.speed)
    const Slot = this.state.game;
    let styles = {
      backgroundImage: "url('/slot-bg.png')",
      backgroundSize: '1000px 365px',
      backgroundRepeat: 'no-repeat',
      margin: '100px',
    }
    let buttonStyles = {
        margin: '30px 370px',
        width: '100px',
        height: '45px',
        background: '#FFD700',
        padding: '0',
        border: '0',
        borderRadius: '5px'
    }
    return (
      <div className="App" style={styles}>
          <Slot name={this.state.speed} />
          <button id="button-stop" onClick={this.newGame} style={buttonStyles}> Play Again</button>
      </div>
    );
  }
}

export default SlotOverlay;
