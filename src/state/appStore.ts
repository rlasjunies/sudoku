import { Store } from "../services/store/store";
import { sudokuPageReducer } from "./sudoku/sudoku.reducers";
import { sudokuPageInitialState } from "./sudoku/sudoku.state";
import { AppState } from "./app.state";
import { splashScreenPageInitialState } from "./splash-screen/splash-screen.state";
import { splashScreenPageReducer } from "./splash-screen/splash-screen.reducers";
import { appRootReducer } from "./app-root/app-root.reducers";
import { appRootInitialState } from "./app-root/app-root.state";

const reducers = {
  sudokuPage: sudokuPageReducer,
  splashScreenPage: splashScreenPageReducer,
  appRoot: appRootReducer
};

const initialState : AppState = {
  sudokuPage: sudokuPageInitialState,
  splashScreenPage: splashScreenPageInitialState,
  appRoot: appRootInitialState
}

export const store = new Store(reducers, initialState);
