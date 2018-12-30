import { Action, registerMutator } from "services/store/store";
import { AppState } from "state/app.state";
import * as pauseGame from "state/sudoku/sudoku.actions.pauseGame";
import * as timerPause from "state/sudoku/sudoku.actions.timer.Pause";

export function action(): Action {
  return {
    name: "PAUSEGAME_PAUSETIMER",
    payload: {}
  }
}
export function mutator(state: AppState, action: Action): AppState {
  const pauseGameState = pauseGame.mutator(state, action);
  const timerPauseState = timerPause.mutator(pauseGameState, action);
  return timerPauseState;
};

registerMutator(action().name, mutator);