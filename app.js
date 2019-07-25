require("./services/version-check")(); // NODE version consistency.
const { PORT } = require("./config"); // Check file for info.
require("./database/initialize"); // Start database connection and seed.

// Imported routes
const postRoutes = require("./routes/posts");
const categoryRoutes = require("./routes/categories");

// External dependencies
const express = require("express");
const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/v1/posts", postRoutes);
app.use("/v1/categories", categoryRoutes);

// Starting the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
