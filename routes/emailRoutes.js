import express from "express";
import EmailLog from "../models/email.model.js";
import nodemailer from "nodemailer";
import getSurveyModel from "../models/survey.model.js";
import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

// Configure nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail", // Use your email provider
//   auth: {
//     user: process.env.EMAIL_USER, // Your email
//     pass: process.env.EMAIL_PASS, // Your email password or app password
//   },
// });

const resend = new Resend("re_f8MZ1Ngg_EDWB6VjpFDfxah6YGwBcHnBk");

const sentMails = async (ids) => {
  for (const doc of ids) {
    const { email, token } = doc;

    console.log("sending email  >>>>  ", email);
    const surveyLink = `${
      process.env.FRONTEND_URL
    }/survey?email=${encodeURIComponent(email)}&token=${encodeURIComponent(
      token
    )}`;
    try {
      resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Hello from Our Service",
        html: `
   <!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      color: #333333;
    }

     .logo {
            text-align: center;
        }
        .logo img {
            max-width: 150px;
        }
    .content {
      text-align: center;
      margin-bottom: 20px;
    }
    .content p {
      font-size: 16px;
      color: #555555;
    }
    .buttons {
      text-align: center;
      margin-top: 20px;
    }
    .buttons a {
      display: inline-block;
      margin: 10px;
      padding: 12px 20px;
      text-decoration: none;
      font-size: 16px;
      color: #ffffff;
      border-radius: 5px;
      transition: background 0.3s;
    }
    .buttons .like {
      background: #28a745;
    }
    .buttons .like:hover {
      background: #218838;
    }
    .buttons .dislike {
      background: #dc3545;
    }
    .buttons .dislike:hover {
      background: #c82333;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      font-size: 12px;
      color: #999999;
    }
  </style>
</head>
<body>
  <div class="email-container">
   <div class="logo">
            <img src="https://ik.imagekit.io/jqrvmzk4i/daysInnLogo.png?updatedAt=1741404797040" alt="Motel Logo">
        </div>
    <div class="header">
      <h1>We Value Your Feedback!</h1>
    </div>
    <div class="content">
      <p>Thank you for your recent stay at Days Inn by Wyndham Oglesby / Starved Rock State Park where you checked out on recently.</p>
      <p>We would love to know your feedback. Did you enjoy your stay?</p>
    </div>
    <div class="buttons">
      <a href="https://g.page/r/CX47PKYT0wOOEAE/review" class="like">👍 Yes, I loved it!</a>
      <a href=${surveyLink} class="dislike">👎 I dislike it</a>
    </div>
    <div class="footer">
      <p>Thank you for helping us improve!</p>
     <p>Looking forward to welcoming you back soon.</p>
    
    </div>
  </div>
</body>
</html>

`,
      });
    } catch (error) {
      console.error(`Error sending email to ${email}:`, error.message);
    }
  }
};

// Send an email to the new recipients
// const sendEmails = async (emails) => {
//   for (const doc of emails) {
//     const { email, token } = doc;

//     const surveyLink = `${
//       process.env.FRONTEND_URL
//     }/survey?email=${encodeURIComponent(email)}&token=${encodeURIComponent(
//       token
//     )}`;
//     const mailOptions = {
//       from: "your-email@gmail.com",
//       to: email, // Send email individually
//       subject: "Hello from Our Service",
//       html: `
//    <!DOCTYPE html>
// <html>
// <head>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       line-height: 1.6;
//       margin: 0;
//       padding: 0;
//       background-color: #f4f4f4;
//     }
//     .email-container {
//       max-width: 600px;
//       margin: 20px auto;
//       background: #ffffff;
//       padding: 20px;
//       border-radius: 10px;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//     }
//     .header {
//       text-align: center;
//       margin-bottom: 20px;
//     }
//     .header h1 {
//       margin: 0;
//       font-size: 24px;
//       color: #333333;
//     }

