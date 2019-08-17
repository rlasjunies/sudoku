import { Component, h } from '@stencil/core';
import { SudokuLevelType } from '../../services/sudoku/sudoku';
import { store } from '../../store/appStore';

import * as navigateToHome from "../../store/app-root/app-root.actions.navigateToSplashScreen";
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
    store.dispatch(navigateToHome.action());
  }


  render() {
    return (
      [
        <ion-header translucent>
          <ion-toolbar>
            <ion-buttons slot="start">
              {/* <ion-back-button></ion-back-button> */}
              <ion-button onClick={() => this.onBackClickHandler()}>
                <ion-icon name="arrow-back"></ion-icon>
              </ion-button>
            </ion-buttons>
            <ion-title>Start new game</ion-title>
          </ion-toolbar>
        </ion-header>,
        <div class="content">
          <div class="text">Which challenge will you succeed?</div>
          <div class="buttons">
            <ion-button expand="block" size="large" onClick={() => this.generateNewBoardOnClickHandler("easy")}>Easy</ion-button>
            <ion-button expand="block" size="large" onClick={() => this.generateNewBoardOnClickHandler("medium")}>Normal</ion-button>
            <ion-button expand="block" size="large" onClick={() => this.generateNewBoardOnClickHandler("complex")}>Difficult</ion-button>
            <ion-button expand="block" size="large" onClick={() => this.generateNewBoardOnClickHandler("very complex")}>Really Difficult</ion-button>
          </div>
        </div>
      ]
    );
  }
}