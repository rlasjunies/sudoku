import { Component, Event, EventEmitter } from '@stencil/core';


@Component({
  tag: 'acc-button',
  styleUrl: 'acc-button.css'
})
export class AccButton {
  @Event() click_:EventEmitter;

  onClickHandler(){
    this.click_.emit();
  }
  render() {
    return (
      <button class="acc-button" onClick={()=> this.onClickHandler()}><slot/></button>
    );
  }
}