let user = require('../models/T_User');
let dbConnection = require('../../config/dbConnection');
let sequelize = require('sequelize');


class userService {


    static verifyLogin(login) {
        return user.findOne({
            where: {
                login: login
            }, attributes: ['login']
        })

    }


    static findOneByCredinitals(userLogin, userPassword) {
        return user.findOne({
            where: {
                login: userLogin,
                password: userPassword
            }, attributes: ['password']

        })
    };

    static findByRole(role) {
        let query = `SELECT login FROM T_User WHERE role = ${role}`;
        return dbConnection.query(query, {type: sequelize.QueryTypes.SELECT});

    }

    static getUserBySession(recupSessionID) {
        let query = `SELECT user_login AS login FROM T_Session_alimentation
                        WHERE id = ( SELECT sessionAlimnt_ID FROM T_Recup_sessionAlimnt
                           WHERE T_Recup_sessionAlimnt.id = ${recupSessionID})`;
        return dbConnection.query(query, {type: sequelize.QueryTypes.SELECT});
    }

    static create(login) {
        return user.create({
            login: login,
            password: login
        })
    }

    static deleteByLogin(login) {
        let query = `DELETE FROM T_User WHERE login = '${login}'`;
        return dbConnection.query(query, {type: sequelize.QueryTypes.DELETE});
    }
}

module.exports = userService;
