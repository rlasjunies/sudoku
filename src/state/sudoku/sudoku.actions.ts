import { Action } from "../../services/store/store";

export type SudokuActionType = 
  "CELL_SELECTED" | 
  "GENERATE_BOARD" | 
  "NUMBER_TYPED" |
  "CLEAR_TYPED" | 
  "SWITCH_DRAFT_MODE" |
  "SHOW" | "HIDE" 


export interface SudokuAction extends Action {
  type: SudokuActionType;
  payload: any;
}