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
  numberClickedHandler(evt, value: string) {
    this.numberClicked.emit(value);
    this.onClickRippleEffect(evt);
  }
  draftNumberClickedHandler(evt, value: string) {
    this.draftNumberClicked.emit(value);
    this.onClickRippleEffect(evt);
  }

  @Prop() hideClearKey: boolean = false;

  clearClickedHandler(evt) {
    this.clearClicked.emit("x");
    this.onClickRippleEffect(evt);
  }

  @Prop() hideUndoKey: boolean = false;
  undoClickedHandler(evt) {
    this.undoClicked.emit("x");
    this.onClickRippleEffect(evt);
  }

  onClickRippleEffect(mouseEvent: MouseEvent) {
    const $target = mouseEvent.target as HTMLElement;
    let $key;
  
    if (!$target.classList.contains("key")) {
      $key = $target.closest(".key"); 
    } else {
      $key = $target;
    }
  
    const rect = $key.getBoundingClientRect();
    let $ripple = $key.querySelector('.ripplex') as HTMLElement;
    if (!$ripple) {
      $ripple = document.createElement('span');
      $ripple.className = 'ripplex';
      $ripple.style.height = $ripple.style.width = Math.max(rect.width, rect.height) + 'px';
      $key.appendChild($ripple);
    }

    $ripple.classList.remove('show');
    var top = mouseEvent.pageY - rect.top - $ripple.offsetHeight / 2 - document.body.scrollTop;
    var left = mouseEvent.pageX - rect.left - $ripple.offsetWidth / 2 - document.body.scrollLeft;
    $ripple.style.top = top + 'px';
    $ripple.style.left = left + 'px';

    $ripple.classList.add('show');
    return false;
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
        <div class={this.remainingNumbers[0] > 0 ? "key" : "key hidden"} onClick={(evt) => this.numberClickedHandler(evt, "1")}>{this.cellHTML(1, false)}</div>
        <div class={this.remainingNumbers[1] > 0 ? "key" : "key hidden"} onClick={(evt) => this.numberClickedHandler(evt, "2")}>{this.cellHTML(2, false)}</div>
        <div class={this.remainingNumbers[2] > 0 ? "key" : "key hidden"} onClick={(evt) => this.numberClickedHandler(evt, "3")}>{this.cellHTML(3, false)}</div>
        <div class={this.remainingNumbers[3] > 0 ? "key" : "key hidden"} onClick={(evt) => this.numberClickedHandler(evt, "4")}>{this.cellHTML(4, false)}</div>
        <div class={this.remainingNumbers[4] > 0 ? "key" : "key hidden"} onClick={(evt) => this.numberClickedHandler(evt, "5")}>{this.cellHTML(5, false)}</div>
        <div class={this.remainingNumbers[5] > 0 ? "key" : "key hidden"} onClick={(evt) => this.numberClickedHandler(evt, "6")}>{this.cellHTML(6, false)}</div>
        <div class={this.remainingNumbers[6] > 0 ? "key" : "key hidden"} onClick={(evt) => this.numberClickedHandler(evt, "7")}>{this.cellHTML(7, false)}</div>
        <div class={this.remainingNumbers[7] > 0 ? "key" : "key hidden"} onClick={(evt) => this.numberClickedHandler(evt, "8")}>{this.cellHTML(8, false)}</div>
        <div class={this.remainingNumbers[8] > 0 ? "key" : "key hidden"} onClick={(evt) => this.numberClickedHandler(evt, "9")}>{this.cellHTML(9, false)}</div>
        <div class={this.hideClearKey ? "key hidden" : "key"} onClick={(evt) => this.clearClickedHandler(evt)}>
          <ion-icon name="trash"></ion-icon>
        </div>
      </div>,
      <div class="row">
        <div class={this.remainingNumbers[0] > 0 ? "key" : "key hidden"} onClick={(evt) => this.draftNumberClickedHandler(evt, "1")}>{this.cellHTML(1, true)}</div>
        <div class={this.remainingNumbers[1] > 0 ? "key" : "key hidden"} onClick={(evt) => this.draftNumberClickedHandler(evt, "2")}>{this.cellHTML(2, true)}</div>
        <div class={this.remainingNumbers[2] > 0 ? "key" : "key hidden"} onClick={(evt) => this.draftNumberClickedHandler(evt, "3")}>{this.cellHTML(3, true)}</div>
        <div class={this.remainingNumbers[3] > 0 ? "key" : "key hidden"} onClick={(evt) => this.draftNumberClickedHandler(evt, "4")}>{this.cellHTML(4, true)}</div>
        <div class={this.remainingNumbers[4] > 0 ? "key" : "key hidden"} onClick={(evt) => this.draftNumberClickedHandler(evt, "5")}>{this.cellHTML(5, true)}</div>
        <div class={this.remainingNumbers[5] > 0 ? "key" : "key hidden"} onClick={(evt) => this.draftNumberClickedHandler(evt, "6")}>{this.cellHTML(6, true)}</div>
        <div class={this.remainingNumbers[6] > 0 ? "key" : "key hidden"} onClick={(evt) => this.draftNumberClickedHandler(evt, "7")}>{this.cellHTML(7, true)}</div>
        <div class={this.remainingNumbers[7] > 0 ? "key" : "key hidden"} onClick={(evt) => this.draftNumberClickedHandler(evt, "8")}>{this.cellHTML(8, true)}</div>
        <div class={this.remainingNumbers[8] > 0 ? "key" : "key hidden"} onClick={(evt) => this.draftNumberClickedHandler(evt, "9")}>{this.cellHTML(9, true)}</div>
        <div class={this.hideUndoKey ? "key hidden" : "key"} onClick={(evt) => this.undoClickedHandler(evt)}>
          <ion-icon name="undo"></ion-icon>
        </div>
      </div>
      //* </div> */
    ]);
  }
}
