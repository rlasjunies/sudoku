import { Component, h } from '@stencil/core';
import { SudokuLevelType } from '../../services/sudoku/sudoku';
import { store } from '../../store/appStore';

import * as navigateTo from "../../store/app-root/app-root.actions.navigateTo";
import * as generateBoardAndNavigateToSudokuPage from "../../store/_combinedActions/actions.generateBoard_NavigateToSudokuPage_StartTimer";
@Component({
  tag: 'sudoku-new',
  styleUrl: 'sudoku-new.css'
})
export class SudokuNewPage {

  generateNewBoardOnClickHandler(difficulty: SudokuLevelType) {
    // console.log(`difficulty:${difficulty}`);
    store.dispatch(generateBoardAndNavigateToSudokuPage.action(difficulty));
  }
  onBackClickHandler() {
    store.dispatch(navigateTo.action(navigateTo.pages.home));
  }


  render() {
    return (
      [
        <acc-page name="sudoku-new">
          <acc-header backbutton
            onBackClick={() => this.onBackClickHandler()}>
            Start new game
          </acc-header>
          <div class="content">
            <div class="text">Which challenge will you succeed?</div>
            <div class="buttons">
              <acc-button styleinfo
                onClick={() => this.generateNewBoardOnClickHandler("easy")}>Easy
              </acc-button>
              <acc-button styleinfo
                onClick={() => this.generateNewBoardOnClickHandler("medium")}>Normal
              </acc-button>
              <acc-button styleinfo
                onClick={() => this.generateNewBoardOnClickHandler("complex")}>Difficult
              </acc-button>
              <acc-button styleinfo
                onClick={() => this.generateNewBoardOnClickHandler("very complex")}>Really Difficult
              </acc-button>
            </div>
          </div>
        </acc-page>
      ]
    );
  }
}