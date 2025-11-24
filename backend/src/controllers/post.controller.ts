import { Request, Response } from "express";
import PostModel from "../models/Post.model";
import { AppError, asyncHandler } from "../utils/asyncHandler";
import path from "path";



export const PostController = {
    createPost: asyncHandler(async(req:Request, res:Response) =>{
        const {text, isPrivate} = req.body 
        const files = req.files as Express.Multer.File[] | undefined
        const userId = (req as any).user.userId
        let images: string[] =[]

        if(files && files.length > 0){
            images = files.map(file => file.filename)
        }
        const post = await PostModel.create({
            author:userId,
            text: text || "",
            isPrivate: isPrivate === 'true',
        })
        return res.status(201).json({
            success: true,
            message: 'Post uploaded',
            data: post
        })
    
    })
}