let nourriture = require('../models/T_Nourriture');

class nourritureService {

    static allNourriture() {
        return nourriture.findAll({
            attributes: ['id', 'nom'],
            order: [
                ['nom', 'ASC']
            ],
        })
    }

    static create(nom) {
        return nourriture.create({
            nom: nom
        })
    }
}

module.exports = nourritureService;
