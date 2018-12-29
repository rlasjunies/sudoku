import { Store } from "../services/store/store";
import { AppState } from "./app.state";

import { sudokuPageInitialState } from "./sudoku/sudoku.state";
import { splashScreenPageInitialState } from "./splash-screen/splash-screen.state";
import { appRootInitialState } from "./app-root/app-root.state";

import * as sudokuTimerTick from "./sudoku/sudoku.actions.timerTick";

const initialState: AppState = {
  sudokuPage: sudokuPageInitialState,
  splashScreenPage: splashScreenPageInitialState,
  appRoot: appRootInitialState
}

export const store = new Store(initialState, 'sudoku-accurentis');

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

store.subscribeReaction(stateChanged, context)