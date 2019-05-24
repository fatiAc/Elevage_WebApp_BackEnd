let express = require('express');
let router = express.Router();
let periodeAlimentSrv = require('../service/periodeAlimentationService');
let nourritureSrv = require('../service/nourritureService');
let paddockSrv = require('../service/paddockService');
let detailAlimentSrv = require('../service/detailAlimentService');


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

router.get('/allPaddocks', function (req, res) {
    paddockSrv.allPaddocks()
        .then(data => {
            if (data != null) {
                res.status(200).send(data);
            }
        })
        .catch(err => {
            res.status(401).json(err);
        })
});

router.get('/detailAlimentByCritaria/:date/:periodID/:rationID/:paddockID', function (req, res) {
    detailAlimentSrv.detailAlimentByCritaria(req.params.date, req.params.periodID, req.params.rationID, req.params.paddockID)
        .then(data => {
            if (data != null) {
                res.status(200).send(data);
            }
        })
        .catch(err => {
            res.status(401).json(err);
        })
});


module.exports = router;
