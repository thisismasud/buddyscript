import { Request, Response } from "express";
import PostModel from "../models/Post.model";
import { AppError, asyncHandler } from "../utils/asyncHandler";

export const PostController = {
  createPost: asyncHandler(async (req: Request, res: Response) => {
    const { text, isPrivate } = req.body;
    const files = req.files as Express.Multer.File[] | undefined;
    const userId = (req as any).user.userId;
    let images: string[] = [];

    if (files && files.length > 0) {
      images = files.map((file) => file.filename);
    }
    const post = await PostModel.create({
      author: userId,
      text: text || "",
      isPrivate: isPrivate === "true",
    });
    return res.status(201).json({
      success: true,
      message: "Post uploaded",
      data: post,
    });
  }),
  getPosts: asyncHandler(async (req: Request, res: Response) => {
    const limitParam = req.query.limit;
    const cursorParam = req.query.cursorParam;

    let limit = 10;
    if (limitParam) {
      const parsedLimit = parseInt(limitParam as string, 10);
      if (!isNaN(parsedLimit) && parsedLimit > 0) {
        limit = Math.min(parsedLimit, 50);
      }
    }

    const query: any = {};

    if (cursorParam) {
      const cursorDate = new Date(cursorParam as string);
      if (isNaN(cursorDate.getTime())) {
        throw new AppError(400, "Invalid Cursor");
      }
      query.createdAt = { $lt: cursorDate };
    }

    //fetch posts
    const posts = await PostModel.find(query)
      .sort({ createdAt: -1 })
      .limit(limit + 1)
      .populate("author", "firstName lastName avatarUrl")
      .lean();

    //check if there is more post
    let hasMore = false;
    let nextCursor: string | null = null;

    if (posts.length > limit) {
      hasMore = true;
      posts.pop();
    }

    //set next cursor
    if (posts.length > 0) {
      const lastPost = posts[posts.length - 1];
      nextCursor = lastPost.createdAt.toISOString();
    }

    //build image urls
    const postsWithImages = posts.map((post) => {
      const imageUrls = posts.images.map((fileName) => {
        return `/public/uploads/posts/${fileName}`;
      });
      return {
        ...post,
        images: imageUrls,
      };
    });
    return res.status(200).json({
      success: true,
      data: {
        posts: postsWithImages,
        hasMore: hasMore,
        nextCursor: nextCursor,
      },
    });
  }),
};
