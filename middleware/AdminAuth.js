module.exports = function (req, res, next) {
    if (req.session.user != undefined){
        try {
            if (req.session.user.role == 1) {
                next();
            } else {
                res.status(403);
                res.send("You don't have permission to access this route.");
                return;
            }
        } catch {
            res.status(401);
            res.send("You are not authenticated. Please make the login.");
            return;
        }
    } else {
        res.status(401);
        res.send("You are not authenticated. Please make the login.");
        return;
    }

}