import { Component, Prop, Element, Watch } from '@stencil/core';


@Component({
  tag: 'acc-flipbox',
  styleUrl: 'acc-flipbox.css'
})
export class AccFlipbox {

  @Prop() flip: boolean = false;
  @Element() element: HTMLAppRootElement;

  @Watch("flip")
  flipWatcher(newValue: boolean) {
    const front: HTMLAccPageElement = this.element.querySelector('[slot="front"]');
    const back: HTMLAccPageElement = this.element.querySelector('[slot="back"]');
    if (!newValue) {
      front.classList.add("fadeout");
      front.classList.remove("fadein");
      back.classList.add("fadein");
      back.classList.remove("fadeout");
    } else {
      front.classList.add("fadein");
      front.classList.remove("fadeout");
      back.classList.add("fadeout");
      back.classList.remove("fadein");
    }
  }

  componentWillLoad() {
    this.flipWatcher(this.flip);
  }
  render() {
    return (
      [
        <slot name="front" />,
        <slot name="back" />
      ]
    );
  }
}