import { Component, State } from '@stencil/core';
import { store } from 'state/appStore';
import { AppState } from 'state/app.state';
import { cellSelectedAction } from "state/sudoku/sudoku.actions.cellSelected";
// import { switchDraftModeAction } from "../../state/sudoku/sudoku.actions.switchDraftMode";
import { numberTypedAction, clearTypedAction, draftNumberTypedAction } from "../../state/sudoku/sudoku.actions.valueTyped";
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
  dispatchDraftNumberTyped({ detail: keyTyped }) {
    store.dispatch(draftNumberTypedAction(keyTyped));
  }
  dispatchClearTyped() {
    store.dispatch(clearTypedAction());
  }
  
  dispatchUndoTyped() {
    store.dispatch(undoAction());
  }

  // dispatchSwitchDraftMode({ detail: draftMode }): void {
  //   // console.log(`dispartchSwitchDraftMode:`,draftMode);
  //   store.dispatch(switchDraftModeAction(draftMode));
  // }

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
        <div class="header">
          <button class="btn btn-link"
            onClick={() => this.onBackClickHandler()}>
            <clr-icon shape="angle caret left" size="40"></clr-icon>Back
          </button>

          {/* <button class="btn"
            onClick={() => this.onUndoClickHandler()} >
            <clr-icon shape="undo"></clr-icon>Undo
          </button> */}

          <acc-timer class="title" time={this.timer}></acc-timer>

          <button class="btn"
            onClick={() => this.onTimerSwitch()}>
            <clr-icon shape={this.timerOn ? "pause" : "play"}></clr-icon>{this.timerOn ? "Pause" : "Resume"}
          </button>

          {/* <div class="toggle-switch"> */}
            {/* <input type="checkbox" id="toggle_1" /> */}
            {/* <label></label> */}
          {/* </div> */}

          {/* <acc-switch onSwitch={(draftMode) => this.dispatchSwitchDraftMode(draftMode)}>
            <clr-icon shape="pencil" size="30"></clr-icon>
            Draft
          </acc-switch> */}
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
                // draftMode={this.draftMode}
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