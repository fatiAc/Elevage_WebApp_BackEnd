let express = require('express');
let router = express.Router();
let typePaddockSrv = require('../service/typePaddockService');
let paddockSrv = require('../service/paddockService');
let animalSrv = require('../service/animalSerice');
let ingredientSrv = require('../service/ingredientService');
let nourritureSrv = require('../service/nourritureService');
let formuleSrv = require('../service/formuleService');
let machineSrv = require('../service/machineService');
let machineSpecialiteService = require('../service/machienSpecialiteService');
let periodeAlimentSrv = require('../service/periodeAlimentationService');
let userSrv = require('../service/userService');


router.get('/allTypesPaddock', function (req, res) {
    typePaddockSrv.allTypesPaddocks()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(401).send(err);
        })
});

router.get('/allNourriture', function (req, res) {
    nourritureSrv.allNourriture()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(401).send(err);
        })
});

router.get('/allIngrdnt', function (req, res) {
    ingredientSrv.allIngrednt()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(401).send(err);
        })
});

router.get('/allPaddocks', function (req, res) {
    paddockSrv.allPaddocks()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(401).send(err);
        })
});

router.post('/createTypePaddock', function (req, res) {
    typePaddockSrv.findByName(req.body.type)
        .then(data => {
            if (data == null) {
                typePaddockSrv.create(req.body.type)
                    .then(data => {
                        res.status(200).send(true);
                    })
                    .catch(err => {
                        res.status(401).json(err);
                    })
            } else res.status(200).send(false);

        }).catch(err => {
        res.status(401).send(err);
    })

});

router.put('/updatTypPaddock/:type/:newType', function (req, res) {
    typePaddockSrv.editType(req.params.type, req.params.newType)
        .then(data => {
            res.status(200).send(data);
        }).catch(err => {
        res.status(401).send(err);
    })
});

router.delete('/deleteByType/:type', function (req, res) {
    typePaddockSrv.deleteByType(req.params.type)
        .then(data => {
            res.status(200).send(data);
        }).catch(err => {
        res.status(401).send(err);
    })
});

router.post('/createPaddock', function (req, res) {
    paddockSrv.findByName(req.body.paddockName)
        .then(data => {
            if (data == null) {
                paddockSrv.create(req.body.paddockName, req.body.typPaddock)
                    .then(data => {
                        res.status(200).send(true);
                    })
                    .catch(err => {
                        res.status(401).json(err);
                    })
            } else res.status(200).send(false);

        }).catch(err => {
        res.status(401).send(err);
    })
});

router.put('/updatPaddock/:name/:newName/:newTypPaddock', function (req, res) {
    paddockSrv.updatePaddock(req.params.name, req.params.newName, req.params.newTypPaddock)
        .then(data => {
            res.status(200).send(data);
        }).catch(err => {
        res.status(401).send(err);
    })
});

router.delete('/deletePaddock/:nom', function (req, res) {
    paddockSrv.deleteByName(req.params.nom)
        .then(data => {
            res.status(200).send(data);
        }).catch(err => {
        res.status(401).send(err);
    })
});

router.post('/createAnimal', function (req, res) {
    animalSrv.findBySnit(req.body.snit)
        .then(data => {
            if (data == null) {
                animalSrv.create(req.body.snit, req.body.paddockID)
                    .then(data => {
                        res.status(200).send(true);
                    })
                    .catch(err => {
                        res.status(401).json(err);
                    })
            } else res.status(200).send(false);

        }).catch(err => {
        res.status(401).send(err);
    })
});

router.put('/updatPaddockOfAnimal/:snit/:paddockID', function (req, res) {
    animalSrv.editPaddockOfAnimal(req.params.snit, req.params.paddockID)
        .then(data => {
            res.status(200).send(data);
        }).catch(err => {
        res.status(401).send(err);
    })
});

router.delete('/deleteAnimal/:snit', function (req, res) {
    animalSrv.deleteAnimal(req.params.snit)
        .then(data => {
            res.status(200).send(data);
        }).catch(err => {
        res.status(401).send(err);
    })
});


router.post('/createIngredient', function (req, res) {
    ingredientSrv.findByName(req.body.name)
        .then(data => {
            if (data == null) {
                ingredientSrv.create(req.body.name)
                    .then(data => {
                        res.status(200).send(true);
                    })
                    .catch(err => {
                        res.status(401).json(err);
                    })
            } else res.status(200).send(false);

        }).catch(err => {
        res.status(401).send(err);
    })
});

