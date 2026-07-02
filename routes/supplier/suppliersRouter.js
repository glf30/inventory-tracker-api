const express = require("express");
const router = express.Router();

const { createSupplier, getSuppliers } = require("./suppliersController");

router.get("/", getSuppliers);
router.post("/", createSupplier);

module.exports = router;