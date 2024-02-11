import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    title: {
        type: String,
        require: true,
    },
    body: {
        type: String,
        require: true,
    }
}, { timestamps: true})

const Post = mongoose.model("Post", PostSchema);

export default Post;