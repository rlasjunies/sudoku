import { Component, Event, Prop, Element, h } from '@stencil/core';
import { EventEmitter } from 'events';


@Component({
  tag: 'acc-switch',
  styleUrl: 'acc-switch.css'
})
export class AccSwitch {
  @Element() element: HTMLAccSwitchElement;
  @Event() switch: EventEmitter
  @Prop() checkInitialValue: boolean = false;

  checkBox: HTMLInputElement;
  checkBoxChangeHandler() {
    this.switch.emit(this.checkBox.checked + "" );
  }

  componentDidLoad() {
    this.checkBox = this.element.querySelector('#checkbox');
  }
  render() {
    return (
      [
        <div class="container">
          <label class="acc-switch" >
          
            <input
              id="checkbox"
              type="checkbox"
              checked={this.checkInitialValue}
              onChange={() => this.checkBoxChangeHandler()} />
            {/* <input type="checkbox"/> */}
            <span class="slider round"></span>
          </label>
        </div>,
        <div
          onClick={()=> this.checkBoxChangeHandler()}>
          <slot />
        </div>
      ]
    );
  }
}