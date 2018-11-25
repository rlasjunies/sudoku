import { AppAction } from "../app.actions";
import { generateSudokuBoard, SudokuLevelType, initializeCandidatesBoard } from "../../services/sudoku/sudoku";
import { SudokuPageState } from "./sudoku.state";
import { SudokuAction } from "./sudoku.actions";
export const GENERATE_BOARD = "GENERATE_BOARD"; 

// export function isGenerateBoard(state):boolean{
//   return state.actionType === GENERATE_BOARD
// }

export function generateBoardAction( level: SudokuLevelType) : AppAction {
  return {
    type: GENERATE_BOARD,
    payload: { 
      level: level, 
      board: generateSudokuBoard(level) 
    }
  }
}

export function generateBoardReducer(state:SudokuPageState, action:SudokuAction):SudokuPageState {
  const level = action.payload.level;
  const board = action.payload.board;
  return {
    ...state,
    board: board,
    boardLevel: level,
    incorrectCells: [],
    cellSelected: -1,
    candidatesBoard: initializeCandidatesBoard(),
    gameOnGoing: true
  }
}