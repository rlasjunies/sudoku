import { SudokuLevelType, SudokuBoard, initializeSudokuBoard } from "../../services/sudoku/sudoku";

export interface SudokuPageState {
  board: SudokuBoard;
  boardHistory:SudokuBoard[];
  boardLevel: SudokuLevelType | null;
  cellSelected: number | null;
  boardJustFinish: boolean;
  draftMode:boolean;
  rowSolved: number;
  colSolved: number;
  blockSolved: number;
  boardSolved: boolean;
  gameOnGoing: boolean;
  timer:number; //seconds
  timerOn:boolean;
}
  
const emptyBoard = initializeSudokuBoard();
export const sudokuPageInitialState: SudokuPageState = {
  board: emptyBoard,
  boardHistory: [],
  rowSolved: null,
  colSolved: null,
  blockSolved: null,
  boardSolved: false,
  
  gameOnGoing: false,
  boardLevel: null,
  cellSelected: -1,
  boardJustFinish: false,
  draftMode: false,
  timer: 0,
  timerOn: false
};