//      .logo {
//             text-align: center;
//         }
//         .logo img {
//             max-width: 150px;
//         }
//     .content {
//       text-align: center;
//       margin-bottom: 20px;
//     }
//     .content p {
//       font-size: 16px;
//       color: #555555;
//     }
//     .buttons {
//       text-align: center;
//       margin-top: 20px;
//     }
//     .buttons a {
//       display: inline-block;
//       margin: 10px;
//       padding: 12px 20px;
//       text-decoration: none;
//       font-size: 16px;
//       color: #ffffff;
//       border-radius: 5px;
//       transition: background 0.3s;
//     }
//     .buttons .like {
//       background: #28a745;
//     }
//     .buttons .like:hover {
//       background: #218838;
//     }
//     .buttons .dislike {
//       background: #dc3545;
//     }
//     .buttons .dislike:hover {
//       background: #c82333;
//     }
//     .footer {
//       text-align: center;
//       margin-top: 20px;
//       font-size: 12px;
//       color: #999999;
//     }
//   </style>
// </head>
// <body>
//   <div class="email-container">
//    <div class="logo">
//             <img src="https://ik.imagekit.io/jqrvmzk4i/daysInnLogo.png?updatedAt=1741404797040" alt="Motel Logo">
//         </div>
//     <div class="header">
//       <h1>We Value Your Feedback!</h1>
//     </div>
//     <div class="content">
//       <p>Thank you for your recent stay at Days Inn by Wyndham Oglesby / Starved Rock State Park where you checked out on recently.</p>
//       <p>We would love to know your feedback. Did you enjoy your stay?</p>
//     </div>
//     <div class="buttons">
//       <a href="https://g.page/r/CX47PKYT0wOOEAE/review" class="like">👍 Yes, I loved it!</a>
//       <a href=${surveyLink} class="dislike">👎 I dislike it</a>
//     </div>
//     <div class="footer">
//       <p>Thank you for helping us improve!</p>
//      <p>Looking forward to welcoming you back soon.</p>

//     </div>
//   </div>
// </body>
// </html>

// `,
//     };

//     try {
//       const info = await transporter.sendMail(mailOptions);
//       console.log(`Email sent to ${email}:`, info.response);
//     } catch (error) {
//       console.error(`Error sending email to ${email}:`, error.message);
//     }
//   }
// };
// Add a new email
router.post("/add", async (req, res) => {
  const { emails } = req.body;
  console.log("Incoming emails >>>", emails);

  if (!Array.isArray(emails) || emails.length === 0) {
    return res
      .status(400)
      .json({ message: "Please provide a valid array of emails." });
  }

  try {
    const now = new Date();

    const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;

    // Get all existing email docs for the provided list
    const existingDocs = await EmailLog.find({ email: { $in: emails } });

    // Filter out emails already sent within last 2 days
    const alreadyExistingEmails = [];
    const newEmails = [];

    for (const email of emails) {
      const existingDoc = existingDocs.find((doc) => doc.email === email);

      if (existingDoc) {
        const lastSent = new Date(
          existingDoc.lastSentAt || existingDoc.createdAt
        );
        const timeDiff = now - lastSent;

        if (timeDiff < TWO_DAYS_MS) {
          alreadyExistingEmails.push(email); // skip sending
          continue;
        }
      }

      newEmails.push(email); // eligible for sending
    }

    if (newEmails.length === 0) {
      return res.status(200).json({
        message: "No new emails to send (within cooldown period).",
        alreadyExistingEmails,
      });
    }

    // Create new documents for emails that passed the cooldown
    const newEmailDocs = newEmails.map((email) => ({
      email,
      token: uuidv4(),
      lastSentAt: now,
      status: "sent",
    }));

    const insertedDocs = await EmailLog.insertMany(newEmailDocs);

    // Send emails only to new ones
    await sentMails(newEmailDocs);

    res.status(201).json({
      message: "Emails added and sent successfully.",
      newEmails,
      alreadyExistingEmails,
      insertedDocs,
    });
  } catch (error) {
    console.error("Error adding emails:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/survey", async (req, res) => {
  try {
    const { date, email, surveyData, token } = req.body;

    if (!date || !email || !surveyData) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return res.status(400).json({ message: "Invalid date format." });
    }

    const SurveyModel = getSurveyModel(dateObj);

    const newSurvey = new SurveyModel({
      email,
      surveyData,
      date: dateObj.toISOString().split("T")[0], // Format: "YYYY-MM-DD"
    });
    await EmailLog.updateOne({ token }, { $set: { used: true } });

    await newSurvey.save();

    res.status(201).json({ message: "Survey submitted successfully." });
  } catch (err) {
    console.error("Survey submission error:", err);

    if (err.code === 11000) {
      return res
        .status(409)
        .json({ message: "Survey already submitted for this email." });
    }

    res.status(500).json({ message: "Internal server error." });
  }
});

router.post("/verify", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({
      status: "missing",
      message: "Token is required",
    });
  }

  try {
    const doc = await EmailLog.findOne({ token });

    if (!doc) {
      return res
        .status(404)
        .json({ status: "invalid", message: "Invalid token." });
    }

    if (doc.used) {
      return res.status(403).json({
        status: "used",
        message: "This survey link has already been used.",
      });
    }

    // Check expiration
    const now = new Date();
    const ageInDays = (now - doc.lastSentAt) / (1000 * 60 * 60 * 24);
    if (ageInDays > 7) {
      return res.status(403).json({
        status: "expired",
        message: "This survey link has expired.",
      });
    }

    // If valid
    return res.status(200).json({
      status: "valid",
      message: "Token is valid.",
      email: doc.email,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;
