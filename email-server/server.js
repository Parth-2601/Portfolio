import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, // Use App Password if 2FA is enabled
  },
});

// Email sending route
app.post("/send-email", async (req, res) => {
  const { name: senderName, email, message } = req.body; // Rename `name` to `senderName`

  const mailOptions = {
    from: email,
    to: process.env.RECEIVER_EMAIL,
    subject: `Contact from ${senderName}`,
    text: `${message}\n\nFrom: ${email}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Serve static files from Vite build (if applicable)
if (process.env.NODE_ENV === "production") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  app.use(express.static("dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
  });
}

// Export the Express app
export default app;
