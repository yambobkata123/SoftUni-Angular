const { userModel, themeModel, postModel } = require('../models');
const mongoose = require('mongoose');

function newPost(text, userId, themeId) {
    return postModel.create({ text, userId, themeId })
        .then(post => {
            return Promise.all([
                userModel.updateOne({ _id: userId }, { $push: { posts: post._id }, $addToSet: { themes: themeId } }),
                themeModel.findByIdAndUpdate({ _id: themeId }, { $push: { posts: post._id }, $addToSet: { subscribers: userId } }, { new: true })
            ])
        })
}

function getLatestsPosts(req, res, next) {
    const limit = Number(req.query.limit) || 0;

    postModel.find()
        .sort({ created_at: -1 })
        .limit(limit)
        .populate('themeId userId')
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(next);
}

function createPost(req, res, next) {
    const { themeId } = req.params;
    const { _id: userId } = req.user;
    const { postText } = req.body;

    newPost(postText, userId, themeId)
        .then(([_, updatedTheme]) => res.status(200).json(updatedTheme))
        .catch(next);
}

async function editPost(req, res, next) {
    const { postId } = req.params;
    const { title, description, imageUrl, author } = req.body;
    const userId = req.user?._id;
  
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: No user' });
    }
  
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: 'Invalid postId format' });
    }
  
    console.log("EDIT ATTEMPT:");
    console.log("User ID:", userId);
    console.log("Post ID:", postId);
    console.log("Update Data:", { title, description, imageUrl, author });
  
    try {
      const updatedPost = await postModel.findOneAndUpdate(
        { _id: postId, creatorId: userId },  // филтрираме по creatorId
        { title, description, imageUrl, author },
        { new: true }
      );
  
      console.log("Updated post:", updatedPost);
  
      if (!updatedPost) {
        return res.status(403).json({ message: 'You are not allowed to edit this post or post not found.' });
      }
  
      res.status(200).json(updatedPost);
    } catch (err) {
      next(err);
    }
  }
  



function deletePost(req, res, next) {
    const { postId, themeId } = req.params;
    const { _id: userId } = req.user;

    Promise.all([
        postModel.findOneAndDelete({ _id: postId, userId }),
        userModel.findOneAndUpdate({ _id: userId }, { $pull: { posts: postId } }),
        themeModel.findOneAndUpdate({ _id: themeId }, { $pull: { posts: postId } }),
    ])
        .then(([deletedOne, _, __]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne)
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function like(req, res, next) {
    const { postId } = req.params;
    const { _id: userId } = req.user;

    console.log('like')

    postModel.updateOne({ _id: postId }, { $addToSet: { likes: userId } }, { new: true })
        .then(() => res.status(200).json({ message: 'Liked successful!' }))
        .catch(next)
}

module.exports = {
    getLatestsPosts,
    newPost,
    createPost,
    editPost,
    deletePost,
    like,
}
