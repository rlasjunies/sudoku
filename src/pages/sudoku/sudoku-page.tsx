import { Component, State } from '@stencil/core';
import { store } from 'state/appStore';
import { AppState } from 'state/app.state';
import * as sudokuValueTyped from "state/sudoku/sudoku.actions.valueTyped";
import * as sudokuDraftTyped from "state/sudoku/sudoku.actions.draftTyped";
import * as sudokuClearTyped from "state/sudoku/sudoku.actions.clear";
import { SudokuBoard, initializeSudokuBoard } from 'services/sudoku/sudoku';
import * as sudokuUndo from 'state/sudoku/sudoku.actions.undo';
import * as sudokuCellSelected from "state/sudoku/sudoku.actions.cellSelected";
import * as sudokuTimerPause from "state/sudoku/sudoku.actions.timerPause";
import * as sudokuTimerResume from "state/sudoku/sudoku.actions.timerResume";
import * as navigateToSplashScreen_PauseTimer from "state/_multiDomain/actions.navigateToSplashScreen_StopTimer";

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
    store.dispatch(sudokuCellSelected.action(cell))
  }

  dispatchNumberTyped({ detail: keyTyped }) {
    store.dispatch(sudokuValueTyped.action(keyTyped));
  }
  dispatchDraftNumberTyped({ detail: keyTyped }) {
    store.dispatch( sudokuDraftTyped.action(keyTyped));
  }
  dispatchClearTyped() {
    store.dispatch(sudokuClearTyped.action());
  }
  
  dispatchUndoTyped() {
    store.dispatch(sudokuUndo.action());
  }


  onBackClickHandler() {
    store.dispatch(navigateToSplashScreen_PauseTimer.action());
  }
  onUndoClickHandler() {
    store.dispatch(sudokuUndo.action());
  }

  onTimerSwitch() {
    if (this.timerOn) {
      store.dispatch(sudokuTimerPause.action());
    } else {
      store.dispatch(sudokuTimerResume.action());
    }
  }

  render() {
    return (
      <acc-page>
        <div class="header">
          <button class="btn btn-link"
            onClick={() => this.onBackClickHandler()}>
            <clr-icon shape="angle caret left" size="40"></clr-icon>Back
          </button>


          <acc-timer class="title" time={this.timer}></acc-timer>

          <button class="btn"
            onClick={() => this.onTimerSwitch()}>
            <clr-icon shape={this.timerOn ? "pause" : "play"}></clr-icon>{this.timerOn ? "Pause" : "Resume"}
          </button>


        </div>
        <div class="content">
          <acc-flipbox flip={!this.timerOn}>
            <div slot="front">
              <sudoku-board-component
                id="sudokuboard"
                board={this.board}
                cellSelected={this.cellSelected}
                incorrectCells={this.incorrectCells}
                solvedRow={this.rowSolved}
                solvedCol={this.colSolved}
                solvedBlock={this.blockSolved}
                boardSolved={this.boardSolved}

                onCellSelection={(cellNumberCustomEvent) => this.dispatchCellSelection(cellNumberCustomEvent)}>
              </sudoku-board-component>
              <key-board3
                onClearClicked={_ => this.dispatchClearTyped()}
                onUndoClicked={_ => this.dispatchUndoTyped()}
                onNumberClicked={(keyCustomeEvent) => this.dispatchNumberTyped(keyCustomeEvent)}
                onDraftNumberClicked={(draftNumberClicked)=> this.dispatchDraftNumberTyped(draftNumberClicked)}
                remainingNumbers={this.board.remainingNumbers}>
              </key-board3>
            </div>
            <div slot="back" onClick={() => this.onTimerSwitch()}>
              <clr-icon shape="play" ></clr-icon>
            </div>
          </acc-flipbox>
        </div>
      </acc-page >
    );
  }
}