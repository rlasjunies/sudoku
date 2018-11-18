export type ActionType = string;
export interface Action {
    type: ActionType;
    payload?: any;
}

export interface Reaction {
    function: Function;
    context: any;
}
export class Store {
    private _state: { [key: string]: any };
    private reducers: { [key: string]: Function };
    private reactions: Reaction[];

    constructor(reducers = {}, initialState = {}) {
        this.reducers = reducers;
        this.reactions = [];
        const retrievePreviousState = retrieve();
        const storedOrInitState = (retrievePreviousState !== null) ? retrievePreviousState : initialState; 
        this._state = this.reduce(storedOrInitState, {});
        console.log("STORE CONSTRUCTED!", this._state);
        this.reactions.push({
            function: (state, _) => console.log("STORE HISTORY:", state.actionType, state),
            context: null
        });
    }

    get state() {
        return this._state;
    }

    dispatch(action: Action) {
        this._state = this.reduce(this._state, action);
        this._state.actionType = action.type;
        persist(this._state);
        this.reactions.forEach(reaction => reaction.function(this._state, reaction.context));
    }

    private reduce(state, action) {
        const newState = {};
        for (const prop in this.reducers) {
            newState[prop] = this.reducers[prop](state[prop], action);
        }
        return newState;
    }

    // subscribeReaction(fn: Function) {
    //     this.reactions = [...this.reactions, fn];
    //     fn(this.value);
    //     return () => {
    //         this.reactions = this.reactions.filter(sub => sub !== fn);
    //     };
    // }

    subscribeReaction(reactionFunction: Function, reactionThis: any) {
        this.reactions = [...this.reactions, { function: reactionFunction, context: reactionThis }];
        reactionFunction(this._state, reactionThis);
        return () => {
            this.reactions = this.reactions.filter(reaction => reaction.function !== reactionFunction);
        };
    }
}

function persist(state: any){
    if (typeof localStorage != 'undefined') {
        localStorage.setItem('accurentis-sudoku', JSON.stringify(state));
    } else {
        console.log("no localstorage");
    }
}

function retrieve():any{
    if (typeof localStorage != 'undefined') {
        let storePersisted = localStorage.getItem('accurentis-sudoku');
        if (storePersisted!== null ) storePersisted = JSON.parse(storePersisted);
        return storePersisted;
    } else {
        console.log("no localstorage");
    }
}
