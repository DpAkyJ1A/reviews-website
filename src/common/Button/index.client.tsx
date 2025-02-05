import { ButtonType } from './types';
import buttonStyle from './index.module.sass';
import Icon from '../Icon/index.client';

const Button = (props: ButtonType): JSX.Element => {
    const {
        id,
        type = 'primary',
        htmlType = 'button',
        children,
        className = '',
        disabled,
        onClick = () => null,
        style,
        withArrow = false
    } = props;

    return (
        <button
            id={id}
            style={style}
            className={`${buttonStyle.button} ${buttonStyle[`button--${type}`]} ${className || ''} fl fl--align-c fl--justify-c font--500 cursor--pointer padding--v-16 padding--h-32`}
            type={htmlType}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
