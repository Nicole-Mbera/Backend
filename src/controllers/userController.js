import userInfo from "../Models/users";
import bcrypt from "bcrypt";

class userContoller {

    static async CreateUser(req, res) {

        const hashPassword= bcrypt.hashSync(req.body.password, 10)
        req.body.password= hashPassword;

        const user = await userInfo.create(req.body)
        if (!user) {
            return res.status(404).json({ error: "user not registered" })
        }
        return res.status(200).json({ message: "User created successfully", data: user });
    }





    static async getAllUser(req, res) {
        const users = await userInfo.find()
        if (!users) {
            return res.status(404).json({ error: "users not successfully retrieved" })
        }
        return res.status(200).json({ message: " successfully retrieved users", data: users });
    }



     static async getOneUser(req, res){
    const user = await userInfo.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ error: "user not found" });
    }

    return res.status(200).json({message:"User found",data:user});

}

static async deleteOneUser(req, res){
    const user = await userInfo.findByIdAndDelete(req.params.id);
    if (!user) {
        return res.status(404).json({ error: "user not found" });
    }

    return res.status(200).json({message:"User deleted",data:user});

}

static async userLogin(req,res,){
    const user= await userInfo.findOne({email:req.body.email})

    if(!user){
        return res.status(404).json({error:"user not foumd! first sign up"})
    }


    if (bcrypt.compareSync(req.body.password, user.password)){

        return res.status(200).json ({message:"successfully logged in"});
    }

    return res.status(400).json({error:"wrong password"});
    
}



}



export default userContoller;
