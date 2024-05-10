const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const featureController = require('../controllers/companyController');

router.post('/company', companyController.createCompany);

router.post('/companytest', featureController.CompanyTestQuestion);

module.exports = router;