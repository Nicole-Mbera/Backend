import express from "express";
import TourContoller from "../controllers/tourcontroller";
import validator from "../Middlewares/validator"

const tourRouter = express.Router();

tourRouter.post("/create",  validator.newTourRules(),
validator.validateInput,
TourContoller.CreateTour)
tourRouter.get("/allTour",TourContoller.getAllTour)

export default tourRouter;