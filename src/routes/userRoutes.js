import express from "express";
import UserContoller from "../controllers/userController";
import DataChecker from "../Middlewares/datachecker";
import Validator from "../Middlewares/validator";


const userRouter = express.Router();

userRouter.post("/register", Validator.newAccountRules(),
    Validator.validateInput,
    DataChecker.isEmailExist,
    UserContoller.CreateUser);
userRouter.post("/login", UserContoller.userLogin);
userRouter.get("/all", UserContoller.getAllUser);
userRouter.get("/:id", UserContoller.getOneUser);
userRouter.delete("/:id", UserContoller.deleteOneUser);

export default userRouter;