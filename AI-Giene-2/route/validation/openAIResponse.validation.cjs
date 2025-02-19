const validator = require('validator');
const removeAllWhitespaces = (str) => {
    return str.replace(/\s+/g, '');  // This removes all whitespace characters
};

// Updated sanitizedRequest (without using res)
const sanitizedRequest = (query) => {
    // Remove all whitespace from the query
    const queryWithoutSpaces = removeAllWhitespaces(query);

    // Check if the query is alphanumeric after removing whitespace
    if (!validator.isAlphanumeric(queryWithoutSpaces)) {
        return { error: 'The query must be alphanumeric' };
    }

    // Escape the sanitized query to ensure it's safe for use
    const sanitizedQuery = validator.escape(queryWithoutSpaces);
    console.log(sanitizedQuery);

    return { query: sanitizedQuery };
};


module.exports = sanitizedRequest;