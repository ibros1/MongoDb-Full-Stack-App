import cloudinary from "../config/cloudinary.js";
import PostModel from "../models/posts.js";

export const createPost = async (req, res) => {
  try {
    const user = req.user._id;

    const { title, content } = req.body;

    let result;
    if (req.file) {
      let encodedImage = `data:image/jpeg;base64,${req.file.buffer.toString(
        "base64"
      )}`;

      result = await cloudinary.uploader.upload(encodedImage, {
        resource_type: "image",
        transformation: [{ width: 500, height: 500, crop: "limit" }],
        encoding: "base64",
      });
    }

    const post = await PostModel({
      title: title,
      content: content,
      image: result?.url || null,
      author: user,
    });

    await post.save();
    res.status(201).json({
      isSuccess: true,
      message: "Successfully created post!",
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      isSuccess: false,
      message: "internal server error",
    });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({
      author: req.user._id,
    })
      .populate({
        path: "author",
        model: "user",
        select: "email username ",
      })
      .sort({ createdAt: -1 });

    if (!posts) {
      return res.status(404).json({
        isSuccess: false,
        message: "no created this user!",
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "success",
      posts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      isSuccess: false,
      message: "Internal server error",
    });
  }
};

export const getOnePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await PostModel.find({
      _id: postId,
    }).populate({
      path: "author",
      model: "user",
      select: "email username",
    });
    if (!postId) {
      return res.status(404).json({
        isSuccess: false,
        message: "post not found!",
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "Successfully fetched post!",
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      isSuccess: false,
      message: "server error",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await PostModel.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).json({
        isSuccess: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "Successfully deleted post!",
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      isSuccess: false,
      message: "server error",
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const updateFeilds = {
      title: req.body.title,
      content: req.body.content,
    };
    console.log(updateFeilds);
    let result;
    if (req.file) {
      let encodedImage = `data:image/jpeg;base64,${req.file.buffer.toString(
        "base64"
      )}`;

      result = await cloudinary.uploader.upload(encodedImage, {
        resource_type: "image",
        transformation: [{ width: 500, height: 500, crop: "limit" }],
        encoding: "base64",
      });

      updateFeilds.image = result.url;
    }
    const post = await PostModel.findByIdAndUpdate(postId, updateFeilds, {
      new: true,
    });
    if (!post) {
      return res.status(404).json({
        isSuccess: false,
        message: "post not found!",
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "successfully updated post!",
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      isSuccess: false,
      message: "server error",
    });
  }
};
