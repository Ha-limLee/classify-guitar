import React from 'react';
import Tooltip from '../Tooltip';

const withTooltip = (WrappedComponent: React.FunctionComponent) => (text: string) => {
    const Component = (props: {}) => {
        return (
            <Tooltip text={text}>
                <WrappedComponent {...props}/>
            </Tooltip>
        );
    };
    return Component;
}

export default withTooltip;