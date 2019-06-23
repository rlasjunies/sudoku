import * as sudokuTimerTick from "../../store/sudoku/sudoku.actions.timer.Tick";
import { AppState} from '../../store/app.state';
import { store } from '../../store/appStore';
import { Store } from "../../services/store/store";

// ok is not really a middleware
// add a timer service
let context = {
  timerOn: false,
  timer: null
};

function stateChanged(state: AppState): any {
  // console.log(`Dans state changed:${state.sudokuPage.timerOn},${context.timerOn}`);
  if (state.sudokuPage.timerOn && !context.timerOn) {
    // activate the timer
    // console.log("activate");
    context.timer = setInterval(() => {
      store.dispatch(sudokuTimerTick.action());
    }, 1000);
    context.timerOn = true;

  } else if (!state.sudokuPage.timerOn && context.timerOn) {
    // deactivate timer
    // console.log("deactivate");
    clearInterval(this.timer);
    context.timerOn = false;
  }
}

export function registerTimer(store: Store) {
  store.subscribeReaction(stateChanged, context);
}
