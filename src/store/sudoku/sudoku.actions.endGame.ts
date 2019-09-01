import { Action } from "../../services/store/store";
import { AppState } from '../../store//app.state';
import { store } from '../../store//appStore';

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
      gameOnGoing: false,
      boardSolved: false
    }
  }
}

store.registerReducer(action().name, reducer);