
interface ObjectCollection<T> {
    [key: string]: T;
}

export type actionName = string;

export interface Action {
    name: actionName;
    payload?: any;
}

export interface reducer {
    actionName: actionName;
    reducer: (state: ObjectCollection<any>, action: Action) => ObjectCollection<any>;
}
// export interface SideEffect {
//     name: string;
//     effect: (previousState: ObjectCollection<any>, tempState: ObjectCollection<any>, action: Action) => ObjectCollection<any>;
// }

export interface Reaction {
    function: Function;
    context: any;
}
export class Store {
    private _state: ObjectCollection<any>;
    private reducers: reducer[] = [];
    // private sideEffects: SideEffect[] = [];
    private reactions: Reaction[] = [];
    private name: string;

    constructor(initialState = {}, name: string) {
        this.name = name;

        // retrieve from local storage the previous state persisted
        const retrievePreviousState = retrieveStateFromLocalStorage(this.name);
        this._state = (retrievePreviousState !== null) ? retrievePreviousState : initialState;
        this._state.actionName = "STORE_INIT"
        // console.log("STORE CONSTRUCTED!", this._state);
    }

    get state() {
        return this._state;
    }

    registerReducer(actionName: string, reducer: (state: ObjectCollection<any>, action: Action) => ObjectCollection<any>) {
        this.reducers.push({
            actionName: actionName,
            reducer: reducer
        });
        return this;
    }
    private reduce(state: ObjectCollection<any>, action: Action) {

        const reducer = this.reducers.filter(reducer => {
            if (reducer.actionName === action.name) return reducer;
        });

        if (reducer.length > 0) return reducer[0].reducer(state, action);
        console.warn("NO REDUCER FOUND", action.name); 
        return state;
    }

    // registerSideEffect( name: string,
    //                     effect: (previousState: ObjectCollection<any>, tempState: ObjectCollection<any>, action: Action) => ObjectCollection<any>) {
    //     this.sideEffects.push({
    //         name: name,
    //         effect: effect
    //     });
    //     return this;
    // }

    // private sideEffectMutation(previousState: ObjectCollection<any>, tempState: ObjectCollection<any>, action: Action) {
    //     let tmpState: ObjectCollection<any> = tempState;

    //     for (let index = 0; index < this.sideEffects.length; index++) {
    //         const sideEffect = this.sideEffects[index];
    //         tmpState = sideEffect.effect(previousState, tempState, action);
    //     }
    //     return tmpState;
    // }

    dispatch(action: Action) {
        // mutate the state
        // const tempState = this.reduce(this._state, action);
        // tempState.actionName = action.name;

        // apply side effects
        // this._state = this.sideEffectMutation(this._state, tempState, action);

        this._state = this.reduce(this._state, action);
        this._state.actionName = action.name;
        persistStateInLocalStorage(this._state, this.name);

        this.reactions.forEach(reaction => reaction.function.call(reaction.context, this._state));

    }

    subscribeReaction(reactionFunction: Function, reactionThis: any) {
        this.reactions = [...this.reactions, { function: reactionFunction, context: reactionThis }];
//        console.log("subscribeReaction",reactionFunction);
        reactionFunction.call(reactionThis, this._state, reactionThis);
        return () => {
            this.reactions = this.reactions.filter(reaction => reaction.function !== reactionFunction);
        };
    }
}

function persistStateInLocalStorage(state: any, key: string) {
    if (typeof localStorage != 'undefined') {
        localStorage.setItem(key, JSON.stringify(state));
    } else {
        console.log("no localstorage");
    }
}

function retrieveStateFromLocalStorage(key: string): any {
    if (typeof localStorage != 'undefined') {
        let storePersisted = localStorage.getItem(key);
        if (storePersisted !== null) storePersisted = JSON.parse(storePersisted);
        return storePersisted;
    } else {
        console.log("no localstorage");
    }
}
