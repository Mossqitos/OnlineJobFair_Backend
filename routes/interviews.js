const express = require('express');
const {getInterviews} = require('../controllers/interviews');

const router = express.Router({mergeParams:true});

const {protect}= require('../middleware/auth');

router.route('/').get(protect, getInterviews);

module.exports=router;