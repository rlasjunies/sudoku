import { Component, Event, EventEmitter, Element, h, Prop } from '@stencil/core';

@Component({
  tag: 'acc-button',
  styleUrl: 'acc-button.css'
})
export class AccButton {
  @Element() element: HTMLAccButtonElement;
  @Event() click_: EventEmitter;
  @Prop() styleinfo:boolean=false;
  @Prop() stylesuccess:boolean=false;
  @Prop() stylewarning:boolean=false;
  @Prop() styledanger:boolean=false;
  @Prop() styledefault:boolean=false;

  // onClickHandler(mouseEvent: MouseEvent) {
    // const $button = mouseEvent.target as HTMLElement;
    // const rect = $button.getBoundingClientRect();
    // let $ripple = $button.querySelector('.ripple') as HTMLElement;
    // if (!$ripple) {
    //   $ripple = document.createElement('span');
    //   $ripple.className = 'ripple';
    //   $ripple.style.height = $ripple.style.width = Math.max(rect.width, rect.height) + 'px';
    //   $button.appendChild($ripple);
    // }

    // $ripple.classList.remove('show');
    // var top = mouseEvent.pageY - rect.top - $ripple.offsetHeight / 2 - document.body.scrollTop;
    // var left = mouseEvent.pageX - rect.left - $ripple.offsetWidth / 2 - document.body.scrollLeft;
    // $ripple.style.top = top + 'px';
    // $ripple.style.left = left + 'px';
    // $ripple.classList.add('show');
    // return false;
  // }

  classHandler(){
    const styleinfo = this.styleinfo ? "info " : "";
    const stylesuccess = this.stylesuccess ? "success " : "";
    const res = styleinfo + stylesuccess;
    return res;
  }
  render() {
    return (
      [
        <button 
          class={this.classHandler()}
          >
          <div id="slot"><slot /></div>
        </button>
      ]
    );
  }
}