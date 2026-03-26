import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { admin } from '@/lib/firebase-admin';
import { getAuth } from 'firebase-admin/auth';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // 1. Generate the verification link using Firebase Admin SDK
    const link = await getAuth(admin).generateEmailVerificationLink(email);

    // Get the base application URL for absolute asset paths
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.studkits.shop';

    // 2. Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
          rejectUnauthorized: false
      }
    });

    // 3. Define the custom HTML Email Template
    const mailOptions = {
      from: process.env.SMTP_FROM || '"StudKits Support" <support@studkits.com>',
      to: email,
      subject: 'Verify your email address for StudKits',
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Verify Your Email – StudKits</title>
</head>

<body style="margin:0; padding:0; background-color:#0A0D1A; font-family:Arial, Helvetica, sans-serif; color:#E0E4ED;">

<!-- OUTER WRAPPER -->
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0D1A; padding:24px;">
  <tr>
    <td align="center">

      <!-- MAIN CARD -->
      <table width="600" cellpadding="0" cellspacing="0"
        style="
          background:rgba(23, 37, 84, 0.7);
          border-radius:16px;
          border:1px solid rgba(255,255,255,0.1);
          box-shadow:0 20px 40px rgba(0,0,0,0.5);
        ">

        <!-- ================= HEADER ================= -->
        <tr>
          <td style="padding:24px; text-align:center; border-bottom:1px solid rgba(255,255,255,0.1);">
           <!-- Small Logo Wrapper -->
<div style="
  display:inline-block;
  padding:10px 12px;
  border-radius:12px;
  background:rgba(255,255,255,0.08);
  border:1px solid rgba(255,255,255,0.15);
  box-shadow:0 6px 18px rgba(0,0,0,0.35);
  margin-bottom:10px;
">
  <img src="${appUrl}/images/studkits%20logo_converted.webp"
       alt="StudKits Logo"
       width="64"
       style="
         display:block;
         border-radius:8px;
       ">
</div>
            <h1 style="margin:0; font-size:22px; color:#1769F7;">Verify Your Email</h1>
          </td>
        </tr>

        <!-- ================= GREETING & BODY ================= -->
        <tr>
          <td style="padding:24px;">
            <p style="font-size:16px; margin:0;">
              Hi there,
            </p>
            <p style="margin-top:16px; font-size:15px; line-height:1.6; color:#B0B8C8;">
              Thank you for creating an account with <b>StudKits</b> 💙<br><br>
              Before you can place an order for custom robotics parts or access the marketplace, we just need to verify that this is your correct email address.
            </p>
          </td>
        </tr>

        <!-- ================= CTA BUTTON ================= -->
        <tr>
          <td style="padding:24px; background:rgba(255,255,255,0.04); text-align:center;">
            <div style="text-align:center; margin-bottom: 24px;">
              <a href="${link}"
                 style="
                   background:linear-gradient(135deg,#1769F7,#0DAEE7);
                   color:#ffffff;
                   padding:14px 28px;
                   border-radius:8px;
                   text-decoration:none;
                   display:inline-block;
                   font-size: 16px;
                   font-weight:bold;
                 ">
                Verify Email Now
              </a>
            </div>
            <p style="color:#777; font-size:12px; line-height:1.5;">
              Or copy and paste this link manually into your browser:<br>
              <code style="word-break: break-all; color:#0DAEE7;">${link}</code>
            </p>
          </td>
        </tr>

        <!-- ================= FOOTER ================= -->
        <tr>
          <td style="padding:20px; text-align:center; font-size:12px; border-top:1px solid rgba(255,255,255,0.1);">
            <p style="color:#777; margin-bottom:12px;">If you didn't attempt to create a StudKits account, you can safely ignore this email.</p>
            <p><b>StudKits</b> – Electronics Components & IoT Marketplace</p>

            <p>
              <a href="https://www.instagram.com/studkits.shop/" style="color:#0DAEE7; text-decoration:none;">Instagram</a> ·
              <a href="https://www.linkedin.com/company/studkits/" style="color:#0DAEE7; text-decoration:none;">LinkedIn</a> ·
              <a href="https://www.youtube.com/@studkits-shop/" style="color:#0DAEE7; text-decoration:none;">YouTube</a>
            </p>
          </td>
        </tr>

      </table>
      <!-- END MAIN CARD -->

    </td>
  </tr>
</table>

</body>
</html>
      `,
    };

    // 4. Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Custom verification email sent successfully' });
  } catch (error: any) {
    console.error('Email sending API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error while sending email via SMTP' },
      { status: 500 }
    );
  }
}
