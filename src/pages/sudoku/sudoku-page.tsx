import { Component, State, Element } from '@stencil/core';
import { store } from 'state/appStore';
import { AppState } from 'state/app.state';
import { cellSelectedAction } from "../../state/sudoku/sudoku.actions.cellSelected";
import { switchDraftModeAction } from "../../state/sudoku/sudoku.actions.switchDraftMode";
import { valueTypedAction } from "../../state/sudoku/sudoku.actions.valueTyped";
import { navigateToSplashScreenPageAction } from 'state/app-root/app-root.actions';

@Component({
  tag: 'sudoku-page',
  styleUrl: 'sudoku-page.css'
})
export class SudokuPage {
  @Element() element: HTMLSudokuPageElement;
  @State() board: number[];
  @State() candidatesBoard: boolean[][];
  @State() incorrectCells: number[];
  @State() cellSelected: number;
  @State() colSolved: number;
  @State() rowSolved: number;
  @State() zoneSolved: number;
  @State() boardSolved: boolean;

  unsubscribeStateChanged: () => void;

  componentDidUnload() {
    this.unsubscribeStateChanged();
  }

  componentDidLoad() {
    // this.sudokuBoardElt = this.element.shadowRoot.querySelector("sudoku-board");
    this.unsubscribeStateChanged = store.subscribeReaction(this.stateChanged, this);
  }
  stateChanged(state: AppState, thisContext: SudokuPage): any {
    thisContext.board = state.sudokuPage.board;
    thisContext.candidatesBoard = state.sudokuPage.candidatesBoard;
    thisContext.incorrectCells = state.sudokuPage.incorrectCells;
    thisContext.cellSelected = state.sudokuPage.cellSelected;
    // thisContext.draftMode = state.sudokuPage.draftMode;

    thisContext.colSolved = state.sudokuPage.colSolved
    thisContext.rowSolved = state.sudokuPage.rowSolved
    thisContext.zoneSolved = state.sudokuPage.zoneSolved
    thisContext.boardSolved = state.sudokuPage.boardSolved
    // thisContext.showSplashScreenPage = state.splashScreenPage.showPage
    // thisContext.showSudokuPage = state.sudokuPage.showPage
  }

  dispatchCellSelection({ detail: cell }) {
    store.dispatch(cellSelectedAction(cell))
  }

  dispatchKeyBoardValueTyped({ detail: keyTyped }) {
    store.dispatch(valueTypedAction(keyTyped));
  }

  dispartchSwitchDraftMode({ detail: draftMode }): void {
    // console.log(`dispartchSwitchDraftMode:`,draftMode);
    store.dispatch(switchDraftModeAction(draftMode));
  }

  onBackClickHandler(){
    store.dispatch(navigateToSplashScreenPageAction());
  }
  render() {
    return (
      <acc-page>
        <header>
          <acc-button onClick={()=> this.onBackClickHandler()} >Back</acc-button>
          <h1>Sudoku maison</h1>
          <acc-switch onSwitch={(draftMode) => this.dispartchSwitchDraftMode(draftMode)}>Draft mode</acc-switch>
        </header>,
        <div class="main">
          <sudoku-board
            id="sudokuboard"
            board={this.board}
            candidatesBoard={this.candidatesBoard}
            cellSelected={this.cellSelected}
            incorrectCells={this.incorrectCells}
            solvedRow={this.rowSolved}
            solvedCol={this.colSolved}
            solvedZone={this.zoneSolved}
            boardSolved={this.boardSolved}

            onCellSelection={(cellNumberCustomEvent) => this.dispatchCellSelection(cellNumberCustomEvent)}></sudoku-board>
          <key-board2 onKeyClicked={(keyCustomeEvent) => this.dispatchKeyBoardValueTyped(keyCustomeEvent)}></key-board2>
        </div>
      </acc-page>
    );
  }
}