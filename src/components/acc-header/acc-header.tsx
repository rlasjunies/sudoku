import { Component, Event, EventEmitter, Element, h, Prop } from '@stencil/core';

@Component({
  tag: 'acc-header',
  styleUrl: 'acc-header.css'
})
export class AccButton {
  @Element() element: HTMLAccButtonElement;
  @Event() backClick: EventEmitter;
  @Prop() backbutton: boolean = false;
  onClickBackButtonHandler(mouseEvent: MouseEvent) {
    this.backClick.emit(mouseEvent);
  }

  backButtontag() {
    return <div></div>
  }

  render() {
    if (this.backbutton) {
      return (
        [<acc-button id="back"
          onClick={(event: MouseEvent) => this.onClickBackButtonHandler(event)}>
            <acc-icon iconUnicodeCode="f053"></acc-icon>
        </acc-button>,
        <div id="slot"><slot /></div>])
    } else {
      return (< slot />)
    }
    // <div id="header">
    // {this.backbutton ?
    //   <acc-button id="back"
    //     styleinfo
    //     onClick={(event: MouseEvent) => this.onClickBackButtonHandler(event)}
    //   >
    //   </acc-button> : ""},
    // <slot />
    // </div>
    // ); 
  }
}