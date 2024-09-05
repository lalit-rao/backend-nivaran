const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://www.gravatar.com/avatar/'
    },
    verified: {
        type: Boolean,
        default: false,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    emergencyContacts: [
        {
            name: {
                type: String,
                required: true
            },
            phone: {
                type: String,
                required: true
            }
        }
    ]
});

userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        const hash = bcrypt.hashSync(this.password, 10);
        this.password = hash;
    }
    next();
});

userSchema.methods.comparePassword = async function(password) {
    const result = await bcrypt.compare(password, this.password);
    return result;
}

module.exports = mongoose.model('User', userSchema);
