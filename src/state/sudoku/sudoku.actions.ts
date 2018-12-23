import { Action } from "../../services/store/store";

export type SudokuActionType = 
  "CELL_SELECTED" | 
  "GENERATE_BOARD" | 
  "NUMBER_TYPED" |
  "DRAFT_NUMBER_TYPED" |
  "CLEAR_TYPED" | 
  "SWITCH_DRAFT_MODE" |
  "SHOW" | 
  "HIDE" | 
  "UNDO" | 
  "TIMER_START" |
  "TIMER_PAUSE" |
  "TIMER_RESUME" | 
  "TIMER_TICK";

export interface SudokuAction extends Action {
  type: SudokuActionType;
  payload: any;
}