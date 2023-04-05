const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const otpMap = new Map();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'apptodo39@gmail.com',
        pass: 'vmhzbsgbubnuammf',
    },
});


//send OTP
const sendOTP = async (req, res) => {
    const { email } = req.body;
    console.log(email);
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(`Generated OTP for ${email}: ${otp}`); // Add this line to see the generated OTP
    otpMap.set(email, otp); // Store the OTP in the map
    const mailOptions = {
        from: 'apptodo39@gmail.com',
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP is ${otp}`,

    }
    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: 'Failed to send OTP' });
        } else {
            res.status(200).json({ message: 'OTP sent successfully' });
        }
    });
    res.status(200).json({ message: "OTP sent!" });
}


//verify OTP
const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        res.status(400).json({ message: 'Email and OTP are required' });
        return;
    }
    const storedOTP = otpMap.get(email);
    // console.log(Stored OTP for ${email}: ${storedOTP});
    if (storedOTP && storedOTP === otp) {
        otpMap.delete(email); // Remove OTP from the map after successful verification
        res.status(200).json({ message: 'OTP verified successfully' });
    } else {
        res.json({ message: 'Invalid OTP' });
    }
}

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);

module.exports = router