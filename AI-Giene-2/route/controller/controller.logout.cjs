const logout =  (async(res,req) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.clearCookie('connect.sid');
        return res.status(200).send('Logout successful');
    });
})

module.exports = logout;