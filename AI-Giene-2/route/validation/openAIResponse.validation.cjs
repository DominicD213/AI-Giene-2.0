const validator = require('validator');
const removeAllWhitespaces = (str) => {
    return str.replace(/\s+/g, '');  // This removes all whitespace characters
};

const sanitizedRequest = (query, res) => {
    if (!res) {
        console.error("Response object is undefined.");
        return { error: "Response object is missing" };
    }

    // Remove all whitespace from the query
    const queryWithoutSpaces = removeAllWhitespaces(query);

    // Check if the query is alphanumeric after removing whitespace
    if (!validator.isAlphanumeric(queryWithoutSpaces)) {
        return res.status(400).send({ error: 'The query must be alphanumeric' });
    }

    // Escape the sanitized query to ensure it's safe for use
    const sanitizedQuery = validator.escape(queryWithoutSpaces);

    return { query: sanitizedQuery };
};

module.exports = sanitizedRequest;