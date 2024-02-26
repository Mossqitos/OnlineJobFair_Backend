const express = require('express');
const {getCompanies, getCompany, createCompany, updateCompany, deleteCompany} = require('../controllers/companies');

const router = express.Router();

const {protect} = require('../middleware/auth');

router.route('/').get(getCompanies).post(protect,createCompany);
router.route('/:id').get(getCompany).put(protect,updateCompany).delete(protect,deleteCompany);

module.exports=router;