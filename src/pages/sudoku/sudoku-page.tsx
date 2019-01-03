import { Component, State, Element } from '@stencil/core';
import { AppState, store } from 'store/index';
import * as sudokuValueTyped from "store/sudoku/sudoku.actions.typeNumber";
import * as sudokuDraftTyped from "store/sudoku/sudoku.actions.typeDraftNumber";
import * as sudokuClearTyped from "store/sudoku/sudoku.actions.clearCellValue";
import { SudokuBoard, initializeSudokuBoard } from 'services/sudoku/sudoku';
import * as sudokuUndo from 'store/sudoku/sudoku.actions.undoLastMove';
import * as sudokuCellSelected from "store/sudoku/sudoku.actions.selectCell";
import * as pauseGame_PauseTimer from "store/_combinedActions/actions.pauseGame_PauseTimer";
import * as resumeGame_ResumeTimer from "store/_combinedActions/actions.resumeGame_ResumeTimer";
import * as navigateToSplashScreen_PauseTimer from "store/_combinedActions/actions.navigateToSplashScreen_StopTimer";
import * as navigateToNewGame from "store/app-root/app-root.actions.navigateToCreateNewBoard";
@Component({
  tag: 'sudoku-page',
  styleUrl: 'sudoku-page.css'
})
export class SudokuPage {

  @Element() element: HTMLSudokuPageElement;
  sudokuBoardComponent: HTMLSudokuBoardComponentElement;
  @State() board: SudokuBoard = initializeSudokuBoard();
  @State() incorrectCells: number[];
  @State() cellSelected: number = -1;
  @State() lastCellOfTheGame: number = -1;
  @State() draftMode: boolean;
  @State() colSolved: number;
  @State() rowSolved: number;
  @State() blockSolved: number;
  @State() boardSolved: boolean;
  @State() timer: number = 0;
  @State() gameOnGoing: boolean;
  @State() gameInPause: boolean;

  unsubscribeStateChanged: () => void;

  componentDidUnload() {
    this.unsubscribeStateChanged();
  }

  componentDidLoad() {
    this.unsubscribeStateChanged = store.subscribeReaction(this.stateChanged, this);
    this.sudokuBoardComponent = this.element.querySelector('sudoku-board-component');
  }
  stateChanged(state: AppState): any {
    this.board = state.sudokuPage.board;
    this.incorrectCells = state.sudokuPage.board.incorrectCells;
    this.cellSelected = state.sudokuPage.cellSelected;
    this.lastCellOfTheGame = state.sudokuPage.lastCellOfTheGame;
    this.draftMode = state.sudokuPage.draftMode;

    this.colSolved = state.sudokuPage.colSolved
    this.rowSolved = state.sudokuPage.rowSolved
    this.blockSolved = state.sudokuPage.blockSolved
    this.boardSolved = state.sudokuPage.boardSolved

    this.gameOnGoing = state.sudokuPage.gameOnGoing;
    this.timer = state.sudokuPage.timer;
    this.gameInPause = state.sudokuPage.gameInPause;
    // if (this.cellSelected !== -1) {
    //   console.log(`is there a value in the cell${this.cellSelected} - this.board.cells[this.cellSelected].value=${this.board.cells[this.cellSelected].value}, compare with 0?:${this.board.cells[this.cellSelected].value !== 0}`)
    // }
  }

  dispatchCellSelection({ detail: cell }) {
    store.dispatch(sudokuCellSelected.action(cell))
  }

  dispatchNumberTyped({ detail: keyTyped }) {
    store.dispatch(sudokuValueTyped.action(keyTyped));
  }
  dispatchDraftNumberTyped({ detail: keyTyped }) {
    store.dispatch(sudokuDraftTyped.action(keyTyped));
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
    if (this.gameInPause) {
      store.dispatch(resumeGame_ResumeTimer.action());
    } else {
      store.dispatch(pauseGame_PauseTimer.action());
    }
  }

  onNewGameClicked() {
    store.dispatch(navigateToNewGame.action());
  }

  render() {
    return (
      <acc-page>
        <div class="header">
          <button class="btn btn-link"
            onClick={() => this.onBackClickHandler()}>
            <clr-icon shape="angle caret left" size="35"></clr-icon>Back
          </button>

          <acc-timer class="timer" time={this.timer}></acc-timer>

          <button class={this.gameOnGoing ? "btn btn-link" : "btn btn-link hidden"}
            onClick={() => this.onTimerSwitch()}>
            <clr-icon shape={!this.gameInPause ? "pause" : "play"}></clr-icon>{!this.gameInPause ? "Pause" : "Resume"}
          </button>


        </div>
        <div class="content">
          <acc-flipbox flip={this.gameInPause}>
            <div slot="front">
              <sudoku-board-component
                id="sudokuboard"
                board={this.board}
                cellSelected={this.cellSelected}
                lastCellOfTheGame={this.lastCellOfTheGame}
                incorrectCells={this.incorrectCells}
                solvedRow={this.rowSolved}
                solvedCol={this.colSolved}
                solvedBlock={this.blockSolved}
                boardSolved={this.boardSolved}

                onCellSelection={(cellNumberCustomEvent) => this.dispatchCellSelection(cellNumberCustomEvent)}>
              </sudoku-board-component>
              <key-board3 class={!this.gameOnGoing ? "displayNone" : ""}
                onClearClicked={_ => this.dispatchClearTyped()}
                onUndoClicked={_ => this.dispatchUndoTyped()}
                onNumberClicked={(keyCustomeEvent) => this.dispatchNumberTyped(keyCustomeEvent)}
                onDraftNumberClicked={(draftNumberClicked) => this.dispatchDraftNumberTyped(draftNumberClicked)}
                remainingNumbers={this.board.remainingNumbers}
                hideClearKey={this.cellSelected === -1
                  || !this.gameOnGoing
                  || this.board.cells[this.cellSelected].value === null
                  || this.board.cells[this.cellSelected].seed}
                hideUndoKey={!this.gameOnGoing}
              >
              </key-board3>
              <div id="newGame" class={this.gameOnGoing ? "displayNone" : ""}>
                <div id="newGameText">
                  <p>Good game! Play again?</p>
                </div>
                <button class="btn"
                  onClick={this.onNewGameClicked}
                >
                  Newboard
                </button>
              </div>
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