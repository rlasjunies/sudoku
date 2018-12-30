import { Action, registerMutator } from "services/store/store";
import { AppState } from "state/app.state";
import * as navigateToSudoku from "state/app-root/app-root.actions.navigateToSudokuPage";
import * as timerResume from "state/sudoku/sudoku.actions.timer.Resume";

export function action(): Action {
  return {
    name: "navigateToSudoku_ResumeTimer",
    payload: {}
  }
}
export function mutator(state: AppState, action: Action): AppState {
  const navigateToSudokuState = navigateToSudoku.mutator(state, action);
  const timerResumeState = timerResume.mutator(navigateToSudokuState, action);
  return timerResumeState;
};

registerMutator(action().name, mutator);