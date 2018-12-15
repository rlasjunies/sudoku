import { AppAction } from "../app.actions";
import { SudokuPageState } from "./sudoku.state";
import { SudokuAction } from "./sudoku.actions";

export function timerStartAction(): AppAction {
  return {
    type: "TIMER_START",
    payload: {}
  }
}
export function timerPauseAction(): AppAction {
  return {
    type: "TIMER_PAUSE",
    payload: {}
  }
}
export function timerResumeAction(): AppAction {
  return {
    type: "TIMER_RESUME",
    payload: {}
  }
}
export function timerTickAction(): AppAction {
  return {
    type: "TIMER_TICK",
    payload: { }
  }
}

export function timerReducer(state: SudokuPageState, _action: SudokuAction): SudokuPageState {

  switch (_action.type) {
    case "TIMER_START": {
      return {
        ...state,
        timerOn: true,
        timer: 0
      }
    };
    case "TIMER_TICK": {
      return {
        ...state,
        timer: state.timer + 1
      }
    };
    case "TIMER_PAUSE": {
      return {
        ...state,
        timerOn: false
      }
    }
    case "TIMER_RESUME": {
      return {
        ...state,
        timerOn: true
      }
    }
  }

  // return the state if no action reducer is identified
  return state;
}