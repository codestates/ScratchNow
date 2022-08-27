import express, { Request, Response } from "express";
import { Users } from '../models/users';
import { sign, verify } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve(
        process.env.NODE_ENV === 'production'
            ? '.prod.env' : process.env.NODE_ENV === 'test'
                ? '.test.env' : '.dev.env'
    )
});

const SALT_ROUND  = 4;
const SECRET = String(process.env.JWT_SECRET);

const signHandler = {
    signup: async (req: Request, res: Response) => {
        const { email, password, nickname } = req.body;
        const userinfo = await Users.findOne({ where:{ email } });
        const nicknameValidity = await Users.findOne({ where:{ nickname } });

        if (userinfo) {
            res.json({ message: 'Email already exists' });
        } else if (nicknameValidity) {
            res.json({ message: 'Nickname already exists' });
        } else {
            const salt = await bcrypt.genSalt(SALT_ROUND);
            const hashedPassword = await bcrypt.hash(password, salt);

            await Users.create({email, password: hashedPassword, nickname})
                .then((data) => {
                    res.status(201).json({ message: `Created the user ${nickname}` });
            });
        };
    },

    login: async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const userinfo = await Users.findOne({ where:{ email } });

        if (!userinfo) {
            res.status(404).json({ message: `No user data with email: ${email}` });
        } else {
            const dataValues = userinfo.get({ plain: true });
            const hashedPassword = dataValues.password;
            const checkPassword = await bcrypt.compare(password, hashedPassword);

            if (!checkPassword) {
                res.status(404).json({ message: `Wrong password` });
            } else {
                const accessToken = sign(dataValues, SECRET, {expiresIn: '24h'});
                await res.cookie('jwt', accessToken, {
                    httpOnly: true, secure: true, sameSite: 'none'
                }).status(200).json({ data: { accessToken }, message: `Login success with email: ${email}` })
            };
        };
    },

    logout: async (req: Request, res: Response) => {
        // res.clearCookie('accessToken', {
        //     httpOnly: true, secure: true, sameSite: 'none'
        // }).status(200).json({ message: 'Logout success'});
    },

    tokenAuthentication: (req: Request) => {
        const cookie = req.cookies;

        if (!cookie) {
            return null;
        }
        try {
            const token = cookie.jwt;
            return verify(token, SECRET);
        } catch (err) {
            return null;
        };
    },

    emailAuthentication: async (req: Request, res: Response) => {

    }
}

export default signHandler;