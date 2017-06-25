import React from 'react';
import ReactDOM from 'react-dom';
import SlotOverlay from './components/SlotOverlay';

ReactDOM.render(
  <SlotOverlay />,
  document.getElementById('root')
);

var button = document.getElementById('button-stop');
    button.addEventListener('click', function(){
      var slots = document.getElementsByTagName('ul');
      for(let i = 0; i < slots.length; i++) {
            let slot = slots[i];
            slot.style.animationPlayState = 'paused';
        }
    })
    var buttonPlay = document.getElementById('button-play');
    buttonPlay.addEventListener('click', function(){
      var slots = document.getElementsByTagName('ul');
      for(let i = 0; i < slots.length; i++) {
            let slot = slots[i];
            slot.style.animationPlayState = 'running';
        }
    })