import { Router } from "express";
import { PostController } from "../controllers/post.controller";
import checkLogin from "../middlewares/common/checkLogin";
import {postImageUpload} from "../middlewares/posts/postImageUpload";
const router = Router();

router.post("/", checkLogin, postImageUpload(), PostController.createPost);

export default router;
