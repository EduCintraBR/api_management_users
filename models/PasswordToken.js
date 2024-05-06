var knex = require("../database/connection");
var User = require("./User")
const { v4: uuidv4 } = require("uuid");

class PasswordToken {
    async create(user_id){
        try {
            var token = await this.getTokenByUserId(user_id);
            if (token == undefined){
                return this.generateAndSaveToken(user_id);
            } else {
                var [existsTokenNotUsed] = await knex.select().where({token: token, used: 0}).table("passwordtokens");
                if (existsTokenNotUsed == undefined){
                    return this.generateAndSaveToken(user_id);
                } else {
                    throw new Error("Exists a token generated before, and it's not used");
                }
            }
        } catch (err) {
            return { status: false, error: err.message };
        }
    }

    async validateToken(token){
        try {
            var result = await knex.select().where({token: token}).table("passwordtokens");

            if (result.length > 0) {
                var tkn = result[0];
                if (tkn.used == 0){
                    return { status: true , objToken: tkn};
                } else {
                    return { status: false, error: "Token already used" };
                }
            } else {
                return {status: false, error: "Invalid Token"};
            }
        } catch (err) {
            return {status: false, error: err.message};
        }
    }

    async setUsedToken(token){
        await knex.update({used: 1}).where({token: token}).table("passwordtokens");
    }

    async getTokenByUserId(id){
        var [result] = await knex.select("token").where({user_id: id}).table("passwordtokens");
        return result ? result.token : undefined
    }

    async generateAndSaveToken(user_id){
        var tokenGenerated = uuidv4();
        await knex
            .insert({
                user_id: user_id,
                token: tokenGenerated,
                used: 0
            })
            .table("passwordtokens");
        return { status: true, tokenGenerated: tokenGenerated };
    }
}

module.exports = new PasswordToken();