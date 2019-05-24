let express = require('express');
let router = express.Router();
let userSrv = require('../service/userService');

var login;

router.get('/verifyLogin/:login', function (req, res) {
    userSrv.verifyLogin(req.params.login)
        .then(data => {
            if (data != null) {
                login = data.login;
                res.status(200).send(data);
            } else res.status(200).send(false);

        }).catch(err => {
        res.status(400).json(err);

    })
});

router.get('/verifyPassword/:password', function (req, res) {
    userSrv.findOneByCredinitals(login, req.params.password)
        .then(data => {
            if (data != null) {
                res.status(200).send(data);
            } else
                res.status(200).send(false);
        })
        .catch(err => {
            res.status(401).json(err);
        })
});


module.exports = router;
