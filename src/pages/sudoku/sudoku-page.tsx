import { Component, State } from '@stencil/core';
import { store } from 'state/appStore';
import { AppState } from 'state/app.state';
import { cellSelectedAction } from "../../state/sudoku/sudoku.actions.cellSelected";
import { switchDraftModeAction } from "../../state/sudoku/sudoku.actions.switchDraftMode";
import { numberTypedAction, clearTypedAction } from "../../state/sudoku/sudoku.actions.valueTyped";
import { navigateToSplashScreenPageAction } from 'state/app-root/app-root.actions';
import { SudokuBoard, initializeSudokuBoard } from 'services/sudoku/sudoku';

@Component({
  tag: 'sudoku-page',
  styleUrl: 'sudoku-page.css'
})
export class SudokuPage {
  // @Element() element: HTMLSudokuPageElement;
  @State() board: SudokuBoard = initializeSudokuBoard();
  // @State() candidatesBoard: boolean[][];
  @State() incorrectCells: number[];
  @State() cellSelected: number = -1;
  @State() draftMode: boolean;
  @State() colSolved: number;
  @State() rowSolved: number;
  @State() zoneSolved: number;
  @State() boardSolved: boolean;

  unsubscribeStateChanged: () => void;

  componentDidUnload() {
    this.unsubscribeStateChanged();
  }

  componentDidLoad() {
    this.unsubscribeStateChanged = store.subscribeReaction(this.stateChanged, this);
  }
  stateChanged(state: AppState, thisContext: SudokuPage): any {
    thisContext.board = state.sudokuPage.board;
    // thisContext.candidatesBoard = state.sudokuPage.candidatesBoard;
    thisContext.incorrectCells = state.sudokuPage.board.incorrectCells;
    thisContext.cellSelected = state.sudokuPage.cellSelected;
    thisContext.draftMode = state.sudokuPage.draftMode;

    thisContext.colSolved = state.sudokuPage.colSolved
    thisContext.rowSolved = state.sudokuPage.rowSolved
    thisContext.zoneSolved = state.sudokuPage.zoneSolved
    thisContext.boardSolved = state.sudokuPage.boardSolved
  }

  dispatchCellSelection({ detail: cell }) {
    store.dispatch(cellSelectedAction(cell))
  }

  dispatchNumberTyped({ detail: keyTyped }) {
    store.dispatch(numberTypedAction(keyTyped));
  }
  dispatchClearTyped() {
    store.dispatch(clearTypedAction());
  }

  dispatchSwitchDraftMode({ detail: draftMode }): void {
    // console.log(`dispartchSwitchDraftMode:`,draftMode);
    store.dispatch(switchDraftModeAction(draftMode));
  }

  onBackClickHandler() {
    store.dispatch(navigateToSplashScreenPageAction());
  }
  render() {
    return (
      <acc-page>
        <header>
          <acc-button onClick={() => this.onBackClickHandler()} >Back</acc-button>
          <div class="title">Sudoku</div>
          <acc-switch onSwitch={(draftMode) => this.dispatchSwitchDraftMode(draftMode)}>Draft mode</acc-switch>
        </header>
        <div class="main">
          <sudoku-board-component
            id="sudokuboard"
            board={this.board}
            // candidatesBoard={this.candidatesBoard}
            cellSelected={this.cellSelected}
            incorrectCells={this.incorrectCells}
            solvedRow={this.rowSolved}
            solvedCol={this.colSolved}
            solvedZone={this.zoneSolved}
            boardSolved={this.boardSolved}

            onCellSelection={(cellNumberCustomEvent) => this.dispatchCellSelection(cellNumberCustomEvent)}>
          </sudoku-board-component>
          <key-board2
            draftMode={this.draftMode}
            onClearClicked={_ => this.dispatchClearTyped()}
            onNumberClicked={(keyCustomeEvent) => this.dispatchNumberTyped(keyCustomeEvent)}
            remainingNumbers={this.board.remainingNumbers}>
          </key-board2>
        </div>
      </acc-page>
    );
  }
}