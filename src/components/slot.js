import React, { Component } from 'react';
import ReactDOM  from 'react-dom';
import WinningLine from './winning-line';
import ImageItems from './ImageItems';

class Slot extends Component {
  render() {
    
    var sprite = {
        height: '286px',
        overflow: 'hidden',
        position: 'relative'
    }
    this.componentDidMount = function() {
            // var $this = ReactDOM.findDOMNode('');
            //console.log(document.getElementById("slot-one"))
            var slotOne = document.getElementById('test');
        slotOne.addEventListener("animationend", function() {
            console.log("animation end")
        }, false);
    }
    return (
      <div className="Slot" id='test' style={sprite}>
        <ImageItems id={'slot-one'} class={'slots'}/>
        <ImageItems id={'slot-two'} class={'delay-one slots'}/>
        <ImageItems id={'slot-three'} class={'delay-two slots'}/>
        <ImageItems id={'slot-four'} class={'delay-three slots'}/>
        <ImageItems id={'slot-five'} class={'delay-four slots'}/>
        <WinningLine />
      </div>
    );
  }
}

export default Slot;
