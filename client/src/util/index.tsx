import React from "react";

/**
 * Curry react function component
 * @param Compo FunctionComponent
 * @param props Compo's props
 * @returns curried function or React element
 * 
 * usage:
 * 
 * curryComponent( MyComponent, {color: '', onClick: ''} )
 * 
 *   ( { color: 'blue' } )
 * 
 *   ( { onClick: ( ) => console.log( 'loaded' ) } )
 */
 const curryComponent = <P extends {}>(Compo: React.FunctionComponent<P>, props: {[K in keyof P]: any}) => {
    const propsLen = Object.keys(props).length;
    let store = {};
    const curried = (arg: Object) => {
        if (!Object.keys(arg).every(key => key in props))
            return new Error('Received unexptected args');
        store = {...store, ...arg};
        return Object.keys(store).length >= propsLen ?
            <Compo {...store as P}/> : (arg2: Object) => curried(arg2);
    }
    return curried as CallableFunction;
}

const curry = (fn: Function) => {
    const curried = (...args: Array<any>) =>
        args.length >= fn.length ?
            fn.apply(this, args) : (...args2: Array<any>) => curried.apply(this, args.concat(args2));
    return curried;
}

function* toGenerator(arr: Array<any>){
    for (const x of arr)
        yield x;
}

export {curryComponent, curry, toGenerator};