const express = require("express");
// const {  } = require("../middleWare/authMiddleWare");
const { protect, adminOnly } = require("../middleWare/authMiddleWare");
const {
  profile,
  createPost,
  updatePost,
  getAllPosts,
  getOnePost,
  deletePost,
  getAdminAllposts,
  getOwnPosts,
} = require("../controllers/postController");
const router = express.Router();
// router.get("/profile", protect, profile);

//get All posts route
router.get("/feed", protect, getAllPosts);

// get users posts
router.get("/me", protect, getOwnPosts); // must be before `/:id`

//get one post by ID
router.get("/:id", protect, getOnePost);

// create post route
router.post("/create", protect, createPost);

// update post route
router.put("/:id", protect, updatePost);

//delete post
router.delete("/:id", protect, deletePost);

// get all posts for Admin
router.get("/admin/all", protect, adminOnly, getAdminAllposts);

module.exports = router;
