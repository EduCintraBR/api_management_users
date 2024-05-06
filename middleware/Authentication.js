var jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {

    if (req.session.user != undefined){
        try {
            const authtoken = req.session.user.token;
            jwt.verify(authtoken, process.env.JWT_SECRET);
            next();
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