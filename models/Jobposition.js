const mongoose = require('mongoose');

const JobpositionSchema = new mongoose.Schema({
    position: {
        type: String,
        required: [true,'Please add a position name']
    },
    requirement: {
        type: String,
        required: [true,'Please add a requirement']
    },
    company:{
        type:mongoose.Schema.ObjectId,
        ref:'Company',
        required:'true'
    }
});

JobpositionSchema.pre('deleteOne',{ document: true, query: false }, async function(next){
    console.log(`Interview and Jobposition being removed from company ${this._id}`);
    await this.model('Interview').deleteMany({job_position:this._id});
    next();
});

module.exports=mongoose.model('Jobposition',JobpositionSchema);