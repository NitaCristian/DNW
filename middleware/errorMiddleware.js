/**
 * Middleware to handle errors that occur during the request processing pipeline.
 * It logs the error stack to the console and sends a generic "Internal Server Error" response.
 *
 * @param {Error} err - The error object.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Next middleware function.
 */
const handleError = (err, req, res) => {
    // Log the error stack to the console
    console.error(err.stack);

    // Send a "Internal Server Error" response with status code 500
    res.status(500).send('Internal Server Error');
};

module.exports = handleError;
