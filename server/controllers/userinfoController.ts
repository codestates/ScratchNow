import {Request, Response} from "express";
import { Users } from '../models/users';
import * as bcrypt from 'bcrypt';
import { tokenAuthentication } from './tokenFunctions';

const SALT_ROUND  = 4;
const SECRET = String(process.env.JWT_SECRET);

const userinfoController = {
    // 회원정보 수정 방식 프론트와 협의 후 작업
    modifyUserInfo: async (req: Request, res: Response) => {
        const tokenValidity = tokenAuthentication(req);
        const { id, password, nickname, profile_image_url, status_message } = req.body;

        if (!tokenValidity) {
            res.status(404).json({ message: 'Invalid Token' });
        } else {

        };
    },

    // 비밀번호 검증 포함? 프론트와 협의 후 픽스
    // 토큰 관련 함수 별도 모듈화 고려
    withdrawal: async (req: Request, res: Response) => {
        const tokenValidity = tokenAuthentication(req);
        const { id, email, password } = req.body;

        if (!tokenValidity) {
            res.status(404).json({ message: 'Invalid Token' });
        } else {
            await Users.destroy({ where: { id } })
                .then(() => {
                    res.status(200).json({ message: `Soft deleted the account ${email}` });
                });
        };
    }
};

export default userinfoController;