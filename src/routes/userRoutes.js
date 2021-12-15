import express from "express";
import userContoller from "../controllers/usercontroller";
import UserContoller from "../controllers/usercontroller";
import DataChecker from "../Middlewares/data checker";
import Validator from "../Middlewares/validator";


const userRouter = express.Router();

userRouter.post("/register", Validator.newAccountRules(),
    Validator.validateInput,
    DataChecker.isEmailExist,
    UserContoller.CreateUser);
userRouter.post("/login", userContoller.userLogin);
userRouter.get("/all", UserContoller.getAllUser);
userRouter.get("/:id", UserContoller.getOneUser);
userRouter.delete("/:id", UserContoller.deleteOneUser);

export default userRouter;