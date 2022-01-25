require('dotenv').config();
const db = require('./../models');

// token function


// 클라이언트 token 확인하는 컨트롤러 필요할지도
module.exports = {
    getAllFeedsByDate: (req, res) => {
        try {
            db.post.findAll({
                order: [['createdAt', 'DESC']],
                attributes: ['id', 'painting', 'user_id', 'createdAt']
            }).then((data) => {
                res.json({ data: data, message: "All posts of our service by Date" });
            })
        } catch {
            res.json({ data: null, message: "Failed to Load the Post by Date" });
        }
    },

    getAllFeedsByLikes: (req, res) => {
        try {
            db.post.findAll({
                order: [['total_likes', 'DESC']],
                attributes: ['id', 'painting', 'user_id', 'total_likes']
            }).then((data) => {
                res.json({ data: data, message: "All posts of our service by Likes" });
            })
        } catch {
            res.status(404).json({ data: null, message: "Failed to Load the Post by Likes" });
        }
    },

    getUserFeeds: (req, res) => { // 테스트 요망
        try {
            db.user.findAll({
                where: { id: req.params.userId },
                attributes: ['id', 'nickname', 'profile_img', 'status_msg', 'total_follow', 'total_follower'],
                include: [{ model: db.post,
                    where: { user_id: req.params.userId },
                    order:[['createdAt', 'DESC']] }],
                    attributes: ['id', 'painting', 'createdAt']
            }).then((data) => {
                res.json({ data: data, message: "The User Info and Feeds by Date" });
            })
        } catch {
            res.status(404).json({ message: "Could Not Bring the Posts" });
        }
    },

    getFollowingFeeds: (req, res) => {
        try {
            db.follow.findAll({
                where: { follower_id: req.params.userId },
            }).then((data) => {
                const followingIds = [];
                data.forEach((el) => {
                    const id = el['dataValues'].user_id;
                    if (!followingIds.includes(id)) followingIds.push(id);
                })
                db.post.findAll({
                    where: { id: followingIds },
                    attributes: ['id', 'painting', 'user_id', 'createdAt'],
                    order: [['createdAt', 'DESC']]
                }).then((data) => {
                    res.json({ data: data, message: "Following Posts" });
                })
            })
        } catch {
            res.status(404).json({ message: "Could Not Bring Following's Posts" });
        }
    }
};