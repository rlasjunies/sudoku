import { Component, State, Element } from '@stencil/core';
import { store } from '../../state/appStore';
import { cellSelectedAction } from "../../state/sudoku.actions.cellSelected";
import { generateBoardAction } from "../../state/sudoku.actions.generateBoard";
import { switchDraftModeAction } from "../../state/sudoku.actions.switchDraftMode";
import { valueTypedAction } from "../../state/sudoku.actions.valueTyped";
import { AppState } from '../../state/app.state';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {
  @Element() element: HTMLAppRootElement;

  @State() board: number[];
  @State() candidatesBoard: boolean[][];
  @State() incorrectCells: number[];
  @State() cellSelected: number;
  @State() colSolved: number;
  @State() rowSolved: number;
  @State() zoneSolved: number;
  @State() boardSolved: boolean;
  sudokuBoardElt: HTMLSudokuBoardElement;
  unsubscribeStateChanged: () => void;

  componentDidUnload() {
    this.unsubscribeStateChanged();
  }
  componentDidLoad() {
    this.sudokuBoardElt = this.element.shadowRoot.querySelector("sudoku-board");
    this.unsubscribeStateChanged = store.subscribeReaction(this.stateChanged, this);
  }
  stateChanged(state: AppState, thisContext: AppRoot): any {
    thisContext.board = state.sudokuPage.board;
    thisContext.candidatesBoard = state.sudokuPage.candidatesBoard;
    thisContext.incorrectCells = state.sudokuPage.incorrectCells;
    thisContext.cellSelected = state.sudokuPage.cellSelected;
    // thisContext.draftMode = state.sudokuPage.draftMode;

    thisContext.colSolved = state.sudokuPage.colSolved
    thisContext.rowSolved = state.sudokuPage.rowSolved
    thisContext.zoneSolved= state.sudokuPage.zoneSolved
    thisContext.boardSolved =  state.sudokuPage.boardSolved

  }

  dispatchGenerateSudokuBoard() {
    store.dispatch(generateBoardAction("normal"));
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

  render() {
    return (
      [
        <header>
          <h1>Sudoku maison</h1>
          <acc-button onClick_={() => this.dispatchGenerateSudokuBoard()}>Generate</acc-button>
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
      ]
    );
  }

}
