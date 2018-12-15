import { Component, Element, State } from '@stencil/core';
import { store } from 'state/appStore';

import { navigateToSudokuPageAction, navigateToCreateNewBordPageAction } from 'state/app-root/app-root.actions';
import { AppState } from 'state/app.state';
import { timerResumeAction } from 'state/sudoku/sudoku.actions.timer';

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
  stateChanged(state: AppState): any {
    this.gameOnGoing = state.sudokuPage.gameOnGoing;
  }

  navigateToSudokuPage() {
    store.dispatch(timerResumeAction());
    store.dispatch(navigateToSudokuPageAction());
  }
  navigateToCreateNewBoardPage() {
    store.dispatch(navigateToCreateNewBordPageAction());
  }

  render() {
    return (
      <acc-page>
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
      </acc-page>
    );
  }
}