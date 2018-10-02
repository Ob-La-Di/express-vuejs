const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    gender: {type: String, enum: ['Female', 'Male', 'Other']},
    ip_address: String,
});

ClientSchema.pre('save', () => {
    if (!this.isModified('password')) 
        return next();
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
    next();
});

module.exports = mongoose.model('Client', ClientSchema);
