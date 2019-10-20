import { Component, Prop, Method, Element, h } from '@stencil/core';
import { router } from "../../services/router";
import { store } from "../../store/appStore";
import { AppState } from 'store/app.state';

@Component({
  tag: 'acc-page',
  styleUrl: 'acc-page.css'
})
export class AccPage {
  @Element() element: HTMLElement;

  @Prop() name: string;
  previousUrl: string = "";
  unsubscribeStateChanged: () => void;

  @Method()
  async hide() {
    await this.element.classList.remove("show");
    await this.element.classList.add("hide");
  }

  @Method()
  async show() {
    await this.element.classList.remove("hide");
    await this.element.classList.add("show");
  }

  componentDidLoad() {
    router.addRoute(this.name);
    this.unsubscribeStateChanged = store.subscribeReaction(this.stateChanged, this);
  }
  componentDidUnload() {
    this.unsubscribeStateChanged();
  }

  stateChanged(state: AppState): any {
    const newUrl= state.appRoot.url;
  
    if (newUrl !== this.previousUrl){
      this.previousUrl = newUrl;
      if (newUrl === this.name) {
        this.show();
      } else {
        this.hide();
      };
    }
  }

  render() {
    return (
      <slot />
    );
  }
}

/**
 * first tentative with close / open without success
 */
// @Method()
//   close() {
//     // console.log("JE SUIS BIEN DANS la functionclose");

//     // function whichAnimationEvent() {
//     //   var t,
//     //     el = document.createElement("fakeelement");

//     //   var transitions = {
//     //     "animation": "animationend",
//     //     "OAnimation": "oAnimationEnd",
//     //     "MozAnimation": "animationend",
//     //     "WebkitAnimation": "webkitAnimationEnd"
//     //   }

//     //   for (t in transitions) {
//     //     if (el.style[t] !== undefined) {
//     //       return transitions[t];
//     //     }
//     //   }
//     // }
//     // const animationEvent = whichAnimationEvent();
//     // console.log("Which animation event:", animationEvent);

//     function whichTransitionEvent(){
//       var t,
//       el = document.createElement("fakeelement");

//       var transitions = {
//         "transition"      : "transitionend",
//         "OTransition"     : "oTransitionEnd",
//         "MozTransition"   : "transitionend",
//         "WebkitTransition": "webkitTransitionEnd"
//       }

//       for (t in transitions){
//         if (el.style[t] !== undefined){
//           return transitions[t];
//         }
//       }
//     }
//     const transitionEvent = whichTransitionEvent();
//     console.log("Which transition event:", transitionEvent);

//     // this.element.classList.remove("open");
//     this.element.classList.add("close");
//     this.element.addEventListener(transitionEvent, triggerAfterTransition)
//     function triggerAfterTransition(event) {
//       console.log("xxxxxxxxxxxxx animationend", event);
//     }
//   }
