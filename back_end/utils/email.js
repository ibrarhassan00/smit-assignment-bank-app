import dotenv from "dotenv"
dotenv.config()
import nodemailer from "nodemailer"

const sentEmail = (email,otp)=>{
const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Hello from Nodemailer",
      html: `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Our App</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f9fafb; font-family: 'Inter', Arial, sans-serif; color:#111827;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb; padding:60px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:720px; background-color:#ffffff; padding:80px 40px 60px; border-radius:0;">
            
            <!-- Logo -->
            <tr>
              <td align="center" style="padding-bottom:50px;">
                <img src="https://dummyimage.com/120x40/111827/ffffff&text=Your+Logo" alt="Company Logo" width="120" style="display:block;" />
              </td>
            </tr>

            <!-- Headline -->
            <tr>
              <td align="center" style="padding-bottom:16px;">
                <h1 style="font-size:32px; font-weight:700; margin:0; color:#111827;">
                  Welcome to Our App 👋
                </h1>
              </td>
            </tr>

            <!-- Subtext -->
            <tr>
              <td align="center" style="padding-bottom:40px;">
                <p style="font-size:18px; line-height:1.6; color:#374151; max-width:500px; margin:0 auto;">
                  We’re thrilled to have you here! Let’s get you started — your workspace is ready, and everything’s set for you to explore.
                </p>
              </td>
            </tr>

            <!-- CTA Button -->
            <tr>
              <td align="center" style="padding-bottom:80px;">
                <a href="#" style="background-color:#111827; color:#ffffff; text-decoration:none; padding:16px 36px; border-radius:6px; font-size:16px; font-weight:600; display:inline-block;">
                  ${otp}
                </a>
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td align="center" style="border-top:1px solid #e5e7eb; padding-top:40px;">
                <p style="font-size:14px; color:#6b7280; margin:0;">
                  If you didn’t sign up for this account, you can safely ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding-top:30px; font-size:13px; color:#9ca3af;">
                <p style="margin:0;">© 2025 Your Company, Inc.</p>
                <p style="margin:4px 0 0;">
                  <a href="#" style="color:#9ca3af; text-decoration:underline;">Unsubscribe</a>
                </p>
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

export default sentEmail
