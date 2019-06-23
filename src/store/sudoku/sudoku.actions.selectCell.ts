import { Action } from "../../services/store/store";
import { AppState} from '../../store//app.state';
import { store } from '../../store//appStore';

export function action(cell: number): Action {
  return {
    name: "SELECT_CELL",
    payload: { cellSelected: cell }
  }
}

export function reducer(state: AppState, action: Action): AppState {
  const cellSelected = action.payload.cellSelected;
  return {
    ...state,
    sudokuPage: {
      ...state.sudokuPage,
      cellSelected: cellSelected
    }
  }
}

store.registerReducer("SELECT_CELL", reducer);