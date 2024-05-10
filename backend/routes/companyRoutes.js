const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');


router.post('/company', companyController.createCompany);



module.exports = router;