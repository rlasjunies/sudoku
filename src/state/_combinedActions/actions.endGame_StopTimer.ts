import { Action, registerMutator } from "services/store/store";
import { AppState } from "state/app.state";
import * as endGame from "state/sudoku/sudoku.actions.endGame";
import * as pauseTimer from "state/sudoku/sudoku.actions.timer.Pause";

export function action(): Action {
  return {
    name: "ENDGAME_STOPTIMER",
    payload: {}
  }
}
export function mutator(state: AppState, action: Action): AppState {
  const endGamesState = endGame.mutator(state, action);
  const pauseTimerState = pauseTimer.mutator(endGamesState, action);
  return pauseTimerState;
};

registerMutator(action().name, mutator);