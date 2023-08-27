
import transport from "../../config/nodemailer.js"


const loginEmail=(msg,email,sub)=>{
   transport.sendMail({
    to:email,
    subject:msg,
    html:sub
    },
(err,res)=>{
    if(err) console.log(err);
    else console.log(res);
}
    );
};

export default loginEmail;