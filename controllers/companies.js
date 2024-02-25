//@desc     Get all companies
//@route    GET /api/v1/hospitals
//@access   Public
exports.getCompanies=(req,res,next)=>{
    res.status(200).json({success:true, msg:'Show all companies'});
};

//@desc     Get single company
//@route    GET /api/v1/companies/:id
//@access   Public
exports.getCompany=(req,res,next)=>{
    res.status(200).json({success:true, msg:`Show company ${req.params.id}`});
};

//@desc     Create new company
//@route    POST /api/v1/companies
//@access   Public
exports.createCompany=(req,res,next)=>{
    res.status(200).json({success:true, msg:'Create new companies'});
};

//@desc     Update company
//@route    PUT /api/v1/companies/:id
//@access   Public
exports.updateCompany=(req,res,next)=>{
    res.status(200).json({success:true, msg:`Update company ${req.params.id}`});
};

//@desc     Delete company
//@route    DELETE /api/v1/companies/:id
//@access   Public
exports.deleteCompany=(req,res,next)=>{
    res.status(200).json({success:true, msg:`Delete company ${req.params.id}`});
};