require('dotenv').config();
const db = require('../models');

// token function


// 클라이언트 token 확인하는 컨트롤러 필요할지도
module.exports = {
    getPostById: (req, res) => {
        try {
            db.post.findOne({
                where: { id: req.params.postId },
                include: [{ model: db.comment, include: [{ model: db.user, attributes: ['nickname'] }] }]
            }).then((data) => {
                res.json({ data: data, message: "ok" })
            })
        } catch {
            res.status(500).json({ message: "Couldn't find post'"})
        }

    },

    createPost: async (req, res) => {
        const { userId, painting, text } = req.body;
        try {
            await db.post.create({ painting, text, user_id: userId })
            .then((data) => {
                res.json({ data: data, message: "Created Successfully" });
            })
        } catch {
            res.status(500).json({ message: "Error creating post" });
        }
    },

    patchPostById: async (req, res) => {
        const { painting, text } = req.body;
        try {
            await db.post.update({ painting, text }, {
                where: { id: req.params.postId }
            }).then((data) => {
                db.post.findOne({
                    where: { id: req.params.postId }
                }).then((data) => {
                    res.json({ data: data, message: "Updated Successfully" });
                })
            })
        } catch {
            res.json({ message: "Failed updating post" });
        }
    },

    deletePost: async (req, res) => {
        await db.post.destroy({
            where: { id: req.params.postId }
        })
        res.json({ data: null, message: "post deleted" });
    }
};