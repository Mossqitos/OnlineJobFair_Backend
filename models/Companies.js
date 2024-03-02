const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please add a name'],
        unique: true,
        trim:true,
        maxlength:[50,'Name can not be more than 50 characters']
    },
    address:{
        type: String,
        required: [true,'Please add an address']
    },
    website:{
        type: String,
        required: [true,'Please add a website']
    },
    description:{
        type: String,
        required: [true,'Please add a description']
    },
    tel:{
        type: String
    }
},{
    toJSON: {virtuals:true},
    toObject:{virtuals:true}
});

//Cascade delete appointments when a company is deleted
CompanySchema.pre('deleteOne',{ document: true, query: false }, async function(next){
    console.log(`Interview and Jobposition being removed from company ${this._id}`);
    await this.model('Interview').deleteMany({company:this._id});
    await this.model('Jobposition').deleteMany({company:this._id})
    next();
});

//Reverse populate with virtuals
CompanySchema.virtual('interviews',{
    ref: 'Interview',
    localField: '_id',
    foreignField: 'company',
    justOne:false
});

CompanySchema.virtual('jobpositions',{
    ref: 'Jobposition',
    localField: '_id',
    foreignField: 'company',
    justOne:false
});
module.exports=mongoose.model('Company',CompanySchema);