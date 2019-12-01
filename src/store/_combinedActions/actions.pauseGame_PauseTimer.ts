import { Action } from "../../services/store/store";
import { AppState} from '../../store/app.state';
// import { store } from '../../store/appStore';
import * as pauseGame from "../../store/sudoku/sudoku.actions.pauseGame";
import * as timerPause from "../../store/sudoku/sudoku.actions.timer.Pause";

export function action(): Action {
  return {
    name: "PAUSEGAME_PAUSETIMER",
    payload: {}
  }
}
export function reducer(state: AppState, action: Action): AppState {
  const pauseGameState = pauseGame.reducer(state, action);
  const timerPauseState = timerPause.reducer(pauseGameState, action);
  return timerPauseState;
};

// store.registerReducer(action().name, reducer);