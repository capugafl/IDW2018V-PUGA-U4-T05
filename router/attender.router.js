const router = require('express').Router();

module.exports = (wagner) => {

    const attenderCtrl = wagner.invoke((Attender) =>
        require('../controllers/attender.controller')(Attender));

    router.get('/', (req, res) =>
        attenderCtrl.getAll(req, res));
    
    return router;
}