import * as React from 'react';

export interface TextProps {
    id?: string,
    tag?: string
    title?: string,
    weight?: string,
    size?: string,
    color?: string,
    opaicty?: number,
    transform?: string,
    className?: string,
    children: React.ReactNode,
    onClick?: (props?: any) => any,
    style?: React.CSSProperties
}
