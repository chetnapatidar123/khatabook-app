const mongoose = require("mongoose");

const plm = require("passport-local-mongoose")

const userModel = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    number: String,
    fullname: String,
    city: String,
    contact: String,
    particular: String,
    credit: String,
    debit: String,
    date: String,
    
    detail: {
        type: Array,
        default: [],
    },
    // entry: {
    //     type: Array,
    //     default: [],
    // },


},
    { timestamps: true }
);

userModel.plugin(plm);
const user = mongoose.model("user", userModel)



module.exports = user
