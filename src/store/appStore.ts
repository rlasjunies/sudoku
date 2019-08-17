import { Store } from "../services/store/store";
import { AppState } from "../store/app.state";

import { sudokuPageInitialState } from "./sudoku/sudoku.state";
import { splashScreenPageInitialState } from "./splash-screen/splash-screen.state";
import { appRootInitialState } from "./app-root/app-root.state";
import { registerLogger } from "../store/middleware/logger";
// import { registerTimer } from "../store/middleware/timerService";

import * as timerTick from "../store/sudoku/sudoku.actions.timer.Tick";

const initialState: AppState = {
  sudokuPage: sudokuPageInitialState,
  splashScreenPage: splashScreenPageInitialState,
  appRoot: appRootInitialState
}

export const store = new Store(initialState, 'sudoku-accurentis');

store
  .registerReducer(timerTick.action().name, timerTick.reducer)


// sort of "middleware"
registerLogger(store);
// registerTimer(store);