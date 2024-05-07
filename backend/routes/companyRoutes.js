const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
// const companyTestQuestionController = require('../controllers/companyController');

router.post('/company', companyController.createCompany);
// router.post('/company-test-questions', companyTestQuestionController.createCompanyTestQuestion);


module.exports = router;