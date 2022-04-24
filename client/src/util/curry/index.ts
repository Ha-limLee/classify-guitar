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
const curry = (Node: Function, propsLen: Number) => {
    const nodeStr = Node().toString();
    let store = {};
    return function curried(arg: Object) {
        store = {...store, ...arg};
        if (Object.keys(store).length >= propsLen)
            return Node()(store);
        else
            return (arg2: Object) => curried(arg2);
    }
}

export default curry;