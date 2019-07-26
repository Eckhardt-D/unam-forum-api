require("./services/version-check")(); // NODE version consistency.
const { PORT } = require("./config"); // Check file for info.
require("./database/initialize"); // Start database connection and seed.

// Imported routes
const postRoutes = require("./routes/posts");
const categoryRoutes = require("./routes/categories");
const authorRoutes = require("./routes/authors");

// External dependencies.
const express = require("express");
const app = express();
const { join } = require("path");

// Middlewares
app.use(express.json());

// Routes
app.use(express.static(join(__dirname, "static/.vuepress/dist")));
app.use("/v1/posts", postRoutes);
app.use("/v1/categories", categoryRoutes);
app.use("/v1/authors", authorRoutes);

// Starting the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
