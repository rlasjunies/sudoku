import { Action } from "../services/store/store";
import { SudokuActionType } from "./sudoku.actions";

export type AppActionType = SudokuActionType;

export interface AppAction extends Action {
  type: AppActionType;
  payload: any;
}
