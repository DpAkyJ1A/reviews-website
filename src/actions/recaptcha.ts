import axios from "axios";

async function checkReCaptcha(gReCaptchaToken: string): Promise<boolean> {
  try {
    const {
      data: {
        success
      }
    } = await axios('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: `secret=${process.env.GOOGLE_RECAPTCHA_SECRET}&response=${gReCaptchaToken}`
    });

    return success;
  } catch (error) {
    return false;
  }
}

export { checkReCaptcha };
