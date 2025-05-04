const SavedPosts = require("../models/SavePosts");

const savePosts = async (req, res) => {
  try {
    const userId = req.user._id;

    const { postId, title, url, platform } = req.body;
    if (!postId || !title || !url || !platform) {
      return res.status(400).json({
        message:
          "Missing required fields: postId, title, url, platform, or userId",
      });
    }

    const existingPost = await SavedPosts.findOne({ postId, userId });

    if (existingPost) {
      return res.status(400).json({ message: "Post already saved by user" });
    }

    const newSavedPost = new SavedPosts({
      userId,
      postId,
      title,
      url,
      platform,
      saved: true,
    });

    await newSavedPost.save();
    res.status(200).json({ message: "Post saved successfully", ok: true });
  } catch (err) {
    console.log(err);

    res
      .status(500)
      .json({ message: "Failed to save posts", error: err.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const userId = req.user._id;

    const savedPosts = await SavedPosts.find({ userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({ ok: true, userId: userId, posts: savedPosts });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Failed to fetch post", error: err.message });
  }
};

module.exports = {
  savePosts,
  getPosts,
};
