import express from "express";
import { createPostController, getAllPostsController, searchPostController } from "../Controllers/ImageController.js";

const router = express.Router();

router.get('/allPosts', getAllPostsController);
router.post('/createPost', createPostController);
router.get('/searchPosts/:search', searchPostController);

export default router;
