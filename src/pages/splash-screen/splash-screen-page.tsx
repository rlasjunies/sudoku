import { Component, Method, Element, State } from '@stencil/core';
import { store } from 'state/appStore';
import { generateBoardAction } from 'state/sudoku/sudoku.actions.generateBoard';
import { SudokuLevelType } from 'services/sudoku/sudoku';
import { navigateToSudokuPageAction } from 'state/app-root/app-root.actions';
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

  generateNewBoardOnClickHandler(difficulty: SudokuLevelType) {
    // console.log(`difficulty:${difficulty}`);
    store.dispatch(generateBoardAction(difficulty));
    store.dispatch(navigateToSudokuPageAction());
  }

  navigateToSudokuPage(){
    store.dispatch(navigateToSudokuPageAction());
  }
  navigateToSudokuPageAction

  render() {
    return (
      <div id="page">
        <div id="banner">
          <div id="title">Sudoku</div>
          <acc-button id="gotogame" class={ this.gameOnGoing ? "gameOnGoingshow" : "gameOnGoinghide"} onClick={() => this.navigateToSudokuPage()}>></acc-button>
        </div>
        <div id="question">Génération d'un nouveau tableau</div>
        <div class="buttonList">
          <acc-button onClick={() => this.generateNewBoardOnClickHandler("easy")}>Facile</acc-button>
          <acc-button onClick={() => this.generateNewBoardOnClickHandler("medium")}>Moyen</acc-button>
          <acc-button onClick={() => this.generateNewBoardOnClickHandler("complex")}>Difficile</acc-button>
          <acc-button onClick={() => this.generateNewBoardOnClickHandler("very complex")}>Très difficile</acc-button>
        </div>
      </div>
    );
  }
}