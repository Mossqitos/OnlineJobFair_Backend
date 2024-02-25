const Company = require('../models/Companies');
//@desc     Get all companies
//@route    GET /api/v1/hospitals
//@access   Public
exports.getCompanies=async(req,res,next)=>{
    try{
        const company = await Company.find();

        res.status(200).json({success:true, count:company.length, data:company});
    } catch(err){
        res.status(400).json({success:false});
    }
};

//@desc     Get single company
//@route    GET /api/v1/companies/:id
//@access   Public
exports.getCompany=async(req,res,next)=>{
    try{
        const company = await Company.findById(req.params.id);

        if(!company){
            return res.status(400).json({success:false});
        }

        res.status(200).json({success:true, data:company});
    } catch(err){
        res.status(400).json({success:false});
    }
};

//@desc     Create new company
//@route    POST /api/v1/companies
//@access   Public
exports.createCompany=async(req,res,next)=>{
    const company = await Company.create(req.body);
    res.status(201).json({success:true, data:company});
};

//@desc     Update company
//@route    PUT /api/v1/companies/:id
//@access   Public
exports.updateCompany=async(req,res,next)=>{
    try{
        const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators:true
        });

        if(!Company){
            return rawListeners.status(400).json({success:false});
        }

        res.status(200).json({success:true, data:company});
    } catch(err){
        res.status(400).json({success:false});
    }
};

//@desc     Delete company
//@route    DELETE /api/v1/companies/:id
//@access   Public
exports.deleteCompany=async(req,res,next)=>{
    try{
        const company = await Company.findByIdAndDelete(req.params.id);

        if(!company){
            return res.status(400).json({success:false});
        }

        res.status(200).json({success:true, data:{}});
    }catch(err){
        res.status(400).json({success:false});
    }
};