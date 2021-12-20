import tour from "../Models/tour";
import tourInfo from "../Models/tour";

class tourContoller{

    static async CreateTour(req,res){
        req.body.user=req.user._id;
        const tour = await tourInfo.create(req.body)
        if (!tour){
            return res.status(404).json({error:"Tour not registered"}) 
        }
        return res.status(200).json ({message:"Tour registered successfully", data: tour});
    }




    
    static async getAllTour(req,res){
        const tours = await tourInfo.find()
        if (!tours){
            return res.status(404).json({error:"Tours not successfully retrieved"}) 
        }
        return res.status(200).json ({message:" Successfully retrieved tours", data: tours});
    }

    static async getOneTour(req, res){
        const tour = await tourInfo.findById(req.params.id);
        if (!tour) {
            return res.status(404).json({ error: "tour not found" });
        }
    
        return res.status(200).json({message:"tour found",data:tour});
    
    }
    
    static async deleteOneTour(req, res){
        const tour = await tourInfo.findByIdAndDelete(req.params.id);
        if (!tour) {
            return res.status(404).json({ error: "tour not found" });
        }
    
        return res.status(200).json({message:"tour deleted",data:tour});
    
    }
    

}
export default tourContoller;