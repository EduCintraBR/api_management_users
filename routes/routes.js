var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
var Auth = require("../middleware/Authentication");
var AdminAuth = require("../middleware/AdminAuth");

router.get('/', HomeController.index);
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);
router.get('/user', Auth, UserController.listAllUsers);
router.get('/user/:id', Auth, AdminAuth, UserController.findUserById);
router.post('/user', Auth, AdminAuth, UserController.create);
router.put('/user', Auth, AdminAuth, UserController.update);
router.delete('/user/:id', Auth, AdminAuth, UserController.delete);
router.post('/user/recoverpassword', UserController.recoverPassword);
router.post('/user/changepassword', UserController.changePassword);

module.exports = router;