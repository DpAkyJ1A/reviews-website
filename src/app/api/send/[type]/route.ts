// import { checkReCaptcha } from "@/actions/recaptcha";
import { NextRequest, NextResponse } from "next/server";
import formData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY as string,
});

const topics = {
  contact: {
    title: "New request from website!",
  },
};

export async function POST(req: NextRequest, { params }: { params: { type: string } }) {
  try {
    const { type } = params;
    const { ...creds } = await req.json();

    // const result = await checkReCaptcha(gReCaptchaToken);
    // if (!result) throw new Error("Invalid reCAPTCHA");

    await mg.messages.create(process.env.MAILGUN_DOMAIN as string, {
      from: `Reviews <${process.env.MESSAGING_USER}@${process.env.MAILGUN_DOMAIN}>`,
      to: process.env.ADMIN_EMAIL,
      subject: topics?.[type]?.title || "New Message",
      text: Object.values(creds).join("\n"),
    });

    return NextResponse.json(true);
  } catch (e) {
    console.error("Mail sending error:", e);
    return NextResponse.json({ message: "Could not send email." }, { status: 500 });
  }
}
