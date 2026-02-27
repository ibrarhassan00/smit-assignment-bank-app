import express from "express";
import customerAuth from "../middlewares/customerAuth.js";
import {createComplaintController} from "../controllers/userCompalint.js"
import { fatchComplaintController } from "../controllers/complaint/fatchComplaintController.js";

import { fatchComplaintControllerBank_Officer } from "../controllers/complaint/fatchComplaintController-bank_Officer.js";
import bank_officerAuth from "../middlewares/bank_officerAuth.js";
const complaintRoutes = express.Router()

complaintRoutes.route("/add").post(customerAuth,createComplaintController)
complaintRoutes.route("/get-all-complaint").get(customerAuth,fatchComplaintController)
complaintRoutes.route("/get-all-complaint-bank_officer").get(bank_officerAuth,fatchComplaintControllerBank_Officer)


export default complaintRoutes


