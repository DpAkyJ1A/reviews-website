'use client';
import React, { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { toast } from 'react-toastify';

// Components
import Input from '@/common/Input/index.client';
import TextAreaComponent from '@/common/TextArea';
import Button from '@/common/Button/index.client';

// Decorators
import withGoogleRecaptcha from '@/decorators/withGoogleRecaptcha';

import { phoneValidation } from '@/helpers/yup.hl';

// Styles
import styles from '../../index.module.sass';

interface IProps {
  buttonText: string;
}

const validation = {
  fieldIsRequired: 'This field is required',
  emailIsNotCorrect: 'Email is invalid',
  phoneNumberNotValid: 'Phone number is not valid',
  numberCantBeLessThan: 'Phone number cannot be shorter than',
  numberCantBeLongerThan: 'Phone number cannot be longer than'
}

const Form = (props: IProps) => {
  const {
    buttonText = ''
  } = props;

  const {
    fieldIsRequired = '',
    emailIsNotCorrect = '',
    phoneNumberNotValid = ''
  } = validation

  const [isLoading, setIsLoading] = useState(false);
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const schema = Yup.object().shape({
    name: Yup.string().required(fieldIsRequired),
    phone: phoneValidation(validation),
    email: Yup.string().email(emailIsNotCorrect).required(fieldIsRequired),
    message: Yup.string().required(fieldIsRequired)
  });

  const handlerSubmit = async () => {
    setIsLoading(true);
    if (!executeRecaptcha) return;
    executeRecaptcha("enquiryFormSubmit").then(async (gReCaptchaToken) => {
      try {
        await axios({
          url: `${location?.origin}/api/send/contact`,
          method: 'POST',
          data: {
            gReCaptchaToken,
            ...values
          }
        });
        toast("Message has been sent!");
        resetForm();
      } catch (error: any) {
        toast("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    })
  };

  const {
    values,
    values: {
      name = '',
      phone = '',
      email = '',
      message = ''
    },
    handleSubmit,
    resetForm,
    setFieldValue,
    errors,
    isValid,
    touched,
    dirty
  } = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      message: ''
    },
    validationSchema: schema,
    validateOnChange: validateAfterSubmit,
    onSubmit: handlerSubmit
  });

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.contact__form}
    >
      <Input
        label="Name*"
        name="name"
        value={name}
        onChange={setFieldValue}
        meta={{
          error: errors?.name,
          touched: touched?.name
        }}
        classNames={{
          wrapper: "fl--1"
        }}
      />
      <div className={styles.contact__row}>
        <Input
          label="Phone*"
          name="phone"
          value={phone}
          onChange={setFieldValue}
          meta={{
            error: errors?.phone,
            touched: touched?.phone
          }}
          classNames={{
            wrapper: "fl--1"
          }}
        />
        <Input
          label="Email*"
          name="email"
          value={email}
          onChange={setFieldValue}
          meta={{
            error: errors?.email,
            touched: touched?.email
          }}
          classNames={{
            wrapper: "fl--1"
          }}
        />
      </div>
      <TextAreaComponent
        label="Message*"
        name="message"
        value={message}
        onChange={setFieldValue}
        meta={{
          error: errors?.message,
          touched: touched?.message
        }}
        classNames={{
          wrapper: "fl--1"
        }}
      />
      <Button
        htmlType="submit"
        disabled={!isValid || !dirty}
        className={`${styles.contact__button} width--100`}
        onClick={() => {
          setValidateAfterSubmit(true);
        }}
      >
        {buttonText}
      </Button>
    </form>
  );
};

export default withGoogleRecaptcha(Form);
