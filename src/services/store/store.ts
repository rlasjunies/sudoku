interface ObjectCollection<T> {
    [key: string]: T;
}
export type ActionType = string;

export interface Action {
    name: ActionType;
    payload?: any;
}

export interface Mutator {
    actionType: ActionType;
    mutator: (state: ObjectCollection<any>, action: Action) => ObjectCollection<any>;
}

export interface Reaction {
    function: Function;
    context: any;
}
export class Store {
    private _state: ObjectCollection<any>;
    private mutators: Mutator[] = [];
    private reactions: Reaction[] = [];
    private name: string;

    constructor(initialState = {}, name: string) {
        this.name = name;
        this.mutators = mutators;
        this.reactions = [];

        // retrieve from local storage the previous state persisted
        const retrievePreviousState = retrieveInLocalStorage(this.name);
        this._state = (retrievePreviousState !== null) ? retrievePreviousState : initialState;

        console.log("STORE CONSTRUCTED!", this._state);

        // add a generic reaction, log every action / mutation
        this.reactions.push({
            function: (state: any, _) => console.log("STORE HISTORY:", state.actionType, state),
            context: null
        });
    }

    get state() {
        return this._state;
    }

    // registerMutator(actionType: string, mutator: (state: ObjectCollection<any>, action: Action) => ObjectCollection<any>) {
    //     this.mutators.push({
    //         actionType: actionType,
    //         mutator: mutator
    //     });
    //     return this;
    // }

    dispatch(action: Action) {
        this._state = this.mutate(this._state, action);
        this._state.actionType = action.name;
        persist(this._state, this.name);
        this.reactions.forEach(reaction => reaction.function.call(reaction.context, this._state));
    }

    private mutate(state: ObjectCollection<any>, action: Action) {

        const mutator = this.mutators.filter(m => {
            if (m.actionType === action.name) return m;
        });

        // console.log("mutator:", mutator, "state:", state);
        if (mutator.length > 0) return mutator[0].mutator(state, action);
        return state;
    }
    subscribeReaction(reactionFunction: Function, reactionThis: any) {
        this.reactions = [...this.reactions, { function: reactionFunction, context: reactionThis }];
        reactionFunction.call(reactionThis, this._state, reactionThis);
        return () => {
            this.reactions = this.reactions.filter(reaction => reaction.function !== reactionFunction);
        };
    }
}

function persist(state: any, key: string) {
    if (typeof localStorage != 'undefined') {
        localStorage.setItem(key, JSON.stringify(state));
    } else {
        console.log("no localstorage");
    }
}

function retrieveInLocalStorage(key: string): any {
    if (typeof localStorage != 'undefined') {
        let storePersisted = localStorage.getItem(key);
        if (storePersisted !== null) storePersisted = JSON.parse(storePersisted);
        return storePersisted;
    } else {
        console.log("no localstorage");
    }
}

let mutators: Mutator[] = [];
export function registerMutator(actionType: string, mutator: (state: ObjectCollection<any>, action: Action) => ObjectCollection<any>) {
    mutators.push({
        actionType: actionType,
        mutator: mutator
    });
    return this;
}