import { transporter } from "../config/mailer.js";
import { generateOTP } from "../utils/generateOtp.js";

const otpStore = {}; // temporary storage

// 📧 Send OTP
export const sendOtp = async (req, res) => {
    console.log("👍👍👍👍👍👍👍");

    const { email } = req.body;
    console.log(email);

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const otp = generateOTP();
    console.log(otp);

    otpStore[email] = otp;
console.log(process.env.EMAIL_USER);

    try {
        await transporter.sendMail({
            from: `"Wavefy" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Email Verification OTP",
            html: `
        <h2>Verify Your Email</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      `,
        });

        res.json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "OTP not sent" });
    }
};

// ✅ Verify OTP
export const verifyOtp = (req, res) => {
    const { email, otp } = req.body;

    if (otpStore[email] && otpStore[email] == otp) {
        delete otpStore[email];
        return res.json({ success: true, message: "OTP verified" });
    }

    res.status(400).json({ success: false, message: "Invalid OTP" });
};
