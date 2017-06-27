import React, { Component } from 'react';
import SlotContainer from './SlotContainer';
import SocketIOClient from 'socket.io-client';

class SlotOverlay extends Component {
  constructor(props) {
    super(props);
    this.socket = SocketIOClient('http://localhost:4000');
    this.socket.on('connect', () => console.log('Listen for messages on port 4000'));
    this.setNewGame = this.setNewGame.bind(this);
    this.runNewGame = this.runNewGame.bind(this);
    this.state = {
        speed: 3,
        game: () => <SlotContainer speed={this.state.speed}/>
    }
  }
  runNewGame(){
    this.setNewGame(this.state.speed)
  }
  setNewGame (duration){
    this.setState({
        speed: duration || 3,
        game: () => <SlotContainer speed={this.state.speed}/>
    });
  }
  componentWillMount(){
      this.socket.on('message', (data) => {
        this.setNewGame(data.speed);
    });
  }
  
  render() {
    var SlotContainer = this.state.game;
    var buttonStyles = {
        margin: '30px 370px',
        width: '100px',
        height: '45px',
        background: '#FFD700',
        padding: '0',
        border: '0',
        borderRadius: '5px'
    }
    return (
      <div className="App" >
          <SlotContainer />
          <button id="button-stop" onClick={this.runNewGame} style={buttonStyles}> Play Again</button>
      </div>
    )
  }
}

export default SlotOverlay;
