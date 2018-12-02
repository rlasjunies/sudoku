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
          <acc-button onClick={() => this.onBackClickHandler()} >Back</acc-button>
          <div class="title">Sudoku</div>
        </div>
        <div class="buttons">
          <acc-button class="generate-board" onClick_={() => this.generateNewBoardOnClickHandler("easy")}>Facile</acc-button>
          <acc-button class="generate-board" onClick_={() => this.generateNewBoardOnClickHandler("medium")}>Moyen</acc-button>
          <acc-button class="generate-board" onClick_={() => this.generateNewBoardOnClickHandler("complex")}>Difficile</acc-button>
          <acc-button class="generate-board" onClick_={() => this.generateNewBoardOnClickHandler("very complex")}>Très difficile</acc-button>
        </div>
      </acc-page>
    );
  }
}