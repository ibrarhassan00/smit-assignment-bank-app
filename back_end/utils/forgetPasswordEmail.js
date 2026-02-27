import dotenv from "dotenv"
dotenv.config()
import nodemailer from "nodemailer"

const sentEmailForgetPassword = (email,url)=>{
const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Forget Password",
    html: `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Reset Password</title>
    </head>
    <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f3f3f3;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f3f3; padding:50px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:10px; overflow:hidden; border:1px solid #e0e0e0;">
              <tr>
                <td style="padding:40px; text-align:center;">
                  <h1 style="color:#333333; font-size:24px; margin-bottom:20px;">Reset Your Password</h1>
                  <p style="color:#555555; font-size:16px; line-height:1.5; margin-bottom:30px;">
                    You recently requested to reset your password. Click the button below to proceed.
                  </p>
                  <a href="${url}" style="display:inline-block; padding:12px 25px; font-size:16px; color:#ffffff; background-color:#007BFF; border-radius:5px; text-decoration:none;">
                    Reset Password
                  </a>
                  <p style="color:#999999; font-size:14px; line-height:1.5; margin-top:30px;">
                    If you did not request this, please ignore this email.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="background-color:#f3f3f3; text-align:center; padding:20px; font-size:12px; color:#999999;">
                  &copy; 2025 Your Company. All rights reserved.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `,
    };

      const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS,
      },
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });
}

export default sentEmailForgetPassword
