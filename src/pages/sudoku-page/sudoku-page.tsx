import { Component, State, Element, h } from '@stencil/core';
import { AppState } from '../../store//app.state';
import { store } from '../../store/appStore';
import * as sudokuValueTyped from "../../store/sudoku/sudoku.actions.typeNumber";
import * as sudokuDraftTyped from "../../store/sudoku/sudoku.actions.typeDraftNumber";
import * as sudokuClearTyped from "../../store/sudoku/sudoku.actions.clearCellValue";
import * as sudokuUndo from '../../store/sudoku/sudoku.actions.undoLastMove';
import * as sudokuCellSelected from "../../store/sudoku/sudoku.actions.selectCell";
import * as pauseGame_PauseTimer from "../../store/_combinedActions/actions.pauseGame_PauseTimer";
import * as resumeGame_ResumeTimer from "../../store/_combinedActions/actions.resumeGame_ResumeTimer";
import * as navigateToSplashScreen_PauseTimer from "../../store/_combinedActions/actions.navigateToSplashScreen_StopTimer";
// import * as navigateToNewGame from "../../store/app-root/app-root.actions.navigateToSudokuNew";
import * as navigateTo from "../../store/app-root/app-root.actions.navigateTo";
import * as navigateToWizard from "../../store/_combinedActions/actions.navigateToWiazrd_PauseTimer";
import * as autoCalculatePossibleValuesAction from "../../store/sudoku/sudoku.actions.wizard.AutoCalculatePossibleValuesToggle";
import { SudokuBoard, initializeSudokuBoard, SolutionsByRules, SudokuWizardConfiguration, sudokuWizardConfigurationInit } from '../../services/sudoku/sudoku';

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
  @State() solutionsByRules: SolutionsByRules;
  @State() wizardConfiguration: SudokuWizardConfiguration = sudokuWizardConfigurationInit;
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

    this.solutionsByRules = state.sudokuPage.solutionsByRules;
    this.wizardConfiguration = state.sudokuPage.wizardConfiguration;
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

  dispatchNavigateToWizardPage() {
    store.dispatch(navigateToWizard.action());
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
    store.dispatch(navigateTo.action(navigateTo.pages.newGame));
  }

  onWizardClickHandler() {
    store.dispatch(navigateToWizard.action());
  }

  onCalculatePossibleValuesClickHandler() {
    store.dispatch(autoCalculatePossibleValuesAction.action());
  }

  header() {
    return (
      <ion-header>
        <ion-toolbar>
          {this.header_start()}
          {this.header_middle()}
          {this.header_end()}
        </ion-toolbar>
      </ion-header>
    )
  }
  header_middle() {
    return ([
      <ion-buttons slot="end" class={this.gameOnGoing ? "" : "hidden"}>
        <acc-timer time={this.timer}></acc-timer>
        <ion-button
          onClick={() => this.onTimerSwitch()}>
          <ion-icon name={!this.gameInPause ? "pause" : "play"}></ion-icon>
        </ion-button>
      </ion-buttons>
    ])
  }
  header_end() {
    return (
      <ion-buttons slot="end" class={this.gameOnGoing ? "" : "hidden"}>
        <ion-button onClick={() => this.onWizardClickHandler()}>
          <ion-icon name="help-buoy"></ion-icon>
        </ion-button>
      </ion-buttons>
    )
  }
  header_start() {
    return (
      <ion-buttons slot="start">
        <ion-button onClick={() => this.onBackClickHandler()}>
          <ion-icon name="arrow-back"></ion-icon>
        </ion-button>
      </ion-buttons>
    )
  }
  render() {
    return (
      [
        this.header(),
        <div class="pagecontent">
          <div id="game" class={this.gameInPause ? 'displayNone' : 'displayYes'}>
            <sudoku-board-component
              id="sudokuboard"
              board={this.board}
              cellSelected={this.cellSelected}
              lastCellOfTheGame={this.lastCellOfTheGame}
              incorrectCells={this.incorrectCells}
              solvedRow={this.rowSolved}
              solvedCol={this.colSolved}
              solvedBlock={this.blockSolved}
              gameOnGoing={this.gameOnGoing}
              solutionsByRules={this.solutionsByRules}
              wizardConfiguration={this.wizardConfiguration}

              onCellSelection={(cellNumberCustomEvent) => this.dispatchCellSelection(cellNumberCustomEvent)}>
            </sudoku-board-component>
            <key-board class={!this.gameOnGoing ? "hidden" : ""}
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
            </key-board>
            <div id="newGame" class={this.gameOnGoing ? "hidden" : ""}>
              {/* <div id="newGameText"> */}
                <p>Good game! Play again?</p>
              {/* </div> */}
              <ion-button expand="block" size="large" onClick={this.onNewGameClicked}>Newboard</ion-button>
            </div>
          </div>
          <div id="pause" class={this.gameInPause ? 'displayYes' : 'displayNone'}
            onClick={() => this.onTimerSwitch()}>
            <ion-icon name="play"></ion-icon>
          </div>
        </div>
      ]
    );
  }
}