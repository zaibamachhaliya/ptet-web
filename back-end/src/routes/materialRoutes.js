const express = require('express');
const router = express.Router();
const studyMaterialController = require('../controllers/studyMaterialController');

// GET /api/materials
router.get('/', studyMaterialController.getMaterials);

// GET /api/materials/:id
router.get('/:id', studyMaterialController.getMaterialById);

module.exports = router;