const validator = require('validator');

const sanitizedRequest = (query, res) => {
    // Check if the query is alphanumeric
    if (!validator.isAlphanumeric(query)) {
        return res.status(400).send('The query must be alphanumeric');
    }

    // Trim and escape the query to ensure it's safe for use
    const sanitizedQuery = validator.escape(query.trim());

    return { query: sanitizedQuery };
};

module.exports = sanitizedRequest;
