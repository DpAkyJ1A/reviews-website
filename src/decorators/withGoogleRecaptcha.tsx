'use client'
import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const withGoogleRecaptcha = (WrapperComponent: React.FC<any>): React.FC<any> => {
    // eslint-disable-next-line react/display-name
    return (props: any): JSX.Element | null => {
        return (
            <GoogleReCaptchaProvider
                reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY as string}
                scriptProps={{
                    async: false,
                    defer: false,
                    appendTo: "head",
                    nonce: undefined,
                }}
            >
                <WrapperComponent {...props} />
            </GoogleReCaptchaProvider>
        );
    };
};

export default withGoogleRecaptcha;
