const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./.env" });

const sender_email = "lalalivecs@gmail.com";

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: sender_email,
    pass: "wtijnsbsiaazpblf",
  },
});



// sendForgotEmail(user.email, url, "Reset Password");

exports.sendForgotEmail = async (email, url, text) => {
    const mailOptions = {
        from: sender_email,
        to: email,
        subject: "Reset Password",
        html: `
        <h1>Reset Password</h1>

        <h2>Please click on given link to reset your password</h2>

        
        <p>${url}</p>
        `,
    };
    
    await transport.sendMail(mailOptions);
    }

    







