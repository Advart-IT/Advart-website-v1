import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import escape from "escape-html";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    /* ---------- VALIDATION ---------- */
    if (
      !body.firstName?.trim() ||
      !body.email?.trim() ||
      !body.phone?.trim() ||
      !body.reason?.trim()
    ) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    if (
      typeof body.firstName !== "string" ||
      typeof body.email !== "string" ||
      typeof body.phone !== "string" ||
      typeof body.reason !== "string"
    ) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    if (
      body.firstName.length > 100 ||
      body.email.length > 200 ||
      body.phone.length > 20 ||
      body.reason.length > 50 ||
      body.message?.length > 2000
    ) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    // Prevent email header injection
    if (/[\r\n]/.test(body.email)) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    // Payload size protection
    if (JSON.stringify(body).length > 3000) {
      return NextResponse.json({ success: false }, { status: 413 });
    }

    /* ---------- SANITIZATION ---------- */
    const firstName = escape(body.firstName);
    const business = escape(body.business || "-");
    const email = escape(body.email);
    const phone = escape(body.phone);
    const reason = escape(body.reason);
    const message = escape(body.message || "-");

    /* ---------- MAIL ---------- */
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
      replyTo: email,
      subject: `New Inquiry - ${reason}`,
      html: `
        <h2>Contact Form Inquiry</h2>
        <p><strong>Name:</strong> ${firstName}</p>
        <p><strong>Business:</strong> ${business}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${reason}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    console.error("CONTACT_API_ERROR");
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
