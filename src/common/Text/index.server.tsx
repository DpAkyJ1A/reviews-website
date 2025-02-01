import React from "react";

import { TextProps } from "./types";

const TextComponent = (props: TextProps): JSX.Element => {
    const {
        tag = 'p',
        id,
        title,
        weight = '400',
        size = 'default',
        color = 'white',
        transform = 'none',
        className,
        onClick,
        children,
        style
    } = props;

    const getSize = () => [`text--${size}`];

    const getWeight = () => {
        const classes = [];
        switch (weight) {
            case '400':
                classes.push('font--400');
                break;
            case '500':
                classes.push('font--500');
                break;
            case '600':
                classes.push('font--600');
                break;
            case '700':
                classes.push('font--700');
                break;
            default:
                break;
        }
        return classes;
    };

    const getColor = () => [`color--${color}`];

    const getTextTransform = () => {
        const classes = [];
        switch (transform) {
            case 'initial':
                classes.push('font--initial');
                break;
            case 'uppercase':
                classes.push('font--uppercase');
                break;
            case 'lowercase':
                classes.push('font--lowercase');
                break;
            case 'capitalize':
                classes.push('font--capitalize');
                break;
            case 'break-line':
                classes.push('font--break-line');
                break;
            default:
                break;
        }
        return classes;
    };

    const setDefaultTextClasses = () => {
        return [
            ...getSize(),
            ...getWeight(),
            ...getColor(),
            ...getTextTransform(),
            className
        ].join(' ');
    };

    return React.createElement(
        tag,
        { onClick, title, className: setDefaultTextClasses(), id, style },
        children
    );
};

export default TextComponent;
