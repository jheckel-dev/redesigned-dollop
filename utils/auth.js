const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirected('./login');
    } else {
        next();
    }
};

module.exports = withAuth;