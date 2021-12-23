import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },

    tour: {
        type: mongoose.Schema.ObjectId,
        ref: "Tour"
    },

    status: {
        type: String,
        enum: ["pending", "accepted", "declined", "cancel"],
        default: "pending"
    }

},
    {
        timestamps: true,
    }
);

bookSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select: "firstName LastName email gender adress"

    }).populate({

        path: "tour"
    });

    next();
});

const Book = mongoose.model("Book", bookSchema)

export default Book;