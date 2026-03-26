const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactroutes");
const errorHandler = require("./middleware/errorhandler");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/contacts", contactRoutes);

// 🔥 SERVE FRONTEND (ADD THIS)
const __dirnameResolved = path.resolve();
app.use(express.static(path.join(__dirnameResolved, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirnameResolved, "../frontend/dist/index.html"));
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));