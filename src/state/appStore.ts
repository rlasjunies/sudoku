import { Store } from "../services/store/store";
import { sudokuPageReducer } from "./sudoku.reducer";
import { sudokuPageInitialState } from "./sudoku.state";
import { AppState } from "./app.state";

const reducers = {
  sudokuPage: sudokuPageReducer,
};

const initialState : AppState = {
  sudokuPage: sudokuPageInitialState,
  messageToNotify: null
}

export const store = new Store(reducers, initialState);
