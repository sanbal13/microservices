const express = require("express");
const nodemailer = require("nodemailer");
require('dotenv').config();

const app = express();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    },
});

app.post('/send-email', async (req, res) => {
    const {email, message} = req.body;

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Order Notification",
        text:message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            return res.status(500).send(error.toString());
        }
        res.send("Email sent: " + info.response);
    });
});

app.listen(7000, () => console.log("Notification Service running on port 7000"));