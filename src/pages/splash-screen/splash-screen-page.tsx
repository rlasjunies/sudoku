import { Component, Element, State } from '@stencil/core';
import { store } from 'state/appStore';

import { navigateToSudokuPageAction, navigateToCreateNewBordPageAction } from 'state/app-root/app-root.actions';
import { AppState } from 'state/app.state';
import { timerResumeAction } from 'state/sudoku/sudoku.actions.timer';

@Component({
  tag: 'splash-screen-page',
  styleUrl: 'splash-screen-page.css',
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
          <div id="title">Sudoku</div>
          {this.gameOnGoing ?
            <button
              class="btn btn-icon btn-primary acc-btn-big"
              onClick={() => this.navigateToSudokuPage()}>
              <clr-icon shape="play"></clr-icon>
              Continue
            </button>
            : ''
          }
          <button
            // button is primary when no game on-going
            class={this.gameOnGoing ? "btn btn-icon acc-btn-big" : "btn btn-icon btn-primary acc-btn-big "}
            onClick={() => this.navigateToCreateNewBoardPage()}>
            <clr-icon shape="new"></clr-icon>
            New
          </button>
      </acc-page>
    );
  }
}