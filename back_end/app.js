import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authUserRoutes from "./routes/userRoutes.js"
import bankRoutes from './routes/bankRoutes.js';
import cors from "cors"
import complaintRoutes from './routes/complaints.js';
import complaintDoc from "./routes/userDocRotes.js";
import { cloudinaryConfig } from "./config/cloudnary.js"

const app = express();
// Load env variables
dotenv.config();

// Connect to Database
cloudinaryConfig()
connectDB();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/user/auth", authUserRoutes);
app.use("/api/v1/bank", bankRoutes);
app.use("/api/v1/complaint", complaintRoutes);
app.use("/api/v1/doc",complaintDoc );

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});