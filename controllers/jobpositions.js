const Jobposition = require('../models/Jobposition');
const Company = require('../models/Companies');

exports.getJobpositions = async (req, res, next) => {
    try {
        let queryStr=JSON.stringify(req.query);
        let query = Jobposition.find(JSON.parse(queryStr));

        const jobpositions = await query;

        res.status(200).json({ success: true, count: jobpositions.length, data: jobpositions });
    } catch (err) {
        console.log(err.stack);
        res.status(400).json({ success: false });
    }
};

exports.getJobposition=async(req,res,next)=>{
    try{
        const jobposition = await Jobposition.findById(req.params.id);

        if(!jobposition){
            return res.status(400).json({success:false});
        }

        res.status(200).json({success:true, data:jobposition});
    } catch(err){
        res.status(400).json({success:false});
    }
};

exports.createJobposition=async(req,res,next)=>{
    try{
        req.body.company=req.params.companyId;

        const company=await Company.findById(req.params.companyId);

        if(!company){
            return res.status(404).json({success:false,message:`No company with the id of ${req.params.companyId}`})
        }
        //add user Id to req.body

        const jobposition = await Jobposition.create(req.body);

        res.status(201).json({
            success:true,
            data:jobposition
        });
    } catch(err){
        console.log(err.stack);
        return res.status(500).json({success:false,message:"Cannot create Jobposition"});
    }
};

exports.updateJobposition=async(req,res,next)=>{
    try{
        const jobposition = await Jobposition.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators:true
        });

        if(!jobposition){
            return res.status(400).json({success:false});
        }

        res.status(200).json({success:true, data:jobposition});
    } catch(err){
        res.status(400).json({success:false});
    }
};

exports.deleteJobposition = async (req, res, next) => {
    try{
        const jobposition = await Jobposition.findById(req.params.id);

        if(!jobposition){
            return res.status(400).json({success:false});
        }

        await jobposition.deleteOne();
        res.status(200).json({success:true, data:{}});
    }catch(err){
        res.status(400).json({success:false});
    }
};