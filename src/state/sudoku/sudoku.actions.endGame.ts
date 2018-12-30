import { Action, registerMutator } from "services/store/store";
import { AppState } from "state/app.state";

export function action(): Action {
  return {
    name: "END_GAME",
    payload: {}
  }
}

export function mutator(state: AppState, _action: Action): AppState {
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

registerMutator(action().name, mutator);