let dbConnection = require('../../config/dbConnection');
let sequelize = require('sequelize');
let ingredientParam = require('../models/T_Ingredient_param.js');


class ingredientParamService {


    static ingrdParamByLivraison(livraisonID) {
        let query = `SELECT qte_theorique AS qttTh,qte_reel, TI.nom AS ingredientName, T_Ingredient_param.id,difference FROM T_Ingredient_param
                          INNER JOIN T_Livraison TL ON T_Ingredient_param.livraison_ID = TL.id
                          INNER JOIN T_Ingredient TI ON T_Ingredient_param.ingredient_ID = TI.id
                               WHERE livraison_ID = ${livraisonID}
                               ORDER BY numero, ingredientName`;
        return dbConnection.query(query, {type: sequelize.QueryTypes.SELECT});
    }

    static findById(ingrdParamID) {
        return ingredientParam.findOne({
            where: {id: ingrdParamID}
        })
    }

    static updateQteReel(ingrdParamID, qte_reel, qteTh) {
        return this.findById(ingrdParamID)
            .then(ingredientParamData => {
                if (qte_reel != null) {
                    ingredientParamData.update({
                        qte_reel: qte_reel,
                        difference: qte_reel - qteTh
                    });
                    return ingredientParamData;
                }
            });
    }

}

module.exports = ingredientParamService;
