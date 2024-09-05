const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const resetTokenSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600
    }
})

resetTokenSchema.pre('save', function(next){
    if(this.isModified('token')){
        const hash = bcrypt.hashSync(this.token, 10);
        this.token = hash;
    }
    next();
});

resetTokenSchema.methods.compareToken = async function(token){
    const result = await bcrypt.compare(token, this.token);
    return result;
}

module.exports = mongoose.model('ResetToken', resetTokenSchema);