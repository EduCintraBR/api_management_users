var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");

router.get('/', HomeController.index);
router.get('/user', UserController.listAllUsers);
router.get('/user/:id', UserController.findUserById);
router.post('/user', UserController.create);
router.put('/user', UserController.update);
router.delete('/user/:id', UserController.delete);
router.post('/user/recoverpassword', UserController.recoverPassword);
router.post('/user/changepassword', UserController.changePassword);

module.exports = router;