import React from 'react';
import Tooltip from '../Tooltip';

interface TextProps {
    text: string;
}

const withTooltip = <P extends {}>(WrappedComponent: React.ComponentType<P>): React.FC<TextProps & P> => {
    const Component = ({text, ...props}: TextProps) => {
        return (
            <Tooltip text={text}>
                <WrappedComponent {...(props as P)}/>
            </Tooltip>
        );
    };
    return Component;
}

export default withTooltip;