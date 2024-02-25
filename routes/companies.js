const express = require('express');
const router = express.Router();

const app=express();

router.get('/', (req,res)=>{
    res.status(200).json({success:true, msg:'Show all companies'});
});

router.get('/:id', (req,res)=>{
    res.status(200).json({success:true, msg:`Show company ${req.params.id}`});
});

router.post('/', (req,res)=>{
    res.status(200).json({success:true, msg:'Create new companies'});
});

router.put('/:id', (req,res)=>{
    res.status(200).json({success:true, msg:`Update company ${req.params.id}`});
});

router.delete('/:id', (req,res)=>{
    res.status(200).json({success:true, msg:`Delete company ${req.params.id}`});
});

module.exports=router;