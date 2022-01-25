require('dotenv').config();
const db = require('../models');
// options = { multi: true };

// token function
// const { generateAccessToken, sendAccessToken, isAuthorized } = require('./signFunctions');

// 클라이언트 token 확인하는 컨트롤러 필요할지도
module.exports = {
    getUserinfoById: (req, res) => {
        try {
            db.post.findOne({
                where: { user_id: req.params.userId },
                attributes: ['id', 'painting', 'createdAt'],
                order: [['createdAt', 'DESC']],
                include: [{ model: db.user,
                    attributes: ['id', 'nickname', 'profile_img', 'status_msg', 'total_follow', 'total_follower']
                }]
            }).then((data) => {
                res.json({ data: data, message: "My Userinfo" });
            })
        } catch {
            res.status(404).json({ message: "Failed to Bring UserInfo" });
        }
    },

    changeUserinfo: (req, res) => {
        const { userId, status_msg, password } = req.body;
        try {
            db.user.update( 
                req.body, { where: { id: userId } }
            ).then((data) => {
                db.user.findOne({
                    where: { id: userId }
                }).then((data) => {
                    res.json({ data: data, message: "Updated the Userinfo" });
                })
            })
        } catch {
            res.status(406).json({ message: "Failed to Update UserInfo" });
        }
    },

    changeProfileImg: (req, res) => {
        const { userId, profile_img } = req.body;
        try {
            db.user.update(
                profile_img, { where: { id: userId } }
            ).then((data) => {
                res.json({ data: data, message: "Updated the Profile Img" });
            })
        } catch {
            res.status(406).json({ message: "Failed to Update Profile Img" });
        }
    },

    deleteUserinfo: async (req, res) => {
        const { userId } = req.body;
        await db.user.destroy({
            where: { id: userId }
        })
        res.json({ message: "UserInfo Deleted" });
    }
};