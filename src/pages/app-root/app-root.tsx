import { Component, h, Element, Prop, Watch } from '@stencil/core';
import { AppState } from '../../store/app.state';
import { store } from '../../store/appStore';
// @ts-ignore
import * as storeLogger from "../../store/middleware/logger";
// @ts-ignore
import * as storeTimer from "../../store/middleware/timerService";

import * as endGame_StopTimer from "../../store/_combinedActions/actions.endGame_StopTimer";

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class App {
  routerElement: HTMLIonRouterElement;
  navElement: HTMLIonNavElement;
  @Prop() route: string;
  @Prop() boardSolved: boolean;

  @Watch('route')
  routeWatcher(newValue: string, oldValue: string) {
    // console.log(`app-root2 new route - newvalue:${newValue} - oldValue:${oldValue}`);
    if (newValue !== oldValue) {
      if (this.navElement) {
        // console.log(`show route:${newValue}`);
        this.navElement.setRoot(newValue, null, {
          animated: false
        })
      } 
      else {
        console.log('navElement not yet loaded');
      }
    }
  }

  @Watch('boardSolved')
  boardSolvedWatcher(newValue: boolean, oldValue: boolean) {
    // console.log(`board solved watcher:newvalue${newValue}-oldValue:${oldValue}`);
    if (newValue && !oldValue){
      store.dispatch(endGame_StopTimer.action());      
    }
  }

  @Element() element: HTMLAppRootElement;

  unsubscribeStateChanged: () => void;
  componentDidUnload() {
    this.unsubscribeStateChanged();
  }

  componentWillLoad() {
    // console.log('app-root2 Component will load');
    if (!this.navElement) {
      // console.log('app-root2 subscrubsption');
      this.navElement = this.element.querySelector('ion-nav');
      this.unsubscribeStateChanged = store.subscribeReaction(this.stateChanged, this);
    } else {
      // console.log('app-root2 déjà fait ');
    }
  }

  stateChanged(state: AppState): any {
    this.route = state.appRoot.url;
    this.boardSolved = state.sudokuPage.boardSolved;
  }

  render() {
    return (<div id="app-root"></div>)
  }
}