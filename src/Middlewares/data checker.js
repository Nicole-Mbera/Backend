import UserInfos from "../Models/users";

class DataChecker{
    //check email

    static async isEmailExist(req,res,next){

        const user= await UserInfos.findOne( { email: req.body.email})
   

    if(!user){
        return next();
    }

    return res.status(401).json({error:"Email already exist"})
}
}
export default DataChecker;