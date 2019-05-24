let dbConnection = require('../../config/dbConnection');
let sequelize = require('sequelize');


class recupSessionService {

    static getLivraisonByCritaria(date, periodeID) {
        let query = `SELECT T_Recup_sessionAlimnt.id, nbrPreparation AS nbrPrepa, qteTotal, name AS machineName, nom AS rationName, periode AS periodName
                     FROM T_Recup_sessionAlimnt
                         INNER JOIN T_Machine TM ON T_Recup_sessionAlimnt.machine_ID = TM.id
                         INNER JOIN T_Nourriture TN ON T_Recup_sessionAlimnt.nourriture_ID = TN.id
                         INNER JOIN T_Periode_alimentation TPa on T_Recup_sessionAlimnt.periode_ID = TPa.id
                     WHERE sessionAlimnt_ID IN (SELECT id FROM T_Session_alimentation WHERE date = '${date}')`;
        if (periodeID != 'undefined') {
            query += `AND periode_ID = ${periodeID}`;
        }
        return dbConnection.query(query, {type: sequelize.QueryTypes.SELECT});
    }
}

module.exports = recupSessionService;
