require('dotenv').config();
const db = require('../models'); 

// token function


// 클라이언트 token 확인하는 컨트롤러 필요할지도
module.exports = {
    getFollower: (req, res, next) => {
        try {
            db.follow.findAll({
                where: { user_id: req.params.userId }
            }).then((data) => {
                const followerIds = [];
                data.forEach((el) => {
                    const id = el['dataValues'].follower_id;
                    if (!followerIds.includes(id)) followerIds.push(id);
                })
                db.user.findAll({
                    where: { id: followerIds },
                    attributes: ['id','nickname','profile_img']
                }).then((data) => {
                    res.json({ data: data, message : "My Followers" })
                })
            })
        } catch {
            res.status(404).json({ message: "Failed to Load Followers" });
        }
    },

    getFollowing: (req, res) => {
        try {
            db.follow.findAll({
                where: { follower_id: req.params.userId }
            }).then((data) => {
                const followingIds = [];
                data.forEach((el) => {
                    const id = el['dataValues'].user_id;
                    if (!followingIds.includes(id)) followingIds.push(id);
                })
                console.log(followingIds);
                db.user.findAll({
                    where: { id: followingIds },
                    attributes: ['id','nickname','profile_img']
                }).then((data) => {
                    res.json({ data: data, message : "My Followings" })
                })
            })
        } catch {
            res.status(404).json({ message: "Failed to Load Followings" });
        }

    },

    followUser: (req, res) => {
        const { userId, followerId } = req.body;
        // userId: 해당 요청으로 follower가 증가하는 사용자 id
        // followerId: follow를 요청한 사용자 id
        const followinfo = db.follow.findOne({
            where: { user_id: userId, follower_id: followerId }
        })
        if (followinfo) {
            res.status(401).json({ message: "Already Followed this User" })
        } else {
            db.follow.findOrCreate( { 
                where : { user_id: userId, follower_id: followerId }
            }).then((data) => {
                db.user.increment({ total_follow: 1 }, { where: { id: followerId }});
                db.user.increment({ total_follower: 1 }, { where: { id: userId }});
                db.user.findOne({
                    where: { id: userId },
                    attributes: ['id', 'total_follower']
                }).then((data) => {
                    res.json({ data: data, message: "Follow Success" });
                })
            })
        }
    },

    unfollowUser: (req, res) => {
        const { unfollowId, userId } = req.body;
        // unfollowId: unfollow 되는 사용자 id : 파라미터의 :followId와 동일한 값
        // userId: unfollow를 요청한 사용자 id
        const followinfo = db.follow.findOne({
            where: { user_id: userId, follower_id: unfollowId }
        })
        if (followinfo) {
            db.follow.destroy({
                where: { user_id: unfollowId }
            }).then((data) => {
                db.user.decrement({ total_follow: 1 }, { where: { id: userId }});
                db.user.decrement({ total_follower: 1 }, { where: { id: unfollowId }});
                db.user.findOne({
                    where: { id: userId },
                    attributes: ['id', 'total_follower']
                }).then((data) => {
                    res.json({ data: data, message: "Unfollow Success" });
                })
            })
        } else {
            res.status(400).json({ message: "Failed Unfollowing" });
        }
    }
};