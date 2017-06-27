import React, { Component } from 'react';
import SlotContainer from './SlotContainer';
import SocketIO from 'socket.io-client';

const defaultSpeed = 3;
const PORT = 'http://localhost:4000';

class SlotOverlay extends Component {
  constructor(props) {
    super(props);
    this.socket = SocketIO(PORT).connect();
    this.socket.on('connect', () => console.log(`Listen for messages on ${PORT}`));
    this.socket.on('disconnect', () => {
      this.setState({
          speed: defaultSpeed
      });
    })
    this.setNewGame = this.setNewGame.bind(this);
    this.runNewGame = this.runNewGame.bind(this);
    this.state = {
        speed: defaultSpeed,
        game: () => <SlotContainer speed={this.state.speed}/>
    }
  }
  runNewGame(){
    this.setNewGame(this.state.speed)
  }
  setNewGame (duration){
    this.setState({
        speed: duration || defaultSpeed,
        game: () => <SlotContainer speed={this.state.speed} />
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
          <button id="button-play" onClick={this.runNewGame} style={buttonStyles}> Play Again</button>
      </div>
    )
  }
}

export default SlotOverlay;
