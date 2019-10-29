const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    first_name: String,
    last_name: String,
    pwd: String,
    dob: Date
});
module.exports = mongoose.model('users', userSchema);    