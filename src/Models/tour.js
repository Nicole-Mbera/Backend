import mongoose from "mongoose";
import user from "./users";




const tourSchema = new mongoose.Schema(
    {
        tourName: {
            type: String,
            required: true,
        },

        tourDescription: {
            type: String,
            required: true,
        },
        dateScheduled: {
            type: Date,
            required: true,
        },

        dueDate: {
            type: Date,
            required: true,
        },


        location: {
            type: String,
            required: true,
        },

        seats: Number,
        price: Number,

        images: [
            {
                type: String,
            },


        ],
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
    },

    {
        timestamps: true,
    }
);

tourSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select: "firstName email adress"

    });
    next();
})
const tour = mongoose.model("Tour", tourSchema);

export default tour;