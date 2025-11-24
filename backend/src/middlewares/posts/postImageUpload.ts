import { NextFunction, Request, Response } from "express"
import { AppError } from "../../utils/asyncHandler"
import uploader from "../../utils/imageUploader"

export const postImageUpload = () => {
  return uploader(
    'posts',
    ['image/jpeg', 'image/jpg', 'image/png'],
    5000000,
    'Only .jpg, .jpeg or .png allowed!'
  ).array('postImages', 10); // returns middleware
};