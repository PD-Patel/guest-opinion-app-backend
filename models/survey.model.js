import mongoose from "mongoose";

// Define the schema for storing survey responses
const SurveyResponseSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure one survey per email in a date-specific collection
  },
  surveyData: {
    type: Object, // Stores the survey details (e.g., issues, additional feedback)
    required: true,
  },
  date: {
    type: String, // Will store date in "YYYY-MM-DD" format
    required: true,
  },
});

// Pre-save hook to automatically set the `date` field
SurveyResponseSchema.pre("save", function (next) {
  if (!this.date) {
    const today = new Date();
    this.date = today.toISOString().split("T")[0]; // "YYYY-MM-DD"
  }
  next();
});

// Function to get or create a model dynamically for date-specific collections
const getSurveyModel = (dateTime) => {
  const formattedDateTime = dateTime.toISOString().split("T")[0]; // "YYYY-MM-DD"
  const collectionName = `surveys_response`; // Collection name
  return (
    mongoose.models[collectionName] ||
    mongoose.model(collectionName, SurveyResponseSchema, collectionName)
  );
};

export default getSurveyModel;
