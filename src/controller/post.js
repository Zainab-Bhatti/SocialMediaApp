import postModel from "../model/Post.js";
import userModel from "../model/User.js";

const PostController = {
  getAll: async (req, res) => {
    /*const posts = await postModel.find().populate("user_id");
    return res.json(posts);*/

    const { page = 1, limit = 10 } = req.query;

  try {
    // execute query with page and limit values
    const posts = await postModel.find()
      .sort("-createdAt")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // get total documents in the Posts collection 
    const count = await postModel.countDocuments();

    // return response with posts, total pages, and current page
    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    console.error(err.message);
  }
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

likePost: async (req,res) =>{
  try{
    var id = req.body.id;
    var query = {_id: id};
    var post = await postModel.findOne(query);
    const like=await postModel.findOneAndUpdate((query, {$inc : {likes : 1}}));
    return res.json(post);
}catch(error){
  console.log(error);
  return  res.status(500).json({message:'an error occured'});
}
},

dislikePost: async (req,res) =>{
  try{
    var id = req.body.id;
    var query = {_id: id};
    var post = await postModel.findOne(query);
    const dislike=await postModel.findOneAndUpdate((query, {$inc : {dislikes : 1}}));
    return res.json(post);
}catch(error){
  console.log(error);
  return  res.status(500).json({message:'an error occured'});
}
},

sharePost: async (req,res) =>{
  try{
    var id = req.body.id;
    var query = {_id: id};
    var post = await postModel.findOne(query);
    const shares=await postModel.findOneAndUpdate((query, {$inc : {share : 1}}));
    return res.json(post);
}catch(error){
  console.log(error);
  return  res.status(500).json({message:'an error occured'});
}
},

 getPostOnEmail: async (req,res)=>{
  const userEmail=req.body.email;
  const user= await userModel.find({email: userEmail});
  console.log(user);
  const post=await postModel.find({user_id: user});
  console.log(post);
  if(!post) return res.json({message:"No post Found!"});
  return res.json(post);
 },
 
searchPost: async (req,res)=>{
  const search=req.body.search;
   try{
   const docs = await postModel.find({title: {$regex: `${search}`,$options:'i'} });
   
   return res.json(docs);
 }
 catch(error){
   console.log(error);
  return  res.status(500).json({message:'an error occured'});
 }
 }
};

export default PostController;
