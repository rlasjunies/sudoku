import { Store } from "../../services/store/store";

// add a generic reaction, log every action / mutation
export const logFunct = (state: any, _) => console.log("STORE HISTORY:", state.actionName, state);
context: null;

export function registerLogger(store: Store) {
  store.subscribeReaction(logFunct, null);
}
