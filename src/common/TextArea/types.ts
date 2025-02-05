export interface TextareaProps {
    name: string;
    disabled?: boolean;
    id?: string;
    value?: string;
    label?: string;
    meta?: {
        error?: string,
        touched?: boolean,
        warning?: string,
    };
    placeholder?: string;
    classNames?: {
        wrapper?: string;
        label?: string;
        field?: string;
    };
    dataCy?: string;
    onChange: (field: string, value: any) => void,
    onBlur?: (value: string) => void,
}
