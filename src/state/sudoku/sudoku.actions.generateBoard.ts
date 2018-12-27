import { AppAction } from "../app.actions";
import { generateSudokuBoard, SudokuLevelType } from "../../services/sudoku/sudoku";
import { SudokuPageState } from "./sudoku.state";
import { SudokuAction } from "./sudoku.actions";

export function generateBoardAction( level: SudokuLevelType) : AppAction {
  return {
    type: "GENERATE_BOARD",
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
    boardHistory: [board], // initialize the history with the new board
    boardLevel: level,
    cellSelected: -1,
    gameOnGoing: true,

    // initialize the timer
    // TODO: this should be a concatenation of action
    timerOn: true,
    timer: 0
  }
}