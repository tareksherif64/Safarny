const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historicalTagsSchema = new Schema(
  {
    historicalPlaces: [
      {
        type: Schema.Types.ObjectId,
        ref: "HistoricalPlace", // Reference to the HistoricalPlace model
      },
    ],
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const HistoricalTags = mongoose.model("HistoricalTags", historicalTagsSchema);
module.exports = HistoricalTags;
