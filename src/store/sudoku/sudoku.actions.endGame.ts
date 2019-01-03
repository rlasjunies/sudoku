import { Action } from "services/store/store";
import { AppState, store } from "store/index";

export function action(): Action {
  return {
    name: "END_GAME",
    payload: {}
  }
}

export function reducer(state: AppState, _action: Action): AppState {
  return {
    ...state,
    sudokuPage: {
      ...state.sudokuPage,
      cellSelected: -1,
      lastCellOfTheGame: state.sudokuPage.cellSelected,
      gameOnGoing: false
    }
  }
}

store.registerReducer(action().name, reducer);