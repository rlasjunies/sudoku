import { Component, State } from '@stencil/core';
import { store } from 'state/appStore';
import { AppState } from 'state/app.state';
import { cellSelectedAction } from "../../state/sudoku/sudoku.actions.cellSelected";
import { switchDraftModeAction } from "../../state/sudoku/sudoku.actions.switchDraftMode";
import { numberTypedAction, clearTypedAction } from "../../state/sudoku/sudoku.actions.valueTyped";
import { navigateToSplashScreenPageAction } from 'state/app-root/app-root.actions';
import { SudokuBoard, initializeSudokuBoard } from 'services/sudoku/sudoku';
import { undoAction } from 'state/sudoku/sudoku.actions.undo';
import { timerResumeAction, timerPauseAction } from 'state/sudoku/sudoku.actions.timer';

@Component({
  tag: 'sudoku-page',
  styleUrl: 'sudoku-page.css'
})
export class SudokuPage {
  @State() board: SudokuBoard = initializeSudokuBoard();
  @State() incorrectCells: number[];
  @State() cellSelected: number = -1;
  @State() draftMode: boolean;
  @State() colSolved: number;
  @State() rowSolved: number;
  @State() blockSolved: number;
  @State() boardSolved: boolean;
  @State() timer: number = 0;
  @State() timerOn: boolean;

  unsubscribeStateChanged: () => void;

  componentDidUnload() {
    this.unsubscribeStateChanged();
  }

  componentDidLoad() {
    this.unsubscribeStateChanged = store.subscribeReaction(this.stateChanged, this);
  }
  stateChanged(state: AppState): any {
    this.board = state.sudokuPage.board;
    this.incorrectCells = state.sudokuPage.board.incorrectCells;
    this.cellSelected = state.sudokuPage.cellSelected;
    this.draftMode = state.sudokuPage.draftMode;

    this.colSolved = state.sudokuPage.colSolved
    this.rowSolved = state.sudokuPage.rowSolved
    this.blockSolved = state.sudokuPage.blockSolved
    this.boardSolved = state.sudokuPage.boardSolved

    this.timer = state.sudokuPage.timer;
    this.timerOn = state.sudokuPage.timerOn;
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
    store.dispatch(timerPauseAction());
  }
  onUndoClickHandler() {
    store.dispatch(undoAction());
  }

  onTimerSwitch() {
    if (this.timerOn) {
      store.dispatch(timerPauseAction());
    } else {
      store.dispatch(timerResumeAction());
    }
  }

  render() {
    return (
      <acc-page>
        <header>
          <acc-button onClick={() => this.onBackClickHandler()} >Back</acc-button>
          <acc-button onClick={() => this.onUndoClickHandler()} >Undo</acc-button>
          <acc-button onClick={() => this.onTimerSwitch()} >{this.timerOn ? "Pause" : "Resume "}</acc-button>
          {/* <div class="title">Sudoku</div> */}
          <acc-timer class="title" time={this.timer}></acc-timer>
          <acc-switch onSwitch={(draftMode) => this.dispatchSwitchDraftMode(draftMode)}>Draft mode</acc-switch>
        </header>
        <acc-flipbox flip={!this.timerOn}>
          <div slot="front">
            <sudoku-board-component
              id="sudokuboard"
              board={this.board}
              // candidatesBoard={this.candidatesBoard}
              cellSelected={this.cellSelected}
              incorrectCells={this.incorrectCells}
              solvedRow={this.rowSolved}
              solvedCol={this.colSolved}
              solvedBlock={this.blockSolved}
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
          <div slot="back" onClick={() => this.onTimerSwitch()}>
            &#9658;
          </div>
        </acc-flipbox>
      </acc-page >
    );
  }
}