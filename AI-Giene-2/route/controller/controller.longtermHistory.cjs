
const longtermHistory = (async (req,res) => {
    if (!req.session.user) {
        return res.status(401).send('Unauthorized');
    }
    setImmediate(async() =>{
        try {
            const userId = req.session.user.id;
            const userSearchHistory = validator.escape(req.query.query || "");
    
            const query = { user: userId };
            if (userSearchHistory) {
                query.query = { $regex: userSearchHistory, $options: 'i' };
            }
    
            const userSearch = await UserQueries.find(query)
                .select('query response')
                .sort({ createdAt: 1 });
    
            return res.status(200).json(userSearch);
        } catch (error) {
            console.error('Error retrieving user queries:', error);
            return res.status(500).send('Internal Server Error');
        }
    })
})

module.exports = longtermHistory;