import mongoose from "mongoose";




const tourSchema = new mongoose.Schema(
    {
tourName:{
    type:String,
    required:true,
},

tourDescription:{
    type:String,
    required:true,
},
dateScheduled:{
    type:Date,
required:true,
},

dueDate:{
    type:Date,
required:true,
},


location:{
type:String,
required:true,
},

seats:Number,
price:Number,

images:[
    {
    type:String,
    },
],

},

{
    timestamps:true,
}
    );

    const tour =mongoose.model("Tour",tourSchema);

    export default tour;