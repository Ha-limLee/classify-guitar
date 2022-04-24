/**
 * Curry react function component
 * @param Node ( ) => FunctionComponent
 * @returns curried function or React element
 * 
 * usage:
 * 
 * curry( ( ) => MyComponent )
 * 
 *   ( { color: 'blue' } )
 * 
 *   ( { onClick: ( ) => console.log( 'loaded' ) } )
 */
const curry = (Node: Function) => {
    const nodeStr = Node().toString();
    // e.g. function Node({a, b}) {...}
    // props are interpreted as 'let { a, b }'
    const open: string = 'let {', close: string = '}';
    const begin = nodeStr.indexOf(open);
    const end = nodeStr.indexOf(close);
    const propsLen = nodeStr.substring(begin + open.length, end)
                    .split(',').length;
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