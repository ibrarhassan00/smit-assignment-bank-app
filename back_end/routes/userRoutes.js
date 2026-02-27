import express from 'express';
import {signupController, singninController, userFatch}  from '../controllers/userController.js';
import otpVerifyController from "../controllers/auth/otpVerifyController.js"
import otpRestController from '../controllers/auth/otpRestController.js';
import forgetPasswordController from '../controllers/auth/forgetpasswordController.js';
import changePasswordController from "../controllers/auth/changePasswordController.js"
const router = express.Router();


router.post('/signup', signupController);
router.post('/signin', singninController);
router.post('/otp/verify',otpVerifyController)
router.post('/otp/reset',otpRestController)
router.post('/forget-password' , forgetPasswordController)
router.post('/change-password' , changePasswordController)
router.get('/user/fatch', userFatch);

export default router;