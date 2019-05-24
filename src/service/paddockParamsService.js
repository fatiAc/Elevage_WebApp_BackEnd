let dbConnection = require('../../config/dbConnection');
let sequelize = require('sequelize');

class paddockParamsService {


    static paddocksParamByLivraison(livraisonID) {
        let query = `SELECT quantite, TP.nom AS paddockName,nbrElement, moyOfElement, commentaire FROM T_Paddock_param
                           INNER JOIN T_Paddock TP ON T_Paddock_param.paddock_ID = TP.id
                           WHERE livraison_ID = ${livraisonID}`;
        return dbConnection.query(query, {type: sequelize.QueryTypes.SELECT});
    }

}

module.exports = paddockParamsService;
