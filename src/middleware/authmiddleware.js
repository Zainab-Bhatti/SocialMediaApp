
const pathAuthentication= async (req,res,next)=>{
    try{
        const token = req.headers.autherization;
        console.log(token, token);
        next();
    }
    catch(error){
        return res.status(401).json({message:"Unauthorized Access!"});
    }
};

export default pathAuthentication;