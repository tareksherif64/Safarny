const mongoose = require("mongoose");

// Schema for Historical Places
const historicalPlaceSchema = new mongoose.Schema(
  {
    description: { type: String, required: true }, // Description of the historical place
    pictures: [String], // Array of image URLs (multiple pictures)
    location: { type: String, required: true }, // Location (address or name of the place)
    openingHours: { type: String, required: true }, // Opening hours (e.g., "9:00 AM - 5:00 PM")
    ticketPrices: { type: Number, required: true }, // Ticket price for entry
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }], // Reference to tags
    createdby: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the ToursimGovernor who created the historical place
    vistitedby: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Reference to the tourists who visited the historical place
  },
  {
    collection: "historicalplaces", // Name of the collection in MongoDB
  }
);

// Creating the model for historical places
const HistoricalPlace = mongoose.model(
  "historicalplaces",
  historicalPlaceSchema
);

module.exports = HistoricalPlace;
