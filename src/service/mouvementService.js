let sequelize = require('sequelize');
let dbConnection = require('../../config/dbConnection');

class mouvementService {

    static mouvmntByCritaria(date, userLogin, snit) {
        let query = `SELECT dateMvnt, animal_ID AS snit, user_login, TP_Src.nom AS paddockSrc, TP_Dest.nom AS paddockDest FROM T_Mouvement
                         INNER JOIN T_Paddock TP_Src on T_Mouvement.paddock_src = TP_Src.id
                         INNER JOIN T_Paddock TP_Dest on T_Mouvement.paddock_dest = TP_Dest.id
                             WHERE 1 = 1`;
        if (date != 'undefined') {
            query += ` AND dateMvnt = '${date}'`;
        }
        if (snit != 'undefined') {
            query += ` AND animal_ID = '${snit}'`;
        }
        if (userLogin != 'undefined') {
            query += ` AND user_login = '${userLogin}'`;
        }
        return dbConnection.query(query, {type: sequelize.QueryTypes.SELECT});
    }
}

module.exports = mouvementService;
