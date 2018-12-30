import { Action, registerMutator } from "services/store/store";
import { AppState } from "state/app.state";

export function action(): Action {
  return {
    name: "BOARD_SOLVED",
    payload: {}
  }
}

export function mutator(state: AppState, _action: Action): AppState {
  return {
    ...state,
    sudokuPage: {
      ...state.sudokuPage,
      cellSelected: -1,
      gameOnGoing: false
    }
  }
}

registerMutator("CELL_SELECTED", mutator);