const express = require('express');
const multer = require('multer');
const BitacoraController = require('../controller/Bitacora.controller');
const bitacoraController = new BitacoraController();

const router = express.Router();
const upload = multer({ dest: 'uploads/' });  // Configura la ruta de subida de archivos

// Endpoints
router.post('/bitacoras', (req, res) => bitacoraController.crearBitacora(req, res));
router.get('/bitacoras/activas', (req, res) => bitacoraController.obtenerBitacorasActivas(req, res));
router.get('/bitacoras/completadas', (req, res) => bitacoraController.obtenerBitacorasCompletadas(req, res));
router.get('/bitacoras/:id', (req, res) => bitacoraController.obtenerBitacoraPorId(req, res));
router.put('/bitacoras/:id', (req, res) => bitacoraController.editarBitacora(req, res));
router.post('/bitacoras/:id/evidencia', upload.single('evidencia'), (req, res) => bitacoraController.subirEvidenciaBitacora(req, res));

module.exports = router;