import * as React from "react";
import CSS from 'csstype';

export interface ButtonType {
    id?: string;
    type?: 'primary' | 'secondary';
    children: React.ReactNode;
    style?: CSS.Properties;
    className?: string;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    htmlType?: 'button' | 'submit' | 'reset';
    withArrow?: boolean;
}
