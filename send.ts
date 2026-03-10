import nodemailer from "nodemailer";
import twilio from "twilio";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export async function sendEmail(to: string, subject: string, text: string, replyTo?: string) {
  const host = requireEnv("SMTP_HOST");
  const port = Number(requireEnv("SMTP_PORT"));
  const secure = (process.env.SMTP_SECURE ?? "true") === "true";
  const user = requireEnv("SMTP_USER");
  const pass = requireEnv("SMTP_PASS");
  const from = process.env.SMTP_FROM ?? user;

  const transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } });
  await transporter.sendMail({ from, to, subject, text, replyTo });
}

export async function sendSms(to: string, body: string) {
  const sid = requireEnv("TWILIO_ACCOUNT_SID");
  const token = requireEnv("TWILIO_AUTH_TOKEN");
  const from = requireEnv("TWILIO_FROM_NUMBER");
  const client = twilio(sid, token);
  await client.messages.create({ from, to, body: body.slice(0, 1500) });
}
