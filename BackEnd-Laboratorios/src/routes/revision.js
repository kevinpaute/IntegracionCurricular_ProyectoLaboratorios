const express = require('express');
const router = express.Router();
const revisionController = require('../controller/revision.controller');

router.get('/revisiones', revisionController.getAll);
router.get('/revisiones/:id', revisionController.getById);
router.post('/revisiones', revisionController.create);
router.put('/revisiones/:id', revisionController.update);
router.delete('/revisiones/:id', revisionController.delete);
router.post('/revisiones/many', revisionController.createMany);

module.exports = router;
