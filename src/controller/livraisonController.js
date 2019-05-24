let express = require('express');
let router = express.Router();
let userSrv = require('../service/userService');
let periodeAlimentSrv = require('../service/periodeAlimentationService');
let nourritureSrv = require('../service/nourritureService');
let recupSessionSrv = require('../service/recupSessionService');
let livraisonSrv = require('../service/livraisonService');
let ingredientParamSrv = require('../service/ingredientParamService');
let paddockOaramSrv = require('../service/paddockParamsService');

router.get('/findByRole', function (req, res) {
    userSrv.findByRole(2) //how affected machines to deliverys
        .then(data => {
            if (data != null) {
                res.status(200).send(data);
            }
        })
        .catch(err => {
            res.status(401).json(err);
        })
});

router.get('/allPeriods', function (req, res) {
    periodeAlimentSrv.allPeriodeAliment()
        .then(data => {
            if (data != null) {
                res.status(200).send(data);
            }
        })
        .catch(err => {
            res.status(401).json(err);
        })
});

router.get('/allNourritures', function (req, res) {
    nourritureSrv.allNourriture()
        .then(data => {
            if (data != null) {
                res.status(200).send(data);
            }
        })
        .catch(err => {
            res.status(401).json(err);
        })
});

router.get('/userOfSelectedRecupSession/:recupSessionID', function (req, res) {
    userSrv.getUserBySession(req.params.recupSessionID)
        .then(data => {
            if (data != null) {
                res.status(200).send(data);
            }
        })
        .catch(err => {
            res.status(401).json(err);
        })
});

router.get('/recupSessionByDateAndRation/:date/:periodID', function (req, res) {
    recupSessionSrv.getLivraisonByCritaria(req.params.date, req.params.periodID)
        .then(data => {
            if (data != null) {
                res.status(200).send(data);
            }
        })
        .catch(err => {
            res.status(401).json(err);
        })
});

router.get('/ingrediontParamOfLivraiso/:recupSessionID/:livrNum', function (req, res) {
    ingredientParamSrv.ingrdParamByLivraison(req.params.recupSessionID, req.params.livrNum)
        .then(data => {
            if (data != null) {
                res.status(200).send(data);
            }
        })
        .catch(err => {
            res.status(401).json(err);
        })
});

router.get('/livraisonsInfoByRecupSession/:recupSessionID', function (req, res) {
    livraisonSrv.getLivraisonByRecupSession(req.params.recupSessionID)
        .then(livraisonsData => {
            if (livraisonsData != null) {
                let livraisonsInfo = [];
                let ingredientParam = [];
                let paddockParam = [];
                for (let livraison of livraisonsData) {
                    ingredientParamSrv.ingrdParamByLivraison(livraison.id)
                        .then(ingredParamData => {
                            if (ingredParamData != null) {
                                paddockOaramSrv.paddocksParamByLivraison(livraison.id)
                                    .then(paddockParamData => {
                                        for (let item of ingredParamData) {
                                            ingredientParam.push({
                                                id: item.id,
                                                qttTh: item.qttTh,
                                                ingredientName: item.ingredientName,
                                                qte_reel: item.qte_reel,
                                                difference: item.difference
                                            });
                                        }
                                        for (let item of paddockParamData) {
                                            paddockParam.push({
                                                paddockName: item.paddockName,
                                                quantite: item.quantite,
                                                nbrElement: item.nbrElement,
                                                moyOfElement: parseFloat(Math.round(item.moyOfElement * 100) / 100).toFixed(2),
                                                commentaire: item.commentaire
                                            })
                                        }
                                        livraisonsInfo.push({
                                            livraisonQtte: livraison.quantite,
                                            livraisonNum: livraison.numero,
                                            ingredientParams: ingredientParam,
                                            paddockParams: paddockParam
                                        });
                                        ingredientParam = [];
                                        paddockParam = [];
                                        if (livraisonsInfo.length == livraisonsData.length) {
                                            res.status(200).send(livraisonsInfo);
                                        }
                                    })
                            }
                        })
                }
            }
        })
        .catch(err => {
            res.status(401).json(err);
        })
});


router.put('/setQteReelOfIngredntParam/:ingrednParamID/:qteReel/:qteTh', function (req, res) {
    ingredientParamSrv.updateQteReel(req.params.ingrednParamID, req.params.qteReel, req.params.qteTh)
        .then(data => {
            if (data != null) {
                console.log('update succes ====== v =====  ', data)
                res.status(200).send(data);
            } else res.status(200).send('ooooooooooooooooo');
        }).catch(err => {
        res.status(401).send(err);
    })
});

module.exports = router;
