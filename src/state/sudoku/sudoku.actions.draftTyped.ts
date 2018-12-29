import { sudokuBoardClone } from "../../services/sudoku/sudoku";
import { Action, registerMutator } from "services/store/store";
import { AppState } from "state/app.state";

export const actionNameDraftNumberTyped = "DRAFT_NUMBER_TYPED";
export function action(value: number): Action {
  return {
    name: actionNameDraftNumberTyped,
    payload: { valueTyped: value }
  }
}

export function mutator(state: AppState, action: Action): AppState {
  const payload = action.payload;
  const currentCell = state.sudokuPage.cellSelected;
  const oldBoard = state.sudokuPage.board;
  // const row = rowOfCellNumber(currentCell);
  // const col = colOfCellNumber(currentCell);
  // const block = blockOfCellNumber(currentCell);
  // let rowSolved: number | null = null;
  // let colSolved: number | null = null;
  // let blockSolved: number | null = null;
  // let boardSolved: boolean = false;

  let newBoard = sudokuBoardClone(state.sudokuPage.board);

  // TODO: algo a revoir quand fonctionnel avancé, il faut mettre dans des sous fonctions l'ensemeble des cas

  if (currentCell === null) {
    // noting done
  } else if (newBoard.cells[currentCell].seed) {
    // no modification allowed
  } else {
    const value = payload.valueTyped;

    newBoard.cells[currentCell].candidates[value - 1] = newBoard.cells[currentCell].candidates[value - 1] ? false : true;

    return {
      ...state,
      sudokuPage: {
        ...state.sudokuPage,
        board: newBoard,
        boardHistory: [...state.sudokuPage.boardHistory, oldBoard],  // add the oldBoard in the history
        // rowSolved: rowSolved,
        // colSolved: colSolved,
        // blockSolved: blockSolved,
        // boardSolved: boardSolved
      }
    }
  }
  return state;
}

registerMutator(actionNameDraftNumberTyped, mutator);