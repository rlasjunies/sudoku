describe('empty suite', () => {
  it('fake test', () => {
    expect(true).toBeTruthy();
  });
});

// import { Store, Action } from "./store";
// import 'jest-localstorage-mock';

// // todo-interface, actions
// export interface TodoAction extends Action {
//     type: "ADD_TODO",
//     payload: ITodo
// }

// interface ITodo {
//     label: string;
//     complete: boolean;
// }

// // todo-reducers
// export interface ITodoState {
//     data: ITodo[],
//     loaded: boolean,
//     loading: boolean,
// }

// export const todoInitialState: ITodoState = {
//     data: [],
//     loaded: false,
//     loading: false
// };

// export function todoReducer(state: ITodoState = todoInitialState, action: TodoAction) {
//     switch (action.type) {
//         case 'ADD_TODO': {
//             const todo = action.payload;
//             const todos = [...state.data, todo];
//             return {
//                 ...state,
//                 todos,
//             };
//         }
//     }

//     // return the state if no action reducer is identified
//     return state;
// }

// const store = new Store({ todos: todoReducer }, { todos: todoInitialState }, "nameofstore");

// it('should initiate the store', () => {

//      // values stored in tests will also be available in other tests unless you run
//     // localStorage.clear();
//     // or directly reset the storage
//     // localStorage.__STORE__ = {};
//     // // // you could also reset all mocks, but this could impact your other mocks
//     // jest.resetAllMocks();
//     // // or individually reset a mock used
//     // localStorage.setItem.mockClear();

//     // initialstate is good
//     // FIXME: mock local storage 
//     expect(store.state).toEqual({ todos: todoInitialState });
//     // expect(true).toBeTruthy;
// });

// it('should call subscriber at subscription', () => {
//     const subscriberMock = jest.fn( _ => true);

//     store.subscribeReaction(subscriberMock, null)

//     expect(subscriberMock.mock.calls.length).toBe(1);
// });

// it('should call subscriber when a action is dispactched', () => {
//     const subscriberMock = jest.fn( _ => true);
//     store.subscribeReaction(subscriberMock, null)
//     subscriberMock.mock.calls = []; // clean the calls

//     const actionAddTodo: TodoAction = {
//         type: 'ADD_TODO',
//         payload: { label: 'Listen music', complete: false }
//     }

//     // subcribers are call on action
//     store.dispatch(actionAddTodo);
//     expect(subscriberMock.mock.calls.length).toBe(1);
// });

// it('should call not call subscriber when unsubscribe and action dispatched', () => {
//     const subscriberMock = jest.fn( _ => true);
//     const unsubscribe = store.subscribeReaction(subscriberMock, null)
//     subscriberMock.mock.calls = []; // clean the calls
    
//     const actionAddTodo: TodoAction = {
//         type: 'ADD_TODO',
//         payload: { label: 'Listen music', complete: false }
//     }
    
//     // subcribers are call on action
//     store.dispatch(actionAddTodo);
//     expect(subscriberMock.mock.calls.length).toBe(1);
//     subscriberMock.mock.calls = []; // clean the calls

//     // subsciber not called if unsubscribed
//     unsubscribe();
//     store.dispatch(actionAddTodo);
//     expect(subscriberMock.mock.calls.length).toBe(0);

// });