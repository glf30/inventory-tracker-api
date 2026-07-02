const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;