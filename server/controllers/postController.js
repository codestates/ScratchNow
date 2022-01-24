require('dotenv').config();
const db = require('./../models');

// token function


// 클라이언트 token 확인하는 컨트롤러 필요할지도
module.exports = {
    getPostById: (req, res) => {
        // 미구현
        // post, post에 해당하는 comment, 댓 작성 nickname 갖고 와야 함.
        try {
            db.post.findOne({
                where: { id: req.params.postId }
            }).then((data) => {
                const postId = data['dataValues'].id;
                // const userId = data['dataValues'].user_id;
                console.log(data['dataValues'])
                db.comment.findAll({
                    where: { post_id: 0},// req.params.postId },
                    attributes: ['id', 'user_id', 'text', 'updatedAt']
                }).then((data) => {
                    const comments = [];
                    data.forEach((el) => {
                        comments.push(el['dataValues']);
                        })
                    console.log(comments)
                    // }).then((data) => {
                    //     //console.log(data);
                    const commentWriter = [];
                    comments.forEach((el) => {
                        const commentinfo = { id: el['id'], user_id: el['user_id']}
                        commentWriter.push(commentinfo);
                    })
                    console.log(commentWriter);
                    const writerId = 
                    db.user.findOne({
                        where: { id: 0},//userId },
                        attributes: ['nickname', 'profile_img']
                    }).then((data) => {
                        const nickname = data;
                        db.post.findOne({
                            where: { id: postId }
                        }).then((post) => {
                            res.json({ data: {post, nickname, comments}, message: 'ok'});
                        })
                })
            })
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