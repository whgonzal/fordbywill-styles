import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail, sendSms } from "@/lib/messaging/send";

const Body = z.object({
  token: z.string().optional().default(""),
  kind: z.string().optional().default("general"),
  vehicleId: z.string().optional(),
  vehicleTitle: z.string().optional(),
  vin: z.string().optional(),
  stockNumber: z.string().optional(),
  price: z.number().optional(),
  name: z.string().min(1),
  phone: z.string().min(5),
  email: z.string().optional().default(""),
  message: z.string().optional().default(""),
  sourcePage: z.string().optional().default("")
});

export async function POST(req: Request) {
  try {
    const expectedToken = process.env.INQUIRY_FORM_TOKEN;
    const data = Body.parse(await req.json());
    if (expectedToken && data.token !== expectedToken) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.LEAD_TO_EMAIL) throw new Error("Missing LEAD_TO_EMAIL");

    const subject = data.vehicleTitle ? `New Lead: ${data.vehicleTitle}` : "New Lead: FordbyWill.com";
    const email = [
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Email: ${data.email}`,
      `Vehicle: ${data.vehicleTitle ?? ""}`,
      `Stock: ${data.stockNumber ?? ""}`,
      `VIN: ${data.vin ?? ""}`,
      `Price: ${data.price ?? ""}`,
      `Source: ${data.sourcePage}`,
      "",
      "Message:",
      data.message || "(none)"
    ].join("\n");

    await sendEmail(process.env.LEAD_TO_EMAIL, subject, email, data.email || undefined);

    if (process.env.LEAD_TO_PHONE) {
      await sendSms(
        process.env.LEAD_TO_PHONE,
        `Lead: ${data.name} (${data.phone})\n${data.vehicleTitle ?? ""}\n${data.message ?? ""}`.slice(0, 1500)
      );
    }

    // Auto-reply to customer
    await sendSms(
      data.phone,
      `Hey ${data.name.split(" ")[0]} — this is Will. Got your message. I’ll reply ASAP.`
    );

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, message: e?.message ?? "Failed" }, { status: 400 });
  }
}
