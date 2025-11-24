import { NextFunction, Request, Response } from "express"
import { AppError } from "../../utils/asyncHandler"
import uploader from "../../utils/imageUploader"

function postImageUpload(req:Request, res:Response, next:NextFunction){
    const upload = uploader('posts', ["image/jpeg", "image/jpg", "image/png"],5000000, "Only .jpg, .jpeg or .png format allowed!" )

    upload.array('postImages', 5)(req, res,(err) =>{
        if(err){
            throw new AppError(500, err.message || "Image upload failed")
        }else{
            next()
        }
    })
}
export default postImageUpload