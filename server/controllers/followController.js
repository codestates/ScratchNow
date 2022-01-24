require('dotenv').config();
const db = require('./../models'); 

// token function


// 클라이언트 token 확인하는 컨트롤러 필요할지도
module.exports = {
    getFollower: (req, res, next) => {
        try {
            db.follow.findAll({
                where: { user_id: req.params.userId }
            }).then((data) => {
                // data[n].dataValues.follower_id === 팔로워 한명의 user.id 값
                // 위 user.id 값들을 기준으로 렌더링 정보를 findAll
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
            res.status(500).json({ message: "Failed to Load Followers" });
        }
    },

    getFollowing: (req, res) => {
        try {
            db.follow.findAll({
                where: { follower_id: req.params.userId }
            }).then((data) => {
                // data[n].dataValues.follower_id === 팔로워 한명의 user.id 값
                // 위 user.id 값들을 기준으로 렌더링 정보를 findAll
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
            res.status(500).json({ message: "Failed to Load Followings" });
        }

    },

    followUser: (req, res) => {
        // 팔로우 할 유저의 id를 받으면 유저 테이블에서 그 id의 total_follower 1 증가
        // 팔로우를 요청하는 사용자의 user.id의 total_follow 1 증가 .increment('total_follow')
        const { userId, followerId } = req.body;
        // userId: 해당 요청으로 follower가 증가하는 사용자 id
        // followerId: follow를 요청한 사용자 id
        try {
            db.follow.findOrCreate( { 
                where : { user_id: userId, follower_id: followerId }
            })
            .then(() => {
                db.user.increment({ total_follow: 1 }, { where: { id: followerId }});
                db.user.increment({ total_follower: 1 }, { where: { id: userId }});
            }).then(() => {
                res.json({ message: "Follow Success" });
            })
        } catch {
            res.status(500).json({ message: "Failed Following" });
        }
    },

    unfollowUser: (req, res) => {
        // 언팔로우 할 유저의 id를 받으면 유저 테이블에서 그 id의 total_follower 1 차감
        // 언팔로우를 요청하는 사용자의 user.id의 total_follow 1 차감 .decrement('total_follow')
        const { unfollowId, userId } = req.body;
        // unfollowId: unfollow 되는 사용자 id : 파라미터의 :followId와 동일한 값
        // userId: unfollow를 요청한 사용자 id
        try {
            db.follow.destroy({ where: { user_id: unfollowId } })
            .then(() => {
                db.user.decrement({ total_follow: 1 }, { where: { id: userId }});
                db.user.decrement({ total_follower: 1 }, { where: { id: unfollowId }});
            })
            .then(() => {
                res.json({ message: "Unfollow Success" });
            })
        } catch {
            res.status(500).json({ message: "Failed Unfollowing" });
        }
    }
};