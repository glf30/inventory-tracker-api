const Supplier = require("./suppliersModel");

const getSuppliers = async (req,res) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createSupplier = async (req,res) => {
    try {
        const newSupplier = await Supplier.create(req.body);
        res.json(newSupplier);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getSuppliers, createSupplier }