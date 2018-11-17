import { Component, Event } from '@stencil/core';
import { EventEmitter } from 'events';


@Component({
  tag: 'acc-switch',
  styleUrl: 'acc-switch.css'
})
export class AccSwitch {
  @Event() switch: EventEmitter

  checkBoxChangeHandler(switchValue:boolean) {
    this.switch.emit(switchValue + "");
  }

  render() {
    return (
      // <div onClick={_ => this.onClickHandler()}>
      // <div onClick={evt => this.divOnClickChange(evt)} >
        <label class="acc-switch" >
          <input type="checkbox" onChange={ evt => this.checkBoxChangeHandler((evt.srcElement as HTMLInputElement).checked)} />
          {/* <input type="checkbox"/> */}
          <span class="slider"></span>
          <slot/>
        </label>
      // </div>
    );
  }
}