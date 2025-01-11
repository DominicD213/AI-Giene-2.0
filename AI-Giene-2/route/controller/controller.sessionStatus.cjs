const sessionStatus = (async (res,req) =>{
    console.log('Session status route accessed');
        if (req.session.user) {
            console.log('User session found:', req.session.user);
            return res.status(200).json({ active: true, user: req.session.user });
        } else {
            console.log('No active session');
            return res.status(401).json({ active: false });
        }
})

module.exports = sessionStatus;