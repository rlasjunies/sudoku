import { Action } from "../services/store/store";

export type SudokuActionType = 
  "CELL_SELECTED" | 
  "GENERATE_BOARD" | 
  "VALUE_TYPED" |
  "SWITCH_DRAFT_MODE";

export interface SudokuAction extends Action {
  type: SudokuActionType;
  payload: any;
}