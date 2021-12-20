import express from "express";
import TourContoller from "../controllers/tourcontroller";
import validator from "../Middlewares/validator";
import verifyToken from "../Middlewares/verifyToken";
import VerifyAccess from "../Middlewares/verifyAcess";
import tourContoller from "../controllers/tourcontroller";

const tourRouter = express.Router();

tourRouter.post("/create", verifyToken,
VerifyAccess("admin"),
validator.newTourRules(),
validator.validateInput,
TourContoller.CreateTour);
tourRouter.get("/allTour",TourContoller.getAllTour);
tourRouter.get("/:id",TourContoller.getOneTour);
tourRouter.delete("/:id", tourContoller.deleteOneTour);

export default tourRouter;