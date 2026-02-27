import express from "express";
import upload from "../middlewares/multer.js";
import customerAuth from "../middlewares/customerAuth.js";
import { complaintDocController } from "../controllers/compaintDocController.js";


const router = express.Router();



router.route('/upload').post([customerAuth,upload.array("files", 5)],complaintDocController)





export default router;