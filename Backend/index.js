const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const deviceRoutes = require("./routes/devices");
const interfaceRoutes = require("./routes/interfaces");
const logRoutes = require("./routes/logs");

app.use("/devices", deviceRoutes);
app.use("/interfaces", interfaceRoutes);
app.use("/logs", logRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Artemis API is running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Artemis API running on http://localhost:${PORT}`);
});