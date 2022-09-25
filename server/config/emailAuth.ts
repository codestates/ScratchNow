import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

export const smtpTransport = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
