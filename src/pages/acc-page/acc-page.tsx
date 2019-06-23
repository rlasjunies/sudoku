import { Component, Method, Element, h } from '@stencil/core';

@Component({
  tag: 'acc-page',
  styleUrl: 'acc-page.css'
})
export class AccPage {
  @Element() element: HTMLElement;

  @Method()
  async hide() {
    // const page = this.element.querySelector("#page");
    await this.element.classList.remove("show");
    await this.element.classList.add("hide");
    // this.element.addEventListener("webkitTransitionEnd o-Transition-end oTransitionEnd msTransitionEnd transition end", () => {
    //   console.log("xxxxxxxxxxxxx animation end");
    //   //   // page.classList.add("hide");
    // });
  }

  @Method()
  async show() {
    // const page = this.element.querySelector("#page");
    await this.element.classList.remove("hide");
    await this.element.classList.add("show");
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