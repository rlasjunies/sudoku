import { Action, registerMutator } from "services/store/store";
import { AppState } from "state/app.state";

export function action(cell: number): Action {
  return {
    name: "CELL_SELECTED",
    payload: { cellSelected: cell }
  }
}

export function mutator(state: AppState, action: Action): AppState {
  const cellSelected = action.payload.cellSelected;
  return {
    ...state,
    sudokuPage: {
      ...state.sudokuPage,
      cellSelected: cellSelected
    }
  }
}

registerMutator("CELL_SELECTED", mutator);