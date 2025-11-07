const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bookRoutes = require("./routes/booksRoute");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/bookTracker")
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.log(" MongoDB Error:", err));

app.use("/api/books", bookRoutes);

app.use(express.static(path.join(__dirname, "../frontend")));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});


const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
