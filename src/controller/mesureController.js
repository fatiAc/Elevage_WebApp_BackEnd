let express = require('express');
let router = express.Router();
let animalSrv = require('../service/animalSerice');
let mesureSrv = require('../service/mesureService');
let userSrv = require('../service/userService');
let mouvmntSrv = require('../service/mouvementService');


router.get('/allAnimals', function (req, res) {
    animalSrv.allAnimals()
        .then(data => {
            if (data != null) {
                res.status(200).send(data);
            } else res.status(200).send(false);
        }).catch(err => {
        res.status(401).send(err);
    })
});

router.get('/mesureByCritaria/:date/:animalD/:dateMin/:DateMax', function (req, res) {
    mesureSrv.getMesureByCritaria(req.params.date, req.params.animalD, req.params.dateMin, req.params.DateMax)
        .then(data => {
            if (data != null) {
                res.status(200).send(data);
            } else res.status(200).send(false);
        }).catch(err => {
        res.status(401).send(err);
    })
});

router.get('/userByRole', function (req, res) {
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

router.get('/mouvmntByCritaria/:date/:userLogin/:snit', function (req, res) {
    mouvmntSrv.mouvmntByCritaria(req.params.date, req.params.userLogin, req.params.snit)
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
