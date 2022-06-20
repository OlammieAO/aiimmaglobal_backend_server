const express = require('express');
const checkAuth = require('../middleware/jwtVerify');
const controller = require('../controllers/aiimma_drivers');
const bodyValidator = require("../middleware/bodyValidator");
const createDto = require('../dto/aiimma_drivers.dto');
const router = express.Router();

router.get('/', checkAuth, controller.getAll);
router.post('/', checkAuth, bodyValidator(createDto), controller.create);
router.get('/:ID', checkAuth, controller.getById);
router.patch('/:ID', checkAuth, controller.update);
router.delete('/:ID', checkAuth, controller.remove);
router.get('/search/:searchKey', checkAuth, controller.search);

module.exports = router;