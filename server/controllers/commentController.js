require('dotenv').config();
const db = require('../models');

// token function


// 클라이언트 token 확인하는 컨트롤러 필요할지도
module.exports = {
    createComment: async (req, res) => {
        const { userId, postId, text } = req.body;
        try {
            const CommentCreated = await db.comment.create({ user_id: userId, post_id: postId, text: text });
            // console.log(CommentCreated.dataValues);
            res.status(201).json({ data: CommentCreated, message: "Comment Created" });
        } catch {
            res.status(500).json({ data: null, message: "DB Error" });
        }
    },

    patchComment: async (req, res) => {
        const { id, text } = req.body;
        try {
            await db.comment.update(req.body, { where: { id: id } });
            const updatedComment = await db.comment.findOne({ where: { id: id }});
            // console.log(updatedComment.dataValues);
            res.status(201).json({ data: updatedComment, message: "Comment Updated" });
        } catch {
            res.status(500).json({ data: null, message: "DB Error" });
        }
    },

    deleteComment: async (req, res) => {
        await db.comment.destroy({
            where: { id: req.params.commentId }
        })
        res.json({ data: null, message: "Comment Deleted" });
    }
};