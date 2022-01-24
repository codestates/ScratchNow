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
            res.json({ data: null, message: "Failed to Load the Post by Date" })
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
            res.json({ data: null, message: "Failed to Load the Post by Likes" })
        }
    },

    getUserFeeds: (req, res) => {
        try {
            db.post.findAll({
                where: { user_id: req.params.userId },
                order: [['createdAt', 'DESC']],
                attributes: ['id', 'painting', 'user_id', 'createdAt']
            }).then((data) => {
                res.json({ data: data, message: "The User Posts by Date" })
            })
        } catch {
            res.json({ message: "Could Not Bring the Posts" });
        }
    },

    // 내가 팔로우한 사람들 모아보기 피드 - 아직 미구현! 현재 고민 중
    getFollowingFeeds: (req, res) => {
        // 내가 팔로우하는 사용자 id 도출
        // 그 사용자 id의 getUserFeeds 도출
        const { userId } = req.body;
        try {
            db.follow.findAll({
                where: { follower_id: userId }
            }).then((data) => {
                console.log(data);
            }).then((data) => {
                res.json({ data: data, message: "Following Posts" })
            })
        } catch {
            res.status(500).json({ message: "Could Not Bring Following Posts" })
        }
    }
};