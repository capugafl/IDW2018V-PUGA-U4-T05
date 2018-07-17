const router = require('express').Router();

module.exports = (wagner) => {

    const noticiaCtrl = wagner.invoke((Noticia) =>
        require('../controllers/noticia.controller')(Noticia));

    router.get('/', (req, res) =>
        noticiaCtrl.getAll(req, res));
    
    router.get('/:id', (req, res) =>
        noticiaCtrl.getById(req, res));
    
    router.get('/autor/:autor/titulo/:titulo', (req, res) =>
        noticiaCtrl.getByAutor(req, res));
    
    router.delete('/:id', (req, res) =>
        noticiaCtrl.deleteById(req, res));

    router.post('/', (req, res) =>
        noticiaCtrl.createNoticia(req, res));

    router.put('/:id', (req, res) =>
        noticiaCtrl.updateByID(req, res));
    
    
    return router;
}