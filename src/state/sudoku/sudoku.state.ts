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
  zoneSolved: number;
  boardSolved: boolean;
  gameOnGoing: boolean;
}
  
const emptyBoard = initializeSudokuBoard();
export const sudokuPageInitialState: SudokuPageState = {
  board: emptyBoard,
  boardHistory: [],
  rowSolved: null,
  colSolved: null,
  zoneSolved: null,
  boardSolved: false,
  
  gameOnGoing: false,
  boardLevel: null,
  cellSelected: -1,
  boardJustFinish: false,
  draftMode: false,
};
