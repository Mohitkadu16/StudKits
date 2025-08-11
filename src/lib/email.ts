'use server';

import { cache } from 'react';
import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

// Cache the transporter creation
const createTransporter = cache(() => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    pool: true,
    maxConnections: 5,
    maxMessages: Infinity,
  });
});

export async function sendEmailOptimized(options: EmailOptions) {
  const transporter = createTransporter();
  
  try {
    await transporter.sendMail({
      from: `"StudKits Contact" <${process.env.EMAIL_USER}>`,
      ...options
    });
    
    return { success: true, message: 'Email sent successfully!' };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to send email'
    };
  }
}
