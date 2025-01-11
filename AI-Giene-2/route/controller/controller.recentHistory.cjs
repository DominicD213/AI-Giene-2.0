const Giene = require("../models/schema.cjs");

const recentHistory = (async(res,req) =>{
    if (!req.session.user) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const userId = req.session.user.id;
        const userQueries = await Giene.UserQueries.find({ user: userId })
            .select('query response');

        return res.status(200).json(userQueries);
    } catch (error) {
        console.error('Error retrieving user queries:', error);
        return res.status(500).send('Internal Server Error');
    }
})

module.exports = recentHistory;