router.delete('/deleteIngredient/:name', function (req, res) {
    ingredientSrv.deleteByName(req.params.name)
        .then(data => {
            res.status(200).send(data);
        }).catch(err => {
        res.status(401).send(err);
    })
});

router.put('/updatIngredName/:name/:newName', function (req, res) {
    ingredientSrv.editIngredName(req.params.name, req.params.newName)
        .then(data => {
            res.status(200).send(data);
        }).catch(err => {
        res.status(401).send(err);
    })
});

router.post('/createRationFormule', function (req, res) {
    nourritureSrv.create(req.body.rationName)
        .then(rationData => {
            if (rationData != null) {
                let formuleDetails = req.body.formuleDetails;
                console.log('formule details ========= ', formuleDetails);
                for (let item of formuleDetails) {
                    formuleSrv.create(item.id, rationData.id, item.formule)
                        .then(formuleData => {
                            if (formuleDetails.indexOf(item) == formuleDetails.length - 1) {
                                res.status(200).send(true)
                            }
                        })
                }
            }
        }).catch(err => {
        res.status(401).send(err)
    })
});

router.post('/createMachineWithSpecialtes', function (req, res) {
    machineSrv.findByName(req.body.name)
        .then(machinByNameData => {
            if (machinByNameData == null) {
                machineSrv.create(req.body.name, req.body.machineCapacite)
                    .then(machineData => {
                        if (machineData != null) {
                            let machineSpecialiteDetails = req.body.machineSpecialiteDetails;
                            for (let item of machineSpecialiteDetails) {
                                machineSpecialiteService.create(item.id, machineData.id)
                                    .then(machineSpecieliteData => {
                                        if (machineSpecialiteDetails.indexOf(item) == machineSpecialiteDetails.length - 1) {
                                            res.status(200).send(true)
                                        }
                                    })
                            }
                        }
                    }).catch(err => {
                    res.status(401).send(err)
                })
            } else res.status(200).send(false) //existe deja
        })
});

router.delete('/deleteMachine/:name', function (req, res) {
    let machinName = req.params.name;
    machineSpecialiteService.deleteByMachine(machinName)
        .then(machinSpecialiteData => {
            machineSrv.deleteByName(machinName)
                .then(data => {
                    res.status(200).send(data);
                }).catch(err => {
                res.status(401).send(err);
            })
        }).catch(err => {
        res.status(401).send(err);
    })
});

router.post('/createPeriode', function (req, res) {
    periodName = req.body.periode;
    periodeAlimentSrv.findByPeriode(periodName)
        .then(periodeData => {
            if (periodeData == null) {
                periodeAlimentSrv.create(periodName)
                    .then(periodData => {
                        res.status(200).send(true);
                    })
            } else res.status(200).send(false) //exoste deja
        }).catch(err => {
        res.status(401).send(err);
    })
});

router.delete('/deletePeriod/:period', function (req, res) {
    periodeAlimentSrv.deleteByPeriode(req.params.period)
        .then(data => {
            res.status(200).send(data);
        }).catch(err => {
        res.status(401).send(err);
    })
});

router.put('/updatPeriode/:periode/:newPeriode', function (req, res) {
    periodeAlimentSrv.editPeriod(req.params.periode, req.params.newPeriode)
        .then(data => {
            res.status(200).send(data);
        }).catch(err => {
        res.status(401).send(err);
    })
});


router.post('/createUser', function (req, res) {
    console.log('login =============  ', req.body.login);
    userSrv.verifyLogin(req.body.login)
        .then(data => {
            if (data == null) {
                userSrv.create(req.body.login)
                    .then(data => {
                        res.status(200).send(true);
                    })
                    .catch(err => {
                        res.status(401).json(err);
                    })
            } else res.status(200).send(false);

        }).catch(err => {
        res.status(401).send(err);
    })
});

router.delete('/deleteUser/:login', function (req, res) {
    userSrv.deleteByLogin(req.params.login)
        .then(data => {
            res.status(200).send(data);
        }).catch(err => {
        res.status(401).send(err);
    })
});

module.exports = router;
