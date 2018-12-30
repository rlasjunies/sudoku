import { Action, registerMutator } from "services/store/store";
import { AppState } from "state/app.state";
import * as navigateToSplashScreen from "state/app-root/app-root.actions.navigateToSplashScreen";
import * as timerPause from "state/sudoku/sudoku.actions.timer.Pause";

export function action(): Action {
  return {
    name: "navigateToSplashScreen_StopTimer",
    payload: {}
  }
}
export function mutator(state: AppState, action: Action): AppState {
  const navigateToSplashScreenState = navigateToSplashScreen.mutator(state, action);
  const timerPausedState = timerPause.mutator(navigateToSplashScreenState, action);
  return timerPausedState;
};

registerMutator(action().name, mutator);