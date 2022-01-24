require('dotenv').config();
const db = require('../models');
// options = { multi: true };

// token function
// const { generateAccessToken, sendAccessToken, isAuthorized } = require('./signFunctions');

// 클라이언트 token 확인하는 컨트롤러 필요할지도
module.exports = {
    getUserinfoById: (req, res) => {
        try {
            db.user.findOne({
                where: { id: req.params.userId }
            }).then((data) => {
                res.json({ data: data, message: "Returning My Userinfo" })
            })
        } catch {
            res.status(500).json({ message: "Failed to Bring UserInfo" })
        }
    },

    changeUserinfo: (req, res) => {
        const { nickname, status_msg, profile_img } = req.body;
        try {
            db.user.update( 
                req.body, { where: { id: req.params.userId } }
            ).then((data) => {
                db.user.findOne({
                    where: { id: req.params.userId }
                }).then((data) => {
                    res.json({ data: data, message: "Updated the Userinfo" })
                })
            })
        } catch {
            res.status(500).json({ message: "Failed to Update UserInfo" })
        }
    },

    // 사용 X
    changeProfileImg: (req, res) => {
        const { id, profile_img } = req.body;
        try {
            const userInfo = db.user.update(
                req.body,profile_img, { where: { id: req.body.id } }
            )
        } catch {
            res.status(500).json({ message: "Failed to Update Profile Img" })
        }
    },

    deleteUserinfo: async (req, res) => {
        await db.user.destroy({
            where: { id: req.params.userId }
        })
        res.json({ message: "UserInfo Deleted" })
    }
};