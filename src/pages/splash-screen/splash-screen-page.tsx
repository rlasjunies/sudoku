import { Component, Method, Element, State } from '@stencil/core';
import { store } from 'state/appStore';

import { navigateToSudokuPageAction, navigateToCreateNewBordPageAction } from 'state/app-root/app-root.actions';
import { AppState } from 'state/app.state';
// import { closeSplashScreenAction } from 'state/splash-screen/splash-screen.actions.close';

@Component({
  tag: 'splash-screen-page',
  styleUrl: 'splash-screen-page.css'
})
export class SplashScreenPage {

  @Element() element: HTMLElement;

  @State() gameOnGoing: boolean;

  unsubscribeStateChanged: () => void;

  componentDidUnload() {
    this.unsubscribeStateChanged();
  }

  componentDidLoad() {
    this.unsubscribeStateChanged = store.subscribeReaction(this.stateChanged, this);
  }
  stateChanged(state: AppState, thisContext: SplashScreenPage): any {
    thisContext.gameOnGoing = state.sudokuPage.gameOnGoing;
  }

  @Method()
  hide() {
    this.element.classList.remove("show");
    this.element.classList.add("hide");
  }
  @Method()
  show() {
    this.element.classList.remove("hide");
    this.element.classList.add("show");
  }
  navigateToSudokuPage() {
    store.dispatch(navigateToSudokuPageAction());
  }
  navigateToCreateNewBoardPage() {
    store.dispatch(navigateToCreateNewBordPageAction());
  }

  render() {
    return (
      <div id="page">
        <div id="banner">
          <div id="title">Sudoku</div>
        </div>

        <div class="whatnext">
          {this.gameOnGoing ?
            <acc-button id="gotogame" class="whatnext-question-button" onClick_={() => this.navigateToSudokuPage()}>Continue</acc-button>
            : ''
          }
            <acc-button id="createnewboard" class="whatnext-question-button" onClick_={() => this.navigateToCreateNewBoardPage()}>New</acc-button>
        </div>
      </div>
    );
  }
}