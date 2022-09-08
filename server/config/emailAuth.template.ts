import * as nodemailer from 'nodemailer';

export const smtpTransport = nodemailer.createTransport({
  service: '',
  auth: {
    user: '',
    pass: '',
  },
  tls: {
    // rejectUnauthorized: boolean,
  },
});
