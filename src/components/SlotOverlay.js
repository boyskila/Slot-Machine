import React, { Component } from 'react';
import Slot from './slot';

class SlotOverlay extends Component {
  render() {
    var styles = {
      backgroundImage: "url('/slot-bg.png')",
      // backgroundSize: '700px 700px',
      backgroundRepeat: 'no-repeat',
      margin: '100px'
    }
    
    return (
      <div className="App" style={styles}>
          <Slot/>
          <button id="button-stop"> stop rolling </button>
          <button id="button-play"> play rolling </button>
      </div>
    );
  }
}

export default SlotOverlay;
