import { Component, Method, Element } from '@stencil/core';

@Component({
  tag: 'acc-page',
  styleUrl: 'acc-page.css'
})
export class AccPage {
  @Element() element: HTMLElement;

  @Method()
  hide() {
    // const page = this.element.querySelector("#page");
    this.element.classList.remove("show");
    this.element.classList.add("hide");
    // this.element.addEventListener("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", () => {
    //   console.log("xxxxxxxxxxxxx animationend");
    //   //   // page.classList.add("hide");
    // });
  }

  @Method()
  show() {
    // const page = this.element.querySelector("#page");
    this.element.classList.remove("hide");
    this.element.classList.add("show");
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