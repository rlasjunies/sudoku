import { Component, Event, EventEmitter, Element, h } from '@stencil/core';

@Component({
  tag: 'acc-button',
  styleUrl: 'acc-button.css'
})
export class AccButton {
  @Element() element: HTMLAccButtonElement;
  @Event() click_: EventEmitter;


  onClickHandler(mouseEvent: MouseEvent) {
    const $button = mouseEvent.target as HTMLElement;
    const rect = $button.getBoundingClientRect();
    let $ripple = $button.querySelector('.ripple') as HTMLElement;
    if ( !$ripple) {
      $ripple = document.createElement('span');
      $ripple.className = 'ripple';
      $ripple.style.height = $ripple.style.width = Math.max(rect.width, rect.height) + 'px';
      $button.appendChild($ripple);
    }

    $ripple.classList.remove('show');
    var top = mouseEvent.pageY - rect.top - $ripple.offsetHeight / 2 - document.body.scrollTop;
    var left = mouseEvent.pageX - rect.left - $ripple.offsetWidth / 2 - document.body.scrollLeft;
    $ripple.style.top = top + 'px';
    $ripple.style.left = left + 'px';
    $ripple.classList.add('show');
    return false;
  }
  render() {
    return (
      [
        <div onClick={(event: MouseEvent) => this.onClickHandler(event)}><slot />
        <ion-ripple-effect></ion-ripple-effect>
        </div>
      ]
    );
  }
}