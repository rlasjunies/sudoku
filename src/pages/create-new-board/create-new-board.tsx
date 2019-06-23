import { Component, h } from '@stencil/core';
import { SudokuLevelType } from '../../services/sudoku/sudoku';
import { store } from '../../store/appStore';

import * as navigateToSplashScreen from "../../store/app-root/app-root.actions.navigateToSplashScreen";
import * as generateBoardAndNavigateToSudokuPage from "../../store/_combinedActions/actions.generateBoard_NavigateToSudokuPage_StartTimer";
@Component({
  tag: 'create-new-board',
  styleUrl: 'create-new-board.css'
})
export class CreateNewBoard {

  generateNewBoardOnClickHandler(difficulty: SudokuLevelType) {
    // console.log(`difficulty:${difficulty}`);
    store.dispatch( generateBoardAndNavigateToSudokuPage.action(difficulty));
  }
  onBackClickHandler() {
    store.dispatch(navigateToSplashScreen.action());
  }
  render() {
    return (
      <acc-page>
        <div class="header">
          <button class="btn btn-link"
            onClick={() => this.onBackClickHandler()}>
            <clr-icon shape="angle caret left" ></clr-icon>
            Back
          </button>
        </div>
        <div id="content">
          <div class="title">Quel challenge seriez-vous relever?</div>
          <div class="buttons">
            <button class="btn acc-btn-big" onClick={() => this.generateNewBoardOnClickHandler("easy")}>Facile</button>
            <button class="btn acc-btn-big" onClick={() => this.generateNewBoardOnClickHandler("medium")}>Moyen</button>
            <button class="btn acc-btn-big" onClick={() => this.generateNewBoardOnClickHandler("complex")}>Difficile</button>
            <button class="btn acc-btn-big" onClick={() => this.generateNewBoardOnClickHandler("very complex")}>Très difficile</button>
          </div>
        </div>
      </acc-page>
    );
  }
}