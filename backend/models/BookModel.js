const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  pages: { type: Number, required: true },
  pagesRead: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["Read", "Re-read", "DNF", "Currently reading", "Returned Unread", "Want to read"],
    default: "Want to read",
  },
  format: {
    type: String,
    enum: ["Print", "PDF", "Ebook", "AudioBook"],
    required: true,
  },
  suggestedBy: String,
  finished: { type: Boolean, default: false },
});

bookSchema.pre("save", function (next) {
  this.finished = this.pagesRead >= this.pages;
  next();
});

module.exports = mongoose.model("Book", bookSchema);
