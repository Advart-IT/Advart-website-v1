import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: process.env.MAIL_SECURE === "true",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      subject: "New Inquiry from Contact Form",
      html: `
        <h3>Contact Form Details</h3>
        <p><strong>Name:</strong> ${body.firstName}</p>
        <p><strong>Business:</strong> ${body.business}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Service:</strong> ${body.reason}</p>
        <p><strong>Message:</strong><br>${body.message || "-"}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("MAIL ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send mail" },
      { status: 500 }
    );
  }
}
