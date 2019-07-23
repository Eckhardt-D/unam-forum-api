require("./services/version-check")(); // NODE version consistency.
const { PORT } = require("./config"); // Check file for info

// External dependencies
const express = require("express");
const app = express();

// Routes
app.get("*", (_, res) => res.send("Welcome, bugling."));

// Starting the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
