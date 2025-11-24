import { Request, Response } from "express";
import PostModel from "../models/Post.model";
import { AppError, asyncHandler } from "../utils/asyncHandler";
import path from "path";



export const PostController = {
    createPost: asyncHandler(async(req:Request, res:Response) =>{
        const {text, isPrivate, postImages} = req.body 
        const userId = (req as any).user.userId
        if(!text && !(postImages?.length > 0)){
            throw new AppError(400, "Text or Images required to post")
        }
        console.log(postImages)


        console.log(req.files)
    
    })
}