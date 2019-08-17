import { Component, EventEmitter, Event, Prop, h } from '@stencil/core';

@Component({
  tag: 'key-board',
  styleUrl: 'key-board.css'
  // shadow: true
})
export class KeyBoard3 {
  @Event() numberClicked: EventEmitter;
  @Event() draftNumberClicked: EventEmitter;
  @Event() clearClicked: EventEmitter;
  @Event() undoClicked: EventEmitter;

  // @Prop() draftMode: boolean;
  @Prop() remainingNumbers: number[];
  numberClickedHandler(value: string) {
    this.numberClicked.emit(value);
  }
  draftNumberClickedHandler(value: string) {
    this.draftNumberClicked.emit(value);
  }

  @Prop() hideClearKey:boolean = false;

  clearClickedHandler() {
    this.clearClicked.emit("x");
  }

  @Prop() hideUndoKey:boolean = false;

  undoClickedHandler() {
    this.undoClicked.emit("x");
  }

  cellHTML(digit: number, draft: boolean) {
    if (draft) {
      return (
        <div class="draftkey">
          <div class="draftkeyrow">
            <div class="draftkeyvalue">{digit === 1 ? '1' : ''}</div>
            <div class="draftkeyvalue">{digit === 2 ? '2' : ''}</div>
            <div class="draftkeyvalue">{digit === 3 ? '3' : ''}</div>
          </div>
          <div class="draftkeyrow">
            <div class="draftkeyvalue">{digit === 4 ? '4' : ''}</div>
            <div class="draftkeyvalue">{digit === 5 ? '5' : ''}</div>
            <div class="draftkeyvalue">{digit === 6 ? '6' : ''}</div>
          </div>
          <div class="draftkeyrow">
            <div class="draftkeyvalue">{digit === 7 ? '7' : ''}</div>
            <div class="draftkeyvalue">{digit === 8 ? '8' : ''}</div>
            <div class="draftkeyvalue">{digit === 9 ? '9' : ''}</div>
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
    return ([
      // <div class="key-board">
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
          <div class={this.hideClearKey ? "key hidden" : "key" } onClick={() => this.clearClickedHandler()}>
            <ion-icon name="trash"></ion-icon>
          </div>
        </div>,
        <div class="row">
          <div class={this.remainingNumbers[0] > 0 ? "key" : "key hidden"} onClick={() => this.draftNumberClickedHandler("1")}>{this.cellHTML(1, true)}</div>
          <div class={this.remainingNumbers[1] > 0 ? "key" : "key hidden"} onClick={() => this.draftNumberClickedHandler("2")}>{this.cellHTML(2, true)}</div>
          <div class={this.remainingNumbers[2] > 0 ? "key" : "key hidden"} onClick={() => this.draftNumberClickedHandler("3")}>{this.cellHTML(3, true)}</div>
          <div class={this.remainingNumbers[3] > 0 ? "key" : "key hidden"} onClick={() => this.draftNumberClickedHandler("4")}>{this.cellHTML(4, true)}</div>
          <div class={this.remainingNumbers[4] > 0 ? "key" : "key hidden"} onClick={() => this.draftNumberClickedHandler("5")}>{this.cellHTML(5, true)}</div>
          <div class={this.remainingNumbers[5] > 0 ? "key" : "key hidden"} onClick={() => this.draftNumberClickedHandler("6")}>{this.cellHTML(6, true)}</div>
          <div class={this.remainingNumbers[6] > 0 ? "key" : "key hidden"} onClick={() => this.draftNumberClickedHandler("7")}>{this.cellHTML(7, true)}</div>
          <div class={this.remainingNumbers[7] > 0 ? "key" : "key hidden"} onClick={() => this.draftNumberClickedHandler("8")}>{this.cellHTML(8, true)}</div>
          <div class={this.remainingNumbers[8] > 0 ? "key" : "key hidden"} onClick={() => this.draftNumberClickedHandler("9")}>{this.cellHTML(9, true)}</div>
          <div class={this.hideUndoKey ? "key hidden" : "key"} onClick={() => this.undoClickedHandler()}>
            <ion-icon name="undo"></ion-icon>
          </div>
        </div>
      //* </div> */
    ]);
  }
}
