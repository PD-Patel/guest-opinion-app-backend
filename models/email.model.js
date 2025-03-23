import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: "Invalid email format.",
    },
  },
  token: {
    type: String,
    required: true, // assuming you use this to validate survey access
    unique: true, // optional: make sure the token isn’t reused
  },

  status: {
    type: String,
    enum: ["sent", "failed", "pending"],
    default: "sent",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastSentAt: {
    type: Date,
    default: Date.now, // First time it's created = sent now
  },
  used: { type: Boolean, default: false },
});
const EmailLog = mongoose.model("EmailLog", emailSchema);

export default EmailLog;
