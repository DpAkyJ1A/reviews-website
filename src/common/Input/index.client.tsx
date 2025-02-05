'use client'
import { FC, useState, ChangeEvent } from 'react';

// Components
import Icon from '@/common/Icon/index.client';
import Text from '@/common/Text/index.server';

// styles
import styleInput from './index.module.sass';

interface InputInterface {
  index?: number;
  name?: string;
  classNames?: {
    field?: string,
    wrapper?: string,
  }
  disabled?: boolean;
  value?: string | number;
  placeholder?: string;
  onChange?: (name: string, value: string) => void;
  type?: string;
  id?: string;
  label?: string;
  meta?: {
    error?: string;
    touched?: boolean;
  };
  icon?: {
    icon?: string;
    size?: number;
    color?: string;
  };
  currency?: {
    value?: string;
    icon?: string;
  };
  maxLength?: number;
}

const InputComponent: FC<InputInterface> = ({
  index,
  name = '',
  value,
  type,
  placeholder = "",
  classNames: {
    field = '',
    wrapper = ''
  } = {},
  disabled,
  label = '',
  id = "",
  meta,
  onChange,
  maxLength
}): JSX.Element => {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { value = '' } = {} } = event;
    if (maxLength && value.length > maxLength) return;
    onChange && onChange(name, value);
  };
  const { touched, error } = meta || {};

  return (
    <div className={`relative--core ${wrapper || ''}`}>
      {
        label ? (
          <label className={`${styleInput['input__label']} margin--b-6 text--input-label font--600`}>
            {label}
          </label>
        ) : null
      }
      <div className="relative--core">
        <input
          id={id}
          name={name}
          value={value}
          disabled={disabled}
          type={type}
          placeholder={placeholder}
          className={`
          relative--core width--100 padding--v-16 padding--h-18 font--400 ${styleInput.input__field} ${field || ''} ${touched && error ? styleInput['input__field--error'] : ''}
        `}
          onChange={onChangeHandler}
          autoComplete="off"
        />
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
    </div >
  );
};

export default InputComponent;
