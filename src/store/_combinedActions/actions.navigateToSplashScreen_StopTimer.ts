import { Action } from "services/store/store";
import { AppState, store } from "store/index";
import * as navigateToSplashScreen from "store/app-root/app-root.actions.navigateToSplashScreen";
import * as timerPause from "store/sudoku/sudoku.actions.timer.Pause";

export function action(): Action {
  return {
    name: "navigateToSplashScreen_StopTimer",
    payload: {}
  }
}
export function reducer(state: AppState, action: Action): AppState {
  const navigateToSplashScreenState = navigateToSplashScreen.reducer(state, action);
  const timerPausedState = timerPause.reducer(navigateToSplashScreenState, action);
  return timerPausedState;
};

store.registerReducer(action().name, reducer);