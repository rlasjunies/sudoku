import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'acc-icon',
  styleUrl: 'acc-icon.css'
})
export class AccButton {
  @Prop() iconUnicodeCode: string = "";

  getUnicode() {
    return JSON.parse(`["\\u${this.iconUnicodeCode}"]`)[0];
  }

  render() {
    return ([
      <div id="iconid">{this.getUnicode()}</div>,
    ])
  }
}