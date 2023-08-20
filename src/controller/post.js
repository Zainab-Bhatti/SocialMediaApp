import postModel from "../model/Post.js";

const PostController = {
  getAll: async (req, res) => {
    const posts = await postModel.find().populate("user_id");
    return res.json(posts);
  },
  getSingle: async (req, res) => {
    const { id } = req.params;
    const post = await postModel.findById(id).populate("user_id");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.json(post);
  },
  create: async (req, res) => {
    const body = req.body;
    const post = await postModel.create({
      title: body.title,
      description: body.description,
      user_id: body.user_id,
      comments:{
        comment_text:body.comments.comment_text,
        user_id:body.user_id
      }
    });

    return res.json({ message: "Post created", post});
  },
  update: async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const post = await userModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.title = body.title;
    post.description = body.description;


    await post.save();
    return res.json({ message: "Post Updated", post });
  },

  deletePost: async (req,res)=>{
    const body = req.body;
    const id = req.params.id;
    const post = await postModel.findOne(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    else{
      await post.delete();
      return res.json({message: "Post deleted!"});
    }
},
}
export default PostController;
