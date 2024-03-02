const express = require('express');
const {getJobpositions,getJobposition,createJobposition,updateJobposition,deleteJobposition} = require('../controllers/jobpositions');

const router = express.Router({mergeParams:true});

const {protect,authorize} = require('../middleware/auth');

router.route('/').get(protect,getJobpositions).post(protect,authorize('admin'),createJobposition);
router.route('/:id').get(protect,getJobposition).put(protect,authorize('admin'),updateJobposition).delete(protect,authorize('admin'),deleteJobposition);

module.exports=router;