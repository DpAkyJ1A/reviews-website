'use client'
import { IconType } from './types';
import iconCompose from '../../icons';

const Icon = (props: IconType): JSX.Element => {
    const {
        icon = '',
        size = '100%',
        color = '',
        fill = '',
        stroke = '',
        fullWidth = false,
        title = '',
        onClick,
        classNames: {
            wrapper: wrapperClass = '',
            icon: iconClass = ''
        } = {}
    } = props;
    const { 0: type, 1: alias } = icon?.split('/');
    const IconComponent = (iconCompose as any)?.[type]?.[alias];

    return (
        <div 
            role="button"
            title={title}
            tabIndex={-1} 
            onClick={onClick} 
            className={`${wrapperClass || ''} fl fl--align-c fl--justify-c ${fullWidth ? 'width--100 height--100' : ''}`}
        >
            {
                IconComponent ? (
                    <IconComponent
                        className={`${iconClass} ${color ? `color--${color}` : ''} ${fill ? `fill--${fill}` : ''} ${stroke ? `stroke--${stroke}` : ''}`} 
                        width={(size as { width: number })?.width || size} 
                        height={(size as { height: number })?.height || size}
                    />
                ) : null
            }
        </div>
    );
};

export default Icon;
