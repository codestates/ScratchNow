import express, {Request, Response} from "express";
import {Users} from '../models/users';
import { sign, verify} from 'crypto';
import * as bcrypt from 'bcrypt';

const signHandler = {
    signup: async (req: Request, res: Response) => {
        const { email, password, nickname } = req.body;
        const emailValidity = await Users.findOne({ where:{ email } });
        const nicknameValidity = await Users.findOne({ where:{ nickname } });

        if (emailValidity) {
            res.json({ message: 'Email Exists' });
        } else if (nicknameValidity) {
            res.json({ message: 'Nickname Exists' });
        } else {
            const salt = await bcrypt.genSalt(4);
            const hashedPassword = await bcrypt.hash(password, salt);

            await Users.create({email, password: hashedPassword, nickname}).then((data) => {
                res.status(201).json({message: 'registered'});
            });
        };
    },

    login: async (req: Request, res: Response) => {

    },

    logout: async (req: Request, res: Response) => {

    },

    emailAuthentication: async (req: Request, res: Response) => {

    }
}

export default signHandler;