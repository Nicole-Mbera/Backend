import tourInfo from "../Models/tour";

class tourContoller{

    static async CreateTour(req,res){
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

}
export default tourContoller;