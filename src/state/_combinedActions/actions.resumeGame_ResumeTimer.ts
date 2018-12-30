import { Action, registerMutator } from "services/store/store";
import { AppState } from "state/app.state";
import * as resumeGame from "state/sudoku/sudoku.actions.resumeGame";
import * as timerResume from "state/sudoku/sudoku.actions.timer.Resume";

export function action(): Action {
  return {
    name: "RESUMEGAME_RESUMETIMER",
    payload: {}
  }
}
export function mutator(state: AppState, action: Action): AppState {
  const resumeGameState = resumeGame.mutator(state, action);
  const timerResumeState = timerResume.mutator(resumeGameState, action);
  return timerResumeState;
};

registerMutator(action().name, mutator);