require('dotenv').config();
const db = require('../models');

// token function
const { generateAccessToken, sendAccessToken, isAuthorized } = require('./signFunctions');

// 클라이언트 token 확인하는 컨트롤러 필요할지도
module.exports = {
    login: (req, res) => {
        const { email, password, nickname } = req.body;
        
        db.user.findOne({
            where: { email: req.body.email, password: req.body.password, nickname: req.body.nickname }
        }).then((data) => {
            if (!data) {
                res.status(404).json({ message: "Invalid User" })
            } else {
                const accessToken = generateAccessToken(data.dataValues);
                sendAccessToken(res, accessToken);
            }
        })
    },

    logout: (req, res) => {
        res.clearCookie('accessToken', {
            httpOnly: true, secure: true, sameSite: 'None'
        }).json( { message: "Logout Success" } );
    },

    register: (req, res) => {
        const { email, nickname, password } = req.body;
        const inserCnt = Object.keys(req.body).length;

        if (inserCnt < 3) res.json({ message: "Please Send All the Information" });

        const emailinfo = db.user.findOne({
            where: { email: req.body.email }
        })
        if (emailinfo) {
            res.status(409).json({ data: req.body.email, message: "Email Exists" });
        } else {
            const nicknameinfo = db.user.findOne({
                where: { nickname: req.body.nickname }
            })
            if (nicknameinfo) {
                res.status.json({ data: req.body.nickname, message: "Nickname Exists" })
            } else {
                db.user.create(req.body)
                .then((data) => {
                    const { email, password, nickname } = data;
                    const payload = { email, nickname };

                    const accessToken = generateAccessToken(payload);
                    res.status(201).cookie('Bearer', accessToken).json({ data: payload, message: "Successfully Registered" })
                })
            }
        }
    },

    check: (req, res) => {

    }
};