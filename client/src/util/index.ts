/**
 * Curry react function component
 * @param Node ( ) => FunctionComponent
 * @returns curried function or React element
 * 
 * usage:
 * 
 * curry( ( ) => MyComponent, 2 )
 * 
 *   ( { color: 'blue' } )
 * 
 *   ( { onClick: ( ) => console.log( 'loaded' ) } )
 */
 const curryNode = (Node: Function, propsLen: Number) => {
    let store = {};
    const curried = (arg: Object) => {
        store = {...store, ...arg};
        return Object.keys(store).length >= propsLen ?
            Node()(store) : (arg2: Object) => curried(arg2);
    }
    return curried;
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

export {curryNode, curry, toGenerator};