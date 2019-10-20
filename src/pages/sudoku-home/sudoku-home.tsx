import { AppState } from '../../store/app.state';
import { store } from '../../store/appStore';

import * as navigateToSudoku_ResumeTimer from '../../store/_combinedActions/actions.navigateToSudoku_ResumeTimer';
import { isStandAlone, isWebWorker } from '../../services/pwa';
import * as navigateTo from "../../store/app-root/app-root.actions.navigateTo";
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

  @State() version = "22"; //version to be updated
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
    store.dispatch(navigateTo.action(navigateTo.pages.newGame));
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
      // <acc-page name="home">
        // <ion-header>
        //   <ion-toolbar>
        //     <ion-title></ion-title>
        //     <ion-buttons slot="start">
        //       <ion-menu-button />
        //     </ion-buttons>
        //   </ion-toolbar>
        // </ion-header>,
      <div class="pagecontent">
          {this.title()}
          {this.actions()}
        </div>
      // </acc-page>
    ]
    );
  }
}