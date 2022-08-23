import express, {Request, Response} from "express";
import {Comments} from "../models/comments";

const commentsHandler = {
    createComment: async (req: Request, res: Response) => {
        const { user_id, post_id, text, anonymity_yn } = req.body;
        // await Comments.create({user_id, post_id, anonymity_yn, text})
    },

    modifyComment: async (req: Request, res: Response) => {

    },

    deleteComment: async (req: Request, res: Response) => {

    },

    getComments: async (req: Request, res: Response) => {

    }
};

export default commentsHandler;