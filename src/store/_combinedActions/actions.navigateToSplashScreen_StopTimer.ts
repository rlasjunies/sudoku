import { Action } from "../../services/store/store";
import { AppState} from '../../store/app.state';
import { store } from '../../store/appStore';
import * as navigateTo from "../../store/app-root/app-root.actions.navigateTo";
import * as timerPause from "../../store/sudoku/sudoku.actions.timer.Pause";

export function action(): Action {
  return {
    name: "navigateToSplashScreen_StopTimer",
    payload: {}
  }
}
export function reducer(state: AppState, action: Action): AppState {
  const navigateToSplashScreenState = navigateTo.reducer(state, navigateTo.action(navigateTo.pages.home));
  const timerPausedState = timerPause.reducer(navigateToSplashScreenState, action);
  return timerPausedState;
};

store.registerReducer(action().name, reducer);