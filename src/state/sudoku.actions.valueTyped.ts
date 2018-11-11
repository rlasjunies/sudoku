import { SudokuAction } from "./sudoku.actions";
import { SudokuPageState } from "./sudoku.state";
import { updateBoard, isPossibleNumber } from "../services/sudoku/sudoku";
export const VALUE_TYPED_ACTION = "VALUE_TYPED";


interface valueTypeActionPayload {
  valueTyped: number
}
export function valueTypedAction(value: number): SudokuAction {
  return {
    type: VALUE_TYPED_ACTION,
    payload: { valueTyped: value }
  }
}

export function valueTypedReducer(state: SudokuPageState, action:SudokuAction): SudokuPageState {
  const payload : valueTypeActionPayload = action.payload;
  const currentCell = state.cellSelected; 
  const currentBoard = state.board;

  if ( currentCell === null) {
    // TODO
    // return {
    //   ...state,
    //   messageToNotify: "Select a cell before";
    // }
  }  else {
    const value = payload.valueTyped;
    const isValueCorrect = isPossibleNumber(currentCell,value,currentBoard);
    let incorrectCells: number[];
    incorrectCells = state.incorrectCells.filter( (cellNumber) => cellNumber !== currentCell )
    if (!isValueCorrect){ 
      incorrectCells = [...state.incorrectCells,currentCell];
      console.log("Value incorrect:", incorrectCells);
    }

    return {
      ...state,
      board: updateBoard(value, currentCell, currentBoard),
      incorrectCells: incorrectCells
    }
  }
}