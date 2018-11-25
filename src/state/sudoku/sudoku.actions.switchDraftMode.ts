import { AppAction } from "../app.actions";
import { SudokuPageState } from "./sudoku.state";
import { SudokuAction } from "./sudoku.actions";

export function switchDraftModeAction(draftMode: boolean): AppAction {
  return {
    type: "SWITCH_DRAFT_MODE",
    payload: {
      draftMode: draftMode
    }
  }
}

export function swtichModeReducer(state: SudokuPageState, action: SudokuAction): SudokuPageState {
  const draftMode = (action.payload.draftMode === 'true' ? true : false);
  // console.log(`swtichModeReducer:`, draftMode);
  return {
    ...state,
    draftMode: draftMode
  }
}