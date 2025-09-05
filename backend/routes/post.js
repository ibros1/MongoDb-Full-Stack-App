import express from "express";
import { Authenticate } from "../middleWare/authenticate.js";
import upload from "../middleWare/aploadCloudinary.js";
import {
  createPost,
  deletePost,
  getOnePost,
  getUserPosts,
  updatePost,
} from "../controllers/postController.js";
const router = express.Router();

router.post("/create", Authenticate, upload.single("image"), createPost);
router.get("/get-user-posts", Authenticate, getUserPosts);
router.get("/:postId", Authenticate, getOnePost);
router.delete("/delete/:postId", Authenticate, deletePost);
router.put("/update/:postId", Authenticate, upload.single("image"), updatePost);

export default router;
