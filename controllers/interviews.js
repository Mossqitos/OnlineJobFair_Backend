const Interview = require('../models/Interview');
const Company = require('../models/Companies')

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

//@desc     Get single interview
//@route    GET /api/v1/interviews/:id
//@access   Public
exports.getInterview=async(req,res,next)=>{
    try{
        const interview= await Interview.findById(req.params.id).populate({
            path: 'company',
            select: 'name description tel'
        });
        
        if(!interview){
            return res.status(404).json({success:false,message:`No interview with the id od ${req.params.id}`});
        }

        res.status(200).json({
            success:true,
            data:interview
        });
    } catch(err){
        console.log(err.stack);
        return res.status(500).json({success:false,message:"Cannot find Interview"});
    }
};

//@desc     Add interview
//@route    POST /api/v1/companies/:companyId/interview
//@access   Private
exports.addInterview=async(req,res,next)=>{
    try{
        req.body.company=req.params.companyId;

        const companies= await Company.findById(req.params.companyId);

        if(!companies){
            return res.status(404).json({success:false,message:`No company with the id of ${req.params.companyId}`});
        }
        const interview = await Interview.create(req.body);

        res.status(200).json({
            success:true,
            data:interview
        });
    } catch(err){
        console.log(err.stack);
        return res.status(500).json({success:false,message:"Cannot create Interview"});
    }
};

//@desc     Update interview
//@route    PUT /api/v1/interviews/:id
//@access   Private
exports.updateInterview=async(req,res,next)=>{
    try{
        let interview = await Interview.findById(req.params.id);

        if(!interview){
            return res.status(404).json({success:false,message:`No interview with the id of ${req.params.id}`});
        }
        
        interview=await Interview.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });

        res.status(200).json({
            success:true,
            data: interview
        });
    } catch(err){
        console.log(err.stack);
        return res.status(500).json({success:false,message:"Cannot update Interview"});
    }
};

//@desc     Delete interview
//@route    DELETE /api/v1/interviews/:id
//@access   Private
exports.deleteInterview=async(req,res,next)=>{
    try{
        const interview = await Interview.findById(req.params.id); 

        if(!interview){
            return res.status(404).json({success:false,message:`No interview with the id of ${req.params.id}`});
        }
        
        await interview.deleteOne();

        res.status(200).json({
            success:true,
            data: {}
        });
    } catch(err){
        console.log(err.stack);
        return res.status(500).json({success:false,message:"Cannot delete Interview"});
    }
};