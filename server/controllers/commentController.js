require('dotenv').config();
const db = require('../models');

// token function

// 클라이언트 token 확인하는 컨트롤러 필요할지도
module.exports = {
    createComment: async (req, res) => {
        const { userId, postId, text } = req.body;
        try {
            const CommentInfo = await db.comment.create({ user_id: userId, post_id: postId, text: text });
            db.user.findOne({
                where: { id: userId },
                attributes: ['nickname', 'profile_img']
            }).then((commentWriter) => {
                res.status(201).json({ data: {CommentInfo, commentWriter}, message: "Comment Created" });
            })
        } catch {
            res.status(500).json({ data: null, message: "Failed to create Comment" });
        }
    },

    updateComment: async (req, res) => {
        const { commentId, userid, postId, text } = req.body;
        try {
            await db.comment.update(text, { where: { id: commentId } });
            const updatedComment = await db.comment.findOne({ where: { id: id }});
            res.status(201).json({ data: updatedComment, message: "Comment Updated" });
        } catch {
            res.status(500).json({ data: null, message: "Failed to update Comment" });
        }
    },

    deleteComment: async (req, res) => {
        await db.comment.destroy({
            where: { id: req.body.commentId }
        })
        res.json({ data: null, message: "Comment Deleted" });
    }
};