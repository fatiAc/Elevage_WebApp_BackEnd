let sequelize = require('sequelize');
let dbConnection = require('../../config/dbConnection');

class detailAlimentService {

    static detailAlimentByCritaria(sessionDate, periodID, rationID, paddockID) {
        let query = `SELECT nbrVache, note, commentaire, TP.nom AS paddockName, TR.quantite, TN.nom AS rationName, TPa.periode, TR.moy_qte_vache AS moyElemnt, TSa.user_login
                        FROM T_Detail_session_alimnt
                          INNER JOIN T_Paddock TP on T_Detail_session_alimnt.paddock_ID = TP.id
                          INNER JOIN T_Periode_Ration TR ON T_Detail_session_alimnt.id = TR.detailAlimentation_ID
                          INNER JOIN T_Nourriture TN on TR.nourriture_ID = TN.id
                          INNER JOIN T_Periode_alimentation TPa on TR.periodeAlimentation_ID = TPa.id
                          INNER JOIN T_Session_alimentation TSa on T_Detail_session_alimnt.session_alimentation_ID = TSa.id
                              WHERE T_Detail_session_alimnt.session_alimentation_ID IN
                                   (SELECT id FROM T_Session_alimentation WHERE date = '${sessionDate}')`;
        if (periodID != 'undefined') {
            query += ` AND TR.periodeAlimentation_ID = ${periodID}`;
        }
        if (rationID != 'undefined') {
            query += ` AND TR.nourriture_ID = ${rationID}`;
        }
        if (paddockID != 'undefined') {
            query += ` AND T_Detail_session_alimnt.paddock_ID = ${paddockID}`;
        }

        query += ` ORDER BY TPa.periode, TN.nom`;
        return dbConnection.query(query, {type: sequelize.QueryTypes.SELECT});

    }
}

module.exports = detailAlimentService;
