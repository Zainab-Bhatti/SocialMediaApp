import bcryptjs from "bcryptjs";
import userModel from "../model/User.js";
import postModel from "../model/Post.js";



const UserController = {
  getAll: async (req, res) => {
    const users = await userModel.find();
    return res.json(users);
  },
  getSingle: async (req, res) => {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  },
  create: async (req, res) => {
    const body = req.body;
    const hashPassword=await bcryptjs.hash(body.password,12);
    
    const user = await userModel.create({
      name: body.name,
      email: body.email,
      password: hashPassword 
    });
    return res.json({ message: "User Successfully Registered!",user});
  },
  update: async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.name = body.name;
    user.email = body.email;

    await user.save();
    return res.json({ message: "User Updated", user });
  },

  deleteUser: async (req,res)=>{
    const body = req.body;
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    else{
      await user.delete();
      return res.json({message: "User deleted!"});
    }
  },
  checkPosts: async(req,res)=>{
    const id=req.params.id;
    const post=await postModel.find();
    if(id!=post.id){
      return res.status(404).json({ message: "No post found" });
    }
    else{
      return res.json(post);
    }    
  },

 

searchUser: async (req,res)=>{
 const search=req.body.search;
  try{
  const docs = await userModel.find({$or: [{name: {$regex: `${search}`,$options:'i'} },{email: {$regex: `${search}`,$options:'i'} }]} );
  return res.json(docs);
}
catch(error){
  console.log(error);
 return  res.status(500).json({message:'an error occured'});
}
}
};

export default UserController;
