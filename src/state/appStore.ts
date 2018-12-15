import { Store } from "../services/store/store";
import { sudokuPageReducer } from "./sudoku/sudoku.reducers";
import { sudokuPageInitialState } from "./sudoku/sudoku.state";
import { AppState } from "./app.state";
import { splashScreenPageInitialState } from "./splash-screen/splash-screen.state";
import { splashScreenPageReducer } from "./splash-screen/splash-screen.reducers";
import { appRootReducer } from "./app-root/app-root.reducers";
import { appRootInitialState } from "./app-root/app-root.state";
import { timerTickAction } from "./sudoku/sudoku.actions.timer";

const reducers = {
  sudokuPage: sudokuPageReducer,
  splashScreenPage: splashScreenPageReducer,
  appRoot: appRootReducer
};

const initialState: AppState = {
  sudokuPage: sudokuPageInitialState,
  splashScreenPage: splashScreenPageInitialState,
  appRoot: appRootInitialState
}

export const store = new Store(reducers, initialState, 'accurentis-sudoku');

let context = {
  timerOn: false,
  timer: null
};

store.subscribeReaction(stateChanged, context)
function stateChanged(state: AppState): any {
  // console.log(`Dans state changed:${state.sudokuPage.timerOn},${context.timerOn}`);
  if (state.sudokuPage.timerOn && !context.timerOn) {
    // activate the timer
    // console.log("activate");
    context.timer = setInterval(() => {
      store.dispatch(timerTickAction());
    }, 1000);
    context.timerOn = true;

  } else if (!state.sudokuPage.timerOn && context.timerOn) {
    // deactivate timer
    // console.log("deactivate");

    clearInterval(this.timer);
    context.timerOn = false;
  }
}