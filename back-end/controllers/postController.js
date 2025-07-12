const Post = require("../models/postModel");
const User = require("../models/userModel");
const slugify = require("slugify");

// create post
exports.createPost = async (req, res) => {
  console.log("POST BODY:", req.body);
  console.log("USER:", req.user);
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      res.status(400).json({ message: "All fields are required" });
    }
    const slugBase = slugify(title, { lower: true });
    const uniqueSlug = `${slugBase}-${Date.now()}`;
    const post = await Post.create({
      title,
      content,
      slug: uniqueSlug,
      author: req.user.id,
      publishedAt: new Date(),
    });
    return res
      .status(201)
      .json({ message: "Post created successfully!", post });
  } catch (error) {
    console.error("Post.create() failed ➜", error); // <— keep this!
    return res.status(500).json({ message: "Failed to create post" });
  }
};

// getAll posts (public feed)
exports.getAllPosts = async (req, res) => {
  // console.log("POST GET BODY:", req.body);
  try {
    const posts = await Post.find()
      .populate("author", "name")
      .sort({ createdAt: -1 });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch posts" });
  }
};

// get one post by ID
exports.getOnePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name");
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: "Post not found" });
  }
};

//  Get posts of the logged-in user
exports.getOwnPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id }).sort({
      createdAt: -1,
    });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch user's posts" });
  }
};

// update user posts
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    //  Check if current user is the owner
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { title, content } = req.body;
    post.title = title || post.title;
    post.content = content || post.content;

    await post.save();

    return res.status(200).json({ message: "Post updated", post });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to update post", error: error.message });
  }
};

// delete own post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await post.deleteOne();
    return res.status(200).json({ message: "post deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete post" });
  }
};
// Admin : view all posts
exports.getAdminAllposts = async (req, res) => {
  try {
    const posts = Post.find()
      .populate("author", "name email")
      .sort({ publishedAt: -1 });
    return res.status(200).json({ message: "Admin view", posts });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch posts for admin" });
  }
};
