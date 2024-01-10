require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const dbInstance = require("./utils/dbInstance");

const vehiclesRouter = require("./routes/vehicles");
const userRoute = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 4040;

/**
 * Sets up middleware for parsing JSON bodies.
 */
app.use(bodyParser.json());

/**
 * Sets up middleware for parsing URL-encoded bodies with extended options.
 */
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Sets up logger middleware for development.
 */
app.use(logger("dev"));

/**
 * Sets up middleware for parsing JSON bodies.
 */
app.use(express.json());

/**
 * Sets up middleware for parsing URL-encoded bodies with extended options.
 */
app.use(express.urlencoded({ extended: false }));

/**
 * Parses cookies attached to the request object.
 */
app.use(cookieParser());

/**
 * Configures Cross-Origin Resource Sharing (CORS) middleware.
 * @param {Object} options - Configuration options for CORS.
 * @param {string|string[]} [options.origin=*] - Specifies the allowed origins.
 */
app.use(
  cors({
    origin: "*",
  })
);

/**
 * Routes requests to the user for the root path.
 */
app.use("/", userRoute);

/**
 * Middleware handling 404 errors.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
app.use(function (req, res, next) {
  next(createError(404));
});

/**
 * Error handling middleware.
 * @param {Error} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

/**
 * Establishes a connection to the database and starts the Express app.
 * @returns {Promise<void>} - Promise resolving to undefined.
 */
dbInstance
  .establishDBConnection()
  .then(() => {
    /**
     * Starts the Express app listening on the specified port.
     * @param {number} PORT - The port number.
     */
    app.listen(PORT, function () {
      console.log(`API running at port http://localhost:${PORT}`);
    });
  })
  .catch((e) => {
    console.log(`Failed to start express app: ${e}`);
  });

/**
 * Exports the configured Express app.
 */
module.exports = app;
