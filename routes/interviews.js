const express = require('express');
const {getInterviews, getInterview, addInterview, updateInterview, deleteInterview} = require('../controllers/interviews');

const router = express.Router({mergeParams:true});

const {protect}= require('../middleware/auth');

router.route('/').get(protect, getInterviews).post(addInterview);
router.route('/:id').get(getInterview).put(updateInterview).delete(deleteInterview);

module.exports=router;