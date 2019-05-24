let express = require('express');
let router = express.Router();

router.use('/detailAlimentation', require('./detailAlimentationController'));
router.use('/livraison', require('./livraisonController'));
router.use('/mesure', require('./mesureController'));
router.use('/parametrage', require('./parametrageController'));
router.use('/user', require('./userController'));

module.exports = router;
