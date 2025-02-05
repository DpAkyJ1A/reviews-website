import * as yup from 'yup';

const emailValidation = (validation: { [key: string]: string }): yup.StringSchema<string | undefined> =>
    yup.string().email(validation?.emailError)
        .required(validation?.requiredField)
        .matches(/^[a-zA-Z0-9._-]{5,}@[a-z0-9]+\.[a-z]+$/, { message: validation?.emailError })
        .test('minUsernameLength', (value: string | undefined) => {
            const usernamePart = value?.split('@')[0];
            return !!usernamePart && !/^[_.-]+$/.test(usernamePart);
        });

const phoneValidation = (validation: { [key: string]: string }): yup.StringSchema<string | undefined> => yup
    .string()
    .typeError(validation?.phoneNumberNotValid)
    .matches(/^[0-9+]+$/, validation?.phoneNumberNotValid)
    .min(4, `${validation?.numberCantBeLessThan} 4`)
    .max(16, `${validation?.numberCantBeLongerThan} 16`)
    .required(validation?.fieldIsRequired);

export { emailValidation, phoneValidation };
