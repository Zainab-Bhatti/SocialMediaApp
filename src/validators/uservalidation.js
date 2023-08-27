import Joi from "joi";

const uservalidator ={
    create:(req,res,next)=>{
const schema = Joi.object({
 name: Joi.string()
 .max(30)
 .min(3)
 .alphanum()
 .required(),

 password: Joi.string()
 .max(25)
 .min(8)
 .alphanum()
 .required()
 .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

 email: Joi.string()
 .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
});

const validate=schema.validate(req.body);

console.log(validate);
if(!validate){
return res.status(403).json({message:"Validation Error!"});
} 
next();
 },
}
export default uservalidator;