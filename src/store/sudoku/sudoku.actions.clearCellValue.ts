import { isRowSolvedx, blockOfCellNumber, isColSolvedx, isBlockSolvedx, rowOfCellNumber, colOfCellNumber, isBoardSolvedx, sudokuBoardClone, remainingNumbers } from "../../services/sudoku/sudoku";
import { Action } from "../../services/store/store";
import { AppState} from '../../store/app.state';
import { store } from '../../store/appStore';

export function action(): Action {
  return {
    name: "CLEAR_TYPED",
    payload: { valueTyped: null }
  }
}

export function reducer(state: AppState, _action: Action): AppState {
  // const payload = action.payload;
  const currentCell = state.sudokuPage.cellSelected;
  const oldBoard = state.sudokuPage.board;
  const row = rowOfCellNumber(currentCell);
  const col = colOfCellNumber(currentCell);
  const block = blockOfCellNumber(currentCell);
  let rowSolved: number | null = null;
  let colSolved: number | null = null;
  let blockSolved: number | null = null;
  let boardSolved: boolean = false;

  let newBoard = sudokuBoardClone(state.sudokuPage.board);

  // TODO: algo a revoir quand fonctionnel avancé, il faut mettre dans des sous fonctions l'ensemeble des cas

  if (currentCell === null) {
    // noting done
  } else if (newBoard.cells[currentCell].seed) {
    // no modification allowed
  } else {

    newBoard.cells[currentCell].candidates = [];
    newBoard.cells[currentCell].value = null;
    // remove the cell of the incorrect cells
    newBoard.incorrectCells = newBoard.incorrectCells.filter((cellNumber) => cellNumber !== currentCell);

    // check if zones are solved in order to provide animation for the player
    rowSolved = isRowSolvedx(row, newBoard) ? row : null;
    colSolved = isColSolvedx(col, newBoard) ? col : null;
    blockSolved = isBlockSolvedx(block, newBoard) ? block : null;
    boardSolved = isBoardSolvedx(newBoard) ? true : false;
    newBoard.remainingNumbers = remainingNumbers(newBoard.cells);

    return {
      ...state,
      sudokuPage: {
        ...state.sudokuPage,
        board: newBoard,
        boardHistory: [...state.sudokuPage.boardHistory, oldBoard],  // add the oldBoard in the history
        rowSolved: rowSolved,
        colSolved: colSolved,
        blockSolved: blockSolved,
        boardSolved: boardSolved
      }
    }
  }
  return state;
}

store.registerReducer(action().name, reducer);