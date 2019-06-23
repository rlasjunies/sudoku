import { Action } from "../../services/store/store";
import { AppState} from '../../store//app.state';
import { store } from '../../store//appStore';
import * as endGame from "../../store/sudoku/sudoku.actions.endGame";
import * as pauseTimer from "../../store/sudoku/sudoku.actions.timer.Pause";

export function action(): Action {
  return {
    name: "ENDGAME_STOPTIMER",
    payload: {}
  }
}
export function reducer(state: AppState, action: Action): AppState {
  const endGamesState = endGame.reducer(state, action);
  const pauseTimerState = pauseTimer.reducer(endGamesState, action);
  return pauseTimerState;
};

store.registerReducer(action().name, reducer);