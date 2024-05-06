var User = require("../models/User");
var PasswordToken = require("../models/PasswordToken");

class UserController {

    async index(req, res){
        res.send("Bem vindo a rota de usuarios")
    }

    async create(req, res) {
        try {
            var { name, email, password } = req.body;

            if(email == undefined || email == "") {
                throw new Error('Invalid e-mail');
            }

            await User.create(email, password, name);

            res.status(200);
            res.send("Tudo Ok")
        } catch (err) {
            res.status(400);
            res.send("Catch =>" + err.message);
        }
    }

    async listAllUsers(req, res){
        try {
            var users = await User.listAllUsers();

            res.status(200);
            res.json(users);
        } catch (err) {
            res.status(400);
            res.send(err.message);
        }
    }

    async findUserById(req, res){
        try {
            var {id} = req.params;
            var user = await User.findById(id);

            if (user == undefined){
                res.status(404);
                res.json(user);
                return;
            }
            
            res.status(200);
            res.json(user);
        } catch (err) {
            res.status(400);
            res.send(err.message);
        }
    }

    async update(req, res){
        try {
            var {id, name, email, role} = req.body;
            
            await User.update(id, email, name, role);
            
            res.status(204);
            res.send("User updated successfully.");
        } catch (err) {
            res.status(400);
            res.send(err.message);
        }
    }

    async delete(req, res){
        try {
            var {id} = req.params;
            await User.delete(id);

            res.status(204);
            res.send("User deleted successfully.")
        } catch (err) {
            res.status(400);
            res.send(err.message);
        }
    }

    async recoverPassword(req, res) {
        var { email } = req.body;
        var result = await User.generateToken(email);

        if (result.status){
            res.status(200);
            res.send("" + result.token);
        } else {
            res.status(400);
            res.send(result.error);
        }
    }

    async changePassword(req, res) {
        try {
            var { token, password } = req.body;
            var result = await PasswordToken.validateToken(token);
            if (result.status){
                await User.changePassword(password, result.objToken.user_id, result.objToken.token);
                res.status(200);
                res.send("Password changed.")
            } else {
                throw new Error("Sorry it's not possible to change the password");
            }
        } catch (err) {
            res.status(400);
            res.send(err.message);
        }
        
    }
}

module.exports = new UserController();