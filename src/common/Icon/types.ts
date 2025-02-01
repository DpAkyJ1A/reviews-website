export interface IconType {
    size?: number | { height: number, width: number };
    color?: string;
    fill?: string;
    stroke?: string;
    fullWidth?: boolean;
    classNames?: {
        wrapper?: string;
        icon?: string;
    };
    title?: string;
    icon: string;
    onClick?: () => void
}
