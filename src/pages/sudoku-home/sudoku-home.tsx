import { AppState } from '../../store/app.state';
import { store } from '../../store/appStore';

import * as navigateToCreateNewBoard from '../../store/app-root/app-root.actions.navigateToCreateNewBoard';
import * as navigateToSudoku_ResumeTimer from '../../store/_combinedActions/actions.navigateToSudoku_ResumeTimer';
import { isStandAlone, isWebWorker } from '../../services/pwa';
import { Component, Element, State, h } from '@stencil/core';

@Component({
  tag: 'sudoku-home',
  styleUrl: 'sudoku-home.css'
})
export class SudokuHomePage {

  @Element() element: HTMLSudokuPageElement;

  @State() gameOnGoing: boolean;

  @State() deployed = isStandAlone();
  @State() webWorker = isWebWorker();

  @State() version = "21"; //version to be updated
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
    store.dispatch(navigateToSudoku_ResumeTimer.action());
  }
  navigateToCreateNewBoardPage() {
    store.dispatch(navigateToCreateNewBoard.action());
  }

  title() {
    return (
      <div id="title">
        <div>Sudoku</div>
        <div>Master</div>
      </div>
    )
  }

  footer() {
    return (
      <div id="version">version: {this.version}
        {this.deployed ? " deployed" : " running in webbrowser"}
      </div>
    )
  }
  actions() {
    return (
      <div id="bottom">
        {this.gameOnGoing ?
          <ion-button
            expand="block"
            // size="large"
            // class="btn btn-icon btn-primary acc-btn-big"
            onClick={() => this.navigateToSudokuPage()}>
            <ion-icon name="play"></ion-icon>
            Continue
        </ion-button>
          : ''
        }

        <ion-button
          expand="block"
          // size="large"
          color={this.gameOnGoing ? "secondary" : "primary"}
          onClick={() => this.navigateToCreateNewBoardPage()}>
          <ion-icon slot="start" name="add"></ion-icon> 
          New game
      </ion-button>
        {this.footer()}
      </div>
    )
  }
  render() {
    return ([
      <div class="pagecontent">
        {this.title()}
        {this.actions()}
      </div>
    ]
    );
  }
}