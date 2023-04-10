const { Router } = require("express");
require("dotenv").config();

const PostRoute = Router();
const { PostModel } = require("../Model/Post.model");

//Get all the post data
PostRoute.get("/posts", async (req,res) => {
  try{
    const userData = await PostModel.find({})
    res.status(201).send(userData)
  }
  catch(err){
   res.status(500).send("Error in getting Data") 
  }
})

//Create a new post.
PostRoute.post("/posts", async (req, res) => {
  try {
    const { user_id, content, likes } = req.body;
    const postData = new PostModel({
      user_id,
      content,
      likes,
    });
    await postData.save();
    res.status(201).send({ message: "New Data Posted" });
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

//Retrieve a post by id.
PostRoute.get("/posts/:id", async (req, res) => {
  try {
    const postData = await PostModel.findById(req.params.id);
    if (!postData) {
      res.status(500).send({ message: "Posts not found" });
    } else {
      res.status(201).send({ message: postData });
    }
  } catch (err) {
    res.status(500).send({ message: "Error in finding post data" });
  }
});

//Update a post's content by id.
PostRoute.put("/posts/:id", async (req, res) => {
  try {
    const updatePost = await PostModel.findByIdAndUpdate(req.params.id);
    if (!updatePost) {
      res.status(500).send({ message: "Error in Updating Post" });
    } else {
      updatePost.content = req.body.content;
      await updatePost.save();
      res.status(500).send({ message: "Update Successfull" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

//Delete a post by id.
PostRoute.delete("/posts/:id", async (req, res) => {
  try {
    const deletePost = await PostModel.findByIdAndDelete(req.params.id);
    if (!deletePost) {
      res.status(500).send({ message: "Something wrong with delete id" });
    } else {
      res.status(201).send({ message: "Delete Successfull" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

//Increment the like count of a post by id.
PostRoute.post("/posts/:id/like", async (req, res) => {
  try {
    const likePost = await PostModel.findById(req.params.id);
    if (!likePost) {
      res.status(500).send({ message: "Post Not Found" });
    } else {
      likePost.likes++;
      await likePost.save();
      res.status(201).send({ message: "Increase the like" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

//Decrement the like count of a post by id. The count should not go below 0.
PostRoute.post("/posts/:id/unlike", async (req, res) => {
  try {
    const dislikePost = await PostModel.findById(req.params.id);
    if (!dislikePost) {
      res.status(500).send({ message: "Post Not Found" });
    } else if (dislikePost > 0) {
      dislikePost.likes--;
      await dislikePost.save();
      res.status(201).send({ message: "Decrease the like" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

//Retrieve the total number of posts.
PostRoute.get("/analytics/posts", async (req, res) => {
  try {
    const totalPosts = await PostModel.countDocuments();
    res.status(201).send({ message: totalPosts });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

//Retrieve the top 5 most liked posts.
PostRoute.get("/analytics/posts/top-liked", async (req, res) => {
  try {
    const topliked = await PostModel.find().sort({ likes: -1 }).limit(5);
    res.status(201).send({ message: "Top most Likes", topliked });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = {
  PostRoute,
};
