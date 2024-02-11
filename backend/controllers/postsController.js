import mongoose from "mongoose";
import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";

const getPosts = async(req, res) => {

    try {
        const posts = await Post.find().sort({ createdAt: "desc" });
        res.status(200).json({ posts });
    } catch (err) {
        res.status(500).json({ 'error': err.message })
    }

}


const getUserPosts = async(req, res) => {
    
    const user = await User.findById(req.user._id);

    try {
        const userPosts = await Post.find({ user: user._id }).sort({ createdAt: "desc" });;
        res.status(200).json({ userPosts, email: user.email });
    } catch (err) {
        res.status(500).json({ 'error': err.message })
    }

}

const addPost = async(req, res) => {

    const { title, body } = req.body;

    if (!title || !body) {
        return res.status(400).json({ 'error': "All fields are required"})
    }

    const user = await User.findById(req.user._id);

    try {
        const post = await Post.create({ user: user._id, title, body, });
        res.status(200).json({ "success": "Post created.", post });
    } catch (err) {
        res.status(500).json({ 'error': err.message })
    }

}

const deletePost = async(req, res) => {

    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ 'error': "Incorrect ID" })
    }

    try {
        const post = await Post.findById(id);
        const user = await User.findById(req.user._id);

        if (!post) {
            return res.status(400).json({ 'error': "Post not found" })
        }

        // Check the user owns the post

        if (!post.user.equals(user._id)) {
            return res.status(401).json({ error: "Not authorized."});
        }


        const deletedPost = await post.deleteOne();
        res.status(200).json({ "success": "Post was deleted." });

    } catch (err) {
        res.status(500).json({ 'error': err.message })
    }

}

const updatePost = async(req, res) => {

    const id = req.params.id;
    const { title, body } = req.body;

    if (!title || !body) {
        return res.status(400).json({ 'error': "All fields are required"})
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ 'error': "Incorrect ID" })
    }

    try {
        const post = await Post.findById(id);
        const user = await User.findById(req.user._id);

        if (!post) {
            return res.status(400).json({ 'error': "Post not found" })
        }

        // Check the user owns the post

        if (!post.user.equals(user._id)) {
            return res.status(401).json({ error: "Not authorized."});
        }

        post.updateOne({ title, body });
        res.status(200).json({ "success": "Post is updated." });

    } catch (err) {
        res.status(500).json({ 'error': err.message })
    }

}

export { getPosts, getUserPosts, addPost, deletePost, updatePost }