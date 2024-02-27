const Interview = require('../models/Interview');

//@desc     Get all interviews
//@route    GET /api/v1/interviews
//@access   Public
exports.getInterviews=async(req,res,next)=>{
    let query;
    //General users can see only their interviews!
    if(req.user.role !== 'admin'){
        query=Interview.find({user:req.user.id}).populate({
            path:'company',
            select:'name province tel'
        });
    }else{ //If you are an admin, you can see all 
        query = Interview.find().populate({
            path:'company',
            select:'name province tel'
        });
    }
    try{
        const interviews= await query;
        res.status(200).json({
            success:true,
            count:interviews.length,
            data: interviews
        });
    } catch(err){
        console.log(err.stack);
        return req.status(500).json({success:false,message:"Cannot find Interview"});
    }
};