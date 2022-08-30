import { Request, Response } from "express";
import { Users } from '../models/users';
import * as bcrypt from 'bcrypt';
import * as dotenv from "dotenv";
import path from "path";
import { generateAccessToken, tokenAuthentication } from './tokenFunctions';

dotenv.config({
    path: path.resolve(
        process.env.NODE_ENV === 'production'
            ? '.prod.env' : process.env.NODE_ENV === 'test'
                ? '.test.env' : '.dev.env'
    )
});

const SALT_ROUND  = 4;
const SECRET = String(process.env.JWT_SECRET);

const signController = {
    signup: async (req: Request, res: Response) => {
        const { email, password, nickname } = req.body;
        const emailValidity = await Users.findOne({ where:{ email } });
        const nicknameValidity = await Users.findOne({ where:{ nickname } });

        if (emailValidity) {
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
            const passwordValidity = await bcrypt.compare(password, hashedPassword);

            if (!passwordValidity) {
                res.status(404).json({ message: `Wrong password` });
            } else {
                const accessToken = generateAccessToken(dataValues);
                res.cookie('jwt', accessToken, {
                    httpOnly: true, secure: true, sameSite: 'none'
                }).status(200).json({ data: { accessToken }, message: `Login success with email: ${email}` })
            };
        };
    },

    logout: async (res: Response) => {
        res.clearCookie('accessToken', {
            httpOnly: true, secure: true, sameSite: 'none'
        }).status(200).json({ message: 'Logout success'});
    },

    emailAuthentication: async (req: Request, res: Response) => {

    }
}

export default signController;