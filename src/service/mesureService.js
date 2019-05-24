let sequelize = require('sequelize');
let dbConnection = require('../../config/dbConnection');

class mesureService {

    static getMesureByCritaria(date, animalID, dateMin, dateMax) {
        let query = `SELECT poids, TA.snit,TU.login FROM T_Mesure
                       INNER JOIN T_Animal TA ON T_Mesure.animal_ID = TA.snit
                       INNER JOIN T_User TU on T_Mesure.user_login = TU.login 
                         WHERE 1=1`;
        if (dateMin != 'undefined') {
            query += ` AND dateMesure >= '${dateMin}'`;
        }
        if (dateMax != 'undefined' && dateMax != '') {
            query += ` AND dateMesure <= '${dateMax}'`;
        } else if (dateMin == 'undefined' && dateMax == 'undefined' && date != 'undefined') {
            query += ` AND dateMesure = '${date}'`;
        }
        if (animalID != 'undefined') {
            query += ` AND animal_ID = ${animalID}`;
        }
        return dbConnection.query(query, {type: sequelize.QueryTypes.SELECT});
    }
}

module.exports = mesureService;
