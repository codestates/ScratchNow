require('dotenv').config();
const db = require('./../models');

module.exports = {
    likeThePost: async (req, res) => {
        const { postId, userId } = req.body;
        const likesInfo = await db.like.findOne({
            where: { post_id: postId, user_id: userId }
        });
        
        if (likesInfo) {
            res.status(403).json({ message: "You've already Liked this Post" });
        }
        else {
            try {
                db.like.findOrCreate({
                    where: { post_id: postId, user_id: userId }
                }).then((data) => {
                    const likeId = data[0].dataValues.id;
                    db.post.increment({ total_likes: 1 }, { where: { id: postId }});
                    db.post.findOne({
                        where: { id: postId },
                        attributes: ['id', 'total_likes']
                    }).then((post) => {
                        res.status(201).json({ data: { likeId, post }, message: "Like this Post" });
                    })
                })
            } catch {
                res.status(404).json({ data: null, message: "Failed to Like this Post" });
            }
        }
    },

    deleteLike: (req, res) => {
        const { postId, userId } = req.body;
        db.like.findOne({
            where: { post_id: postId, user_id: userId }
        }).then((data) => {
                if (data) {
                    db.like.destroy({
                        where: { post_id: postId, user_id: userId }
                    }).then((data) => {
                        db.post.decrement({ total_likes: 1 }, { where: { id: postId }});
                        res.json({ data: data, message: "Deleted the Like of the Post" });
                    })
                }
                else {
                    res.status(404).json({ data: null, message: "Failed to unLike this Post" });
                }            
        })
    }
}