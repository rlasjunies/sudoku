import { Component, EventEmitter, Event, Prop } from '@stencil/core';

@Component({
  tag: 'key-board3',
  styleUrl: 'key-board3.css',
})
export class KeyBoard2 {
  @Event() numberClicked: EventEmitter;
  @Event() clearClicked: EventEmitter;
  @Event() undoClicked: EventEmitter;

  // @Prop() draftMode: boolean;
  @Prop() remainingNumbers: number[];
  numberClickedHandler(value: string) {
    this.numberClicked.emit(value);
  }
  clearClickedHandler() {
    this.clearClicked.emit("x");
  }
  undoClickedHandler() {
    this.clearClicked.emit("x");
  }

  cellHTML(digit: number, draft: boolean) {
    if (draft) {
      return (
        // <table class="table-show">
        //   <tbody>
        //     <tr>
        //       <td><div class="draftvalue">{digit === 1 ? '1' : ''}</div></td>
        //       <td><div class="draftvalue">{digit === 2 ? '2' : ''}</div></td>
        //       <td><div class="draftvalue">{digit === 3 ? '3' : ''}</div></td>
        //     </tr>
        //     <tr>
        //       <td><div class="draftvalue">{digit === 4 ? '4' : ''}</div></td>
        //       <td><div class="draftvalue">{digit === 5 ? '5' : ''}</div></td>
        //       <td><div class="draftvalue">{digit === 6 ? '6' : ''}</div></td>
        //     </tr>
        //     <tr>
        //       <td><div class="draftvalue">{digit === 7 ? '7' : ''}</div></td>
        //       <td><div class="draftvalue">{digit === 8 ? '8' : ''}</div></td>
        //       <td><div class="draftvalue">{digit === 9 ? '9' : ''}</div></td>
        //     </tr>
        //   </tbody>
        // </table>
        <div class="draftkey">
          <div class="draftkeyrow row0">
            <div class="draftkeycolumn"><div class="draftkeyvalue">{digit === 1 ? '1' : ''}</div></div>
            <div class="draftkeycolumn"><div class="draftkeyvalue">{digit === 2 ? '2' : ''}</div></div>
            <div class="draftkeycolumn"><div class="draftkeyvalue">{digit === 3 ? '3' : ''}</div></div>
          </div>
          <div class="draftkeyrow row1">
            <div class="draftkeycolumn"><div class="draftkeyvalue">{digit === 4 ? '4' : ''}</div></div>
            <div class="draftkeycolumn"><div class="draftkeyvalue">{digit === 5 ? '5' : ''}</div></div>
            <div class="draftkeycolumn"><div class="draftkeyvalue">{digit === 6 ? '6' : ''}</div></div>
          </div>
          <div class="draftkeyrow row2">
            <div class="draftkeycolumn"><div class="draftkeyvalue">{digit === 7 ? '7' : ''}</div></div>
            <div class="draftkeycolumn"><div class="draftkeyvalue">{digit === 8 ? '8' : ''}</div></div>
            <div class="draftkeycolumn"><div class="draftkeyvalue">{digit === 9 ? '9' : ''}</div></div>
          </div>
        </div>
      )
    } else {
      return (
        <div class="value">{digit}</div>
      )
    }
  }

  render() {
    return (
      <div class="key-board">
        <div class="row">
          <div class={this.remainingNumbers[0] > 0 ? "key" : "key hidden"} onClick={() => this.numberClickedHandler("1")}>{this.cellHTML(1, false)}</div>
          <div class={this.remainingNumbers[1] > 0 ? "key" : "key hidden"} onClick={() => this.numberClickedHandler("2")}>{this.cellHTML(2, false)}</div>
          <div class={this.remainingNumbers[2] > 0 ? "key" : "key hidden"} onClick={() => this.numberClickedHandler("3")}>{this.cellHTML(3, false)}</div>
          <div class={this.remainingNumbers[3] > 0 ? "key" : "key hidden"} onClick={() => this.numberClickedHandler("4")}>{this.cellHTML(4, false)}</div>
          <div class={this.remainingNumbers[4] > 0 ? "key" : "key hidden"} onClick={() => this.numberClickedHandler("5")}>{this.cellHTML(5, false)}</div>
          <div class={this.remainingNumbers[5] > 0 ? "key" : "key hidden"} onClick={() => this.numberClickedHandler("6")}>{this.cellHTML(6, false)}</div>
          <div class={this.remainingNumbers[6] > 0 ? "key" : "key hidden"} onClick={() => this.numberClickedHandler("7")}>{this.cellHTML(7, false)}</div>
          <div class={this.remainingNumbers[7] > 0 ? "key" : "key hidden"} onClick={() => this.numberClickedHandler("8")}>{this.cellHTML(8, false)}</div>
          <div class={this.remainingNumbers[8] > 0 ? "key" : "key hidden"} onClick={() => this.numberClickedHandler("9")}>{this.cellHTML(9, false)}</div>
          <div class="key" onClick={() => this.clearClickedHandler()}>
            <clr-icon shape="eraser" class="is-solid"></clr-icon>
          </div>
        </div>
        <div class="row">
          <div class={this.remainingNumbers[0] > 0 ? "key" : "key hidden"} onClick={() => this.numberClickedHandler("1")}>{this.cellHTML(1, true)}</div>
          <div class={this.remainingNumbers[1] > 0 ? "key" : "key hidden"} onClick={() => this.numberClickedHandler("2")}>{this.cellHTML(2, true)}</div>
          <div class={this.remainingNumbers[2] > 0 ? "key" : "key hidden"} onClick={() => this.numberClickedHandler("3")}>{this.cellHTML(3, true)}</div>
          <div class={this.remainingNumbers[3] > 0 ? "key" : "key hidden"} onClick={() => this.numberClickedHandler("4")}>{this.cellHTML(4, true)}</div>
          <div class={this.remainingNumbers[4] > 0 ? "key" : "key hidden"} onClick={() => this.numberClickedHandler("5")}>{this.cellHTML(5, true)}</div>
          <div class={this.remainingNumbers[5] > 0 ? "key" : "key hidden"} onClick={() => this.numberClickedHandler("6")}>{this.cellHTML(6, true)}</div>
          <div class={this.remainingNumbers[6] > 0 ? "key" : "key hidden"} onClick={() => this.numberClickedHandler("7")}>{this.cellHTML(7, true)}</div>
          <div class={this.remainingNumbers[7] > 0 ? "key" : "key hidden"} onClick={() => this.numberClickedHandler("8")}>{this.cellHTML(8, true)}</div>
          <div class={this.remainingNumbers[8] > 0 ? "key" : "key hidden"} onClick={() => this.numberClickedHandler("9")}>{this.cellHTML(9, true)}</div>
          <div class="key" onClick={() => this.undoClickedHandler()}>
            <clr-icon shape="undo" class="is-solid"></clr-icon>
          </div>
        </div>
      </div>
    );
  }
}
