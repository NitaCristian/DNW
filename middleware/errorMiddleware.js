const handleError = (err, req, res, next) => {
    // Log the error
    console.error(err.stack);

    // Send a response to the client
    res.status(500).send('Internal Server Error');
}

module.exports = handleError