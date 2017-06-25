import React, { Component } from 'react';
import Slot from './slot';
import Foundation from 'react-foundation';

class SlotOverlay extends Component {
  constructor(props) {
    super(props);
    this.newGame = this.newGame.bind(this);
    this.state = {
        game: () => <Slot />
    };
  }
  newGame () {
    this.setState({
        game: () => <Slot />
    });
  }
  render() {
    const Slot = this.state.game;
    var styles = {
      backgroundImage: "url('/slot-bg.png')",
      backgroundSize: '1000px 365px',
      backgroundRepeat: 'no-repeat',
      margin: '100px',
    }

    return (
      <div className="App" style={styles}>
          <Slot/>
          <button id="button-stop" onClick={this.newGame}> Reset</button>
      </div>
    );
  }
}

export default SlotOverlay;
