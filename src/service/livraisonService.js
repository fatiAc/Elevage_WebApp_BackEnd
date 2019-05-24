let livraison = require('../models/T_Livraison');
let dbConnection = require('../../config/dbConnection');
let sequelize = require('sequelize');


class livraisonService {


    static getLivraisonByRecupSession(recupSessionID) {
        let query = `SELECT [id], [numero], [quantite] FROM [T_Livraison] AS [T_Livraison] 
                        WHERE [T_Livraison].[recup_sessionAlimnt_ID] = N'${recupSessionID}' ORDER BY [T_Livraison].[numero]`;

        return dbConnection.query(query, {type: sequelize.QueryTypes.SELECT});

    }
}

module.exports = livraisonService;
