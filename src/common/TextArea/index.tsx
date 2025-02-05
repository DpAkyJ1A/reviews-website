import React, { useState } from 'react';
import { TextareaProps } from './types';
import Icon from '@/common/Icon/index.client';
import Text from '../Text/index.server';
import styles from './textarea.module.sass';

const TextAreaComponent = (props: TextareaProps): JSX.Element => {
    const {
        value,
        name,
        id,
        meta,
        label,
        disabled,
        placeholder,
        classNames: {
            label: labelClass = '',
            wrapper: wrapperClass = '',
            field: fieldClass = ''
        } = {},
        onChange
    } = props;
    const { touched, error, warning } = meta || {};

    const classList = [fieldClass, styles.textarea, ...(touched && (error || warning) ? [styles['textarea--error']] : [])].join(' ');

    const onChangeValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(name, event?.currentTarget?.value);
    };

    return (
        <div className={`fl ${wrapperClass} fl--dir-col width--100 relative--core`}>
            {
                label ? (
                    <label className={`${styles['textarea__label']} margin--b-6 text--input-label font--600`}>
                        {label}
                    </label>
                ) : null
            }
            <div className="width--100 fl">
                <textarea
                    id={id}
                    name={name}
                    value={value}
                    className={classList}
                    onChange={onChangeValue}
                    disabled={disabled}
                    placeholder={placeholder}
                />
            </div>
            {
                touched && error ? (
                    <Text
                        size="small"
                        color="error"
                        className="margin--t-8"
                    >
                        {error}
                    </Text>
                ) : null
            }
        </div>
    );
};

export default TextAreaComponent;
