import { Component, State, Element } from '@stencil/core';
import { store } from '../../state/appStore';
import { cellSelectedAction } from "../../state/sudoku.actions.cellSelected";
import { generateBoardAction } from "../../state/sudoku.actions.generateBoard";
import { valueTypedAction } from "../../state/sudoku.actions.valueTyped";
import { AppState } from '../../state/app.state';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {
  @Element() element: HTMLAppRootElement;
  
  @State() board: number[]= Array(81);
  @State() incorrectCells: number[];
  @State() cellSelected: number;

  sudokuBoardElt: HTMLSudokuBoardElement;
  unsubscribeStateChanged: () => void;

  componentDidUnload() {
    this.unsubscribeStateChanged();
  }
  componentDidLoad() {
    this.sudokuBoardElt = this.element.shadowRoot.querySelector("sudoku-board");
    this.unsubscribeStateChanged = store.subscribeReaction(this.stateChanged, this );
  }
  stateChanged(state: AppState, thisContext: AppRoot): any {
    thisContext.board = state.sudokuPage.board;
    thisContext.incorrectCells = state.sudokuPage.incorrectCells;
    thisContext.cellSelected = state.sudokuPage.cellSelected;
  }

  dispatchGenerateSudokuBoard() {
    store.dispatch(generateBoardAction("normal"));
  }

  dispatchCellSelection({ detail: cell }) {
    store.dispatch(cellSelectedAction(cell))
  }

  dispatchKeyBoardValueTyped({detail: keyTyped}){
    store.dispatch(valueTypedAction(keyTyped));
  }

  render() {
    return (
      [
        <header>
          <h1>Sudoku maison</h1>
          <button onClick={() => this.dispatchGenerateSudokuBoard()}>Generate</button>
        </header>,
        <div class="main">
          <sudoku-board
            id="sudokuboard"
            board={this.board}
            cellSelected={this.cellSelected}
            incorrectCells={this.incorrectCells}
            onCellSelection={(cellNumberCustomEvent) => this.dispatchCellSelection(cellNumberCustomEvent)}></sudoku-board>
          <key-board2 onKeyClicked={(keyCustomeEvent) => this.dispatchKeyBoardValueTyped(keyCustomeEvent)}></key-board2>
        </div>
      ]
    );
  }
}
