import TokenAuth from "../helpers/tokenAuth";

const isUserExist= async(req, res, next)=>{
 try{

 const token= req.header("X-auth-token");
if(!token){

    return res.status(400).json({err:"please provide token"})
}
const data= TokenAuth.decodeToken(token);
 console.log(data);
req.user=data.user;

return next();
 }


 catch(err){

    console.log(err);

 }
}

export default isUserExist;