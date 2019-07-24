require("./services/version-check")(); // NODE version consistency.
const { PORT } = require("./config"); // Check file for info.
require("./database/initialize"); // Start database connection and seed.

// Imported routes
const postRoutes = require("./routes/posts");

// External dependencies
const express = require("express");
const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/v1/posts", postRoutes);

// Starting the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
