import { Component, EventEmitter, Event, Prop } from '@stencil/core';

@Component({
  tag: 'key-board2',
  styleUrl: 'key-board2.css',
  shadow: true
})
export class KeyBoard2 {
  @Event() numberClicked: EventEmitter;
  @Event() clearClicked: EventEmitter;

  @Prop() draftMode: boolean;

  numberClickedHandler(value: string) {
    this.numberClicked.emit(value);
  }
  clearClickedHandler() {
    this.clearClicked.emit("x");
  }

  cellHTML(digit: number) {
    if (this.draftMode) {
      return (
        <table class="table-show">
          <tbody>
            <tr>
              <td><div class="draftvalue">{digit === 1 ? '1' : ''}</div></td>
              <td><div class="draftvalue">{digit === 2 ? '2' : ''}</div></td>
              <td><div class="draftvalue">{digit === 3 ? '3' : ''}</div></td>
            </tr>
            <tr>
              <td><div class="draftvalue">{digit === 4 ? '4' : ''}</div></td>
              <td><div class="draftvalue">{digit === 5 ? '5' : ''}</div></td>
              <td><div class="draftvalue">{digit === 6 ? '6' : ''}</div></td>
            </tr>
            <tr>
              <td><div class="draftvalue">{digit === 7 ? '7' : ''}</div></td>
              <td><div class="draftvalue">{digit === 8 ? '8' : ''}</div></td>
              <td><div class="draftvalue">{digit === 9 ? '9' : ''}</div></td>
            </tr>
          </tbody>
        </table>
      )
    } else {
      return (
        <div>{digit}</div>
      )
    }
  }

  render() {
    return (
      <div class="key-board">
        <div class="row">
          <div class="key" onClick={() => this.numberClickedHandler("1")}>{this.cellHTML(1)}</div>
          <div class="key" onClick={() => this.numberClickedHandler("2")}>{this.cellHTML(2)}</div>
          <div class="key" onClick={() => this.numberClickedHandler("3")}>{this.cellHTML(3)}</div>
          <div class="key" onClick={() => this.numberClickedHandler("4")}>{this.cellHTML(4)}</div>
          <div class="key" onClick={() => this.numberClickedHandler("5")}>{this.cellHTML(5)}</div>
          <div class="key" onClick={() => this.numberClickedHandler("6")}>{this.cellHTML(6)}</div>
          <div class="key" onClick={() => this.numberClickedHandler("7")}>{this.cellHTML(7)}</div>
          <div class="key" onClick={() => this.numberClickedHandler("8")}>{this.cellHTML(8)}</div>
          <div class="key" onClick={() => this.numberClickedHandler("9")}>{this.cellHTML(9)}</div>
          <div class="key" onClick={() => this.clearClickedHandler()}><div>X</div></div>
        </div>
      </div>
    );
  }
}
