const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');

const queryController = require('../controllers/query.controller');

router.post('/', queryController.sendQuery);
router.post('/pdf', queryController.generatePdf);

module.exports = router;