const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const featureController = require('../controllers/companyController');
const AllEntreprise = require('../controllers/companyController');
const companyTestController = require('../controllers/companyController');

router.post('/company', companyController.createCompany);
router.post('/companytest', featureController.CompanyTestQuestion);
router.get('/companies/names/all', AllEntreprise.getAllCompanyNames);
// router.get('/sum-tests/:idCompany', companyTestController.sumIdsByIdCompany);
// router.get('/company/titles', companyTestController.getAllCompanyTitles);
// router.get('/company/:companyId/tests', companyTestController.getTestsByCompanyId);

module.exports = router;