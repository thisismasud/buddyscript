import { Router } from "express";
import { PostController } from "../controllers/post.controller";
import checkLogin from "../middlewares/common/checkLogin";
import {postImageUpload} from "../middlewares/posts/postImageUpload";
const router = Router();

router.post("/create_post", checkLogin, postImageUpload(), PostController.createPost);
router.get("/get_posts", checkLogin, PostController.getPosts);

export default router;
