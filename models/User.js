var knex = require("../database/connection");
var bcrypt = require("bcrypt");
const PasswordToken = require("./PasswordToken");
class User {

    async create(email, password, name){
        try {
            // Verify if email exists
            var result = await this.existsEmail(email);

            if (result){
                throw new Error('E-mail already exists in database.');
            }

            var passwordHashed = await bcrypt.hash(password, 10);
            await knex
                .insert({email, password: passwordHashed, name, role: 0})
                .table("users");
        } catch (err) {
            throw new Error(err);
        }
    }

    async existsEmail(email) {
        try {
            var result = await knex
            .select("*")
            .from("users")
            .where({email: email});
        
            if (result.length > 0){
                return true;
            } else {
                return false;
            }

        } catch (err) {
            return false;
        }
    }

    async listAllUsers(){
        try {
            var users = await knex.select(["id", "name", "email", "role"]).table("users");
            return users;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async findById(id){
        try {
            var users = await knex.select(["id", "name", "email", "role"]).where({id: id}).table("users");
            if(users.length > 0){
                return users[0];
            } else {
                return undefined;
            }
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async findByEmail(email){
        try {
            var users = await knex.select(["id", "name", "password", "email", "role"]).where({email: email}).table("users");
            if(users.length > 0){
                return users[0];
            } else {
                return undefined;
            }
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async update(id, email, name, role){
        var user = await this.findById(id);
        if (user != undefined){
            var editUser = {};

            if(email != undefined){
                if(email != user.email){
                    var emailExists = await this.existsEmail(email);
                    if(!emailExists){
                        editUser.email = email;
                    } else {
                        throw new Error("E-mail already exists in the database.");
                    }
                }
            }

            if(name != undefined){
                editUser.name = name;
            }
            if(role != undefined){
                editUser.role
            }
        }

        try {
            await knex.update(editUser).where({id: id}).table("users");
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async delete(id){
        try {
            var user = await this.findById(id);
            if(user != undefined){
                await knex.delete().where({id: id}).table("users");
            }
        } catch (err) {
            throw new Error(err.message);
        }
    } 

    async changePassword(newPassword, user_id, token) {
        var newPasswordHashed = await bcrypt.hash(newPassword, 10);
        await knex.update({password: newPasswordHashed}).where({id: user_id}).table("users");
        await PasswordToken.setUsedToken(token);
    }

    async generateToken(email) {
        try {
            var usr = await this.findByEmail(email);
            if (usr != undefined){
                var token = await PasswordToken.create(usr.id);
                if (token.status){
                    return { status: true, token: token.tokenGenerated }
                } else {
                    return { status: false, error: token.error }
                }
            } else {
                throw new Error("E-mail not exists!");
            }
        } catch (err) {
            return { status: false,  error: err.message}
        }
        
    }
}

module.exports = new User();