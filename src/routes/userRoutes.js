import express from "express";
import UserContoller from "../controllers/userController";
import DataChecker from "../Middlewares/dataChecker";
import Validator from "../Middlewares/validator";
import verifyToken from "../Middlewares/verifyToken";
import VerifyAccess from "../Middlewares/verifyAcess";
import userContoller from "../controllers/userController";


const userRouter = express.Router();

userRouter.post("/register", Validator.newAccountRules(),
    Validator.validateInput,
    DataChecker.isEmailExist,
    UserContoller.CreateUser);
userRouter.post("/login", UserContoller.userLogin);
userRouter.get("/all", UserContoller.getAllUser);
userRouter.get("/:id", UserContoller.getOneUser);
userRouter.delete("/:id", UserContoller.deleteOneUser);
userRouter.post("/book/:id", verifyToken, VerifyAccess("user"),userContoller.bookTour)

userRouter.get( "/book/me",verifyToken, VerifyAccess("user"),UserContoller.getAllBookedTourByUserId);
userRouter.get("/book/allBookedTour",UserContoller.getAllBookedTour);
userRouter.get( "/book/:id",verifyToken, VerifyAccess("admin"),UserContoller.getAllBookedTourByTourId);
export default userRouter;