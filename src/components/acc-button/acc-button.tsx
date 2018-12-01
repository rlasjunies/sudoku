import { Component, Event, EventEmitter, Element } from '@stencil/core';

@Component({
  tag: 'acc-button',
  styleUrl: 'acc-button.css'
})
export class AccButton {
  @Element() element: HTMLAccButtonElement;
  @Event() click_: EventEmitter;

  onClickHandler(mouseEvent: MouseEvent) {
    mouseEvent.preventDefault();

    const $button = this.element.querySelector("button");

    const rippleWidth = $button.clientWidth;
    const rippleHeight = $button.clientHeight;
    const rippleXPos = mouseEvent.pageX - $button.offsetLeft - rippleWidth / 2;
    const rippleYPos = mouseEvent.pageY - $button.offsetTop - rippleHeight / 2;

    const $ripple = document.createElement("div");
    $ripple.classList.add("ripple-effect");
    $ripple.style.cssText = `
      top:${rippleYPos}px;
      left:${rippleXPos}px;
      height:${rippleHeight}px;
      width:${rippleWidth}px;
      background:'#89669b';
    `;
  
    $button.appendChild($ripple);
    setTimeout( () => {
      $ripple.remove();
    }, 1500);

    // 
    setTimeout(() => this.click_.emit(), 250 );
  }
  render() {
    return (
      [
      <button class="button" onClick={(event: MouseEvent) => this.onClickHandler(event)}><slot /></button>
      ]
    );
  }
}