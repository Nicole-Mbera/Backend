import userInfo from "../Models/users";
import bcrypt from "bcrypt";
import TokenAuth from "../helpers/tokenAuth";
import BookInfo from "../Models/book";
import tourInfo from "../Models/tour"

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
        user.password=null;
        const token= TokenAuth.tokenGenerator({user:user});

        return res.status(200).json ({message:"successfully logged in", token:token });
    }

    return res.status(400).json({error:"wrong password"});
    
}

//booking functions

static async bookTour (req,res){
const bookData={
user:req.user._id,
tour:req.params.id
};
   

const book = await BookInfo.create(bookData);

const tour= await tourInfo.findById(req.params.id);
const tourSeats= tour.seats-1;
await tourInfo.findByIdAndUpdate(req.params.id, {seats: tourSeats});

if (!book){
    return res.status(400).json({error:"failed to book"})
}
    return res.status(200).json({message:"booked for a tour successfully",data:book})
}


// get all booked tour

static async getAllBookedTour(req, res){

const bookedTour= await BookInfo.find();

if(!bookedTour){
    return res.status(400).json({error:"No booked tour found"})
}
    return res.status(200).json({message:"retrived all booked tour successfully",data:bookedTour})
}

static async getAllBookedTourByTourId (req,res){

    const bookedTour= await BookInfo.find({tour:req.params.id})
    if(!bookedTour){
        return res.status(400).json({error:"No booked tour found"})
    }
        return res.status(200).json({message:"retrived all booked tour successfully",data:bookedTour})
}



static async getAllBookedTourByUserId (req,res){

    const bookedTour= await BookInfo.find({user:req.user._id})
    if(!bookedTour){
        return res.status(400).json({error:"No booked tour found"})
    }
        return res.status(200).json({message:"retrived all booked tour successfully",data:bookedTour})
}
}






export default userContoller;
