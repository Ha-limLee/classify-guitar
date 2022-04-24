import React from 'react';
export const Guitar = {
    strat: 'strat',
    tele: 'tele',
    lespaul: 'lespaul',
    sg: 'sg'
} as const;

export type Guitar = typeof Guitar[keyof typeof Guitar];

export type Subset<T> = {
    [K in keyof T]: T[K];
}

export type GuitarState = {[K in Guitar]: string[]};

export type GuitarAction =
    | {type: 'push'; target: Subset<Guitar>; element: React.ReactNode}

function reducer(state: GuitarState, action: GuitarAction){
    switch (action.type){
        case 'push':
            return {
                ...state,
                [action.target]: [...state[action.target], action.element]
            };
        default:
            return state;
    }
}

type GuitarDispatch = React.Dispatch<GuitarAction>;
const GuitarStateContext = React.createContext<GuitarState | null>(null);
const GuitarDispatchContext = React.createContext<GuitarDispatch | null>(null);

export function GuitarProvider({children}: {children: React.ReactNode}){
    const [state, dispatch] = React.useReducer(reducer, {
        strat: [],
        tele: [],
        lespaul: [],
        sg: []
    });
    return (
        <GuitarStateContext.Provider value={state}>
            <GuitarDispatchContext.Provider value={dispatch}>
                {children}
            </GuitarDispatchContext.Provider>
        </GuitarStateContext.Provider>
    );
}

export function useGuitarState(){
    const state = React.useContext(GuitarStateContext);
    if (!state) throw new Error('Cannot find GuitarProvider');
    return state;
}

export function useGuitarDispatch(){
    const dispatch = React.useContext(GuitarDispatchContext);
    if (!dispatch) throw new Error('Cannot find GuitarProvider');
    return dispatch;
}