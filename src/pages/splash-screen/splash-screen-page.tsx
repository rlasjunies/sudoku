import { Component, Method, Element } from '@stencil/core';
import { store } from 'state/appStore';
import { generateBoardAction } from 'state/sudoku/sudoku.actions.generateBoard';
import { SudokuLevelType } from 'services/sudoku/sudoku';
import { navigateToSudokuPageAction } from 'state/app-root/app-root.actions';
// import { closeSplashScreenAction } from 'state/splash-screen/splash-screen.actions.close';

@Component({
  tag: 'splash-screen-page',
  styleUrl: 'splash-screen-page.css'
})
export class SplashScreenPage {

  @Element() element: HTMLElement;

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

  onClickHandler(difficulty: SudokuLevelType) {
    // console.log(`difficulty:${difficulty}`);
    store.dispatch(generateBoardAction(difficulty));
    store.dispatch(navigateToSudokuPageAction());
  }
  render() {
    return (
      <div id="page">
        <div id="banner">Sudoku</div>
        <div id="question">Génération d'un nouveau tableau</div>
        <div class="buttonList">
          <acc-button onClick={() => this.onClickHandler("easy")}>Facile</acc-button>
          <acc-button onClick={() => this.onClickHandler("medium")}>Moyen</acc-button>
          <acc-button onClick={() => this.onClickHandler("complex")}>Difficile</acc-button>
          <acc-button onClick={() => this.onClickHandler("very complex")}>Très difficile</acc-button>
        </div>
      </div>
    );
  }
}