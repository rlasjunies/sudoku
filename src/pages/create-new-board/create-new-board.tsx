import { Component } from '@stencil/core';
import { generateBoardAction } from 'state/sudoku/sudoku.actions.generateBoard';
import { SudokuLevelType } from 'services/sudoku/sudoku';
import { store } from 'state/appStore';
import { navigateToSudokuPageAction, navigateToSplashScreenPageAction } from 'state/app-root/app-root.actions';

@Component({
  tag: 'create-new-board',
  styleUrl: 'create-new-board.css'
})
export class CreateNewBoard {

  generateNewBoardOnClickHandler(difficulty: SudokuLevelType) {
    // console.log(`difficulty:${difficulty}`);
    store.dispatch(generateBoardAction(difficulty));
    store.dispatch(navigateToSudokuPageAction());
  }
  onBackClickHandler() {
    store.dispatch(navigateToSplashScreenPageAction());
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
          <div class="title">Quel challenge serez-vous relever?</div>
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