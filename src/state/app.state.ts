import { SudokuPageState } from "./sudoku.state";

export interface AppState{
  sudokuPage: SudokuPageState;
  messageToNotify: string | null;
}
