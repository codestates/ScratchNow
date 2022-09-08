import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import path from 'path';
import { smtpTransport } from '../config/emailAuth';

dotenv.config({
  path: path.resolve(
    process.env.NODE_ENV === 'production'
      ? '.prod.env'
      : process.env.NODE_ENV === 'test'
      ? '.test.env'
      : '.dev.env',
  ),
});

const SECRET = String(process.env.JWT_SECRET);

export const generateAccessToken = (data: object) => {
  return sign(data, SECRET, { expiresIn: '12h' });
};

export const tokenAuthentication = (req: Request) => {
  const token = req.headers.authorization;

  if (!token) return null;

  try {
    return verify(token, SECRET);
  } catch (err) {
    return null;
  }
};

export const sendAuthNumber = async (email: string, res: Response) => {
  const authNumber = Math.floor(Math.random() * 888888) + 111111;

  const mailOptions = {
    from: 'ScratchNow Team',
    to: email,
    subject: '[ScratchNow] 이메일 확인 인증번호 안내',
    text: `아래 인증번호를 확인하여 이메일 주소 인증을 완료해 주세요.\n
    연락처 이메일 👉 ${email}\n
    인증번호 6자리 👉 ${authNumber}`,
  };

  smtpTransport.sendMail(mailOptions, (error, responses) => {
    if (error) {
      res.status(500).json({
        message: `Failed to send authentication email to ${email}`,
      });
    } else {
      res.status(200).json({
        authNumber,
        message: `Authentication mail is sent to ${email}`,
      });
    }
    smtpTransport.close();
  });
};
