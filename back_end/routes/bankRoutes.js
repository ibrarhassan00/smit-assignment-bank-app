import express from "express"
import { addBankController } from "../controllers/addBankController.js";
import {bankDropdownController} from "../controllers/bankDropdownController.js"

const bankRoutes = express.Router()


bankRoutes.route("/add").post(addBankController)
bankRoutes.route("/dropdown").get(bankDropdownController)


export default bankRoutes ;
