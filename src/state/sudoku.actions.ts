import { Action } from "../services/store/store";

export type SudokuActionType = 
  "CELL_SELECTED" | 
  "GENERATE_BOARD" | 
  "VALUE_TYPED";

export interface SudokuAction extends Action {
  type: SudokuActionType;
  payload: any;
}