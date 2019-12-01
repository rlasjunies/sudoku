import { Action } from "../../services/store/store";
import { AppState} from '../../store/app.state';
// import { store } from '../../store/appStore';
import * as resumeGame from "../../store/sudoku/sudoku.actions.resumeGame";
import * as timerResume from "../../store/sudoku/sudoku.actions.timer.Resume";

export function action(): Action {
  return {
    name: "RESUMEGAME_RESUMETIMER",
    payload: {}
  }
}
export function reducer(state: AppState, action: Action): AppState {
  const resumeGameState = resumeGame.reducer(state, action);
  const timerResumeState = timerResume.reducer(resumeGameState, action);
  return timerResumeState;
};

// store.registerReducer(action().name, reducer);