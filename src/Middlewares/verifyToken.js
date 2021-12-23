import TokenAuth from "../helpers/tokenAuth";
import userInfo from "../Models/users";

const isUserExist= async(req, res, next)=>{
 try{

 const token= req.header("X-auth-token");
if(!token){

    return res.status(400).json({err:"please provide token"})
}
const data= TokenAuth.decodeToken(token);

const{name}= data;
if(name==="JsonWebTokenError"){

    return res.status(400).json({error:"JWT token is invalid"})
}

if (name==="TokenExpiredError"){
    return res.status(400).json({error:"expired token"})
}
req.user=data.user;

const user= await userInfo.findById(req.user._id);

if (!user){
return res.status(400).json({error:"user not found, you are unauthorised"})}
//  console.log(data);

return next();
 }


 catch(err){

    console.log(err);

 }
}

export default isUserExist;