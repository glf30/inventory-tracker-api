const express = require("express");
const router = express.Router();

const {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
  getItemsBySupplier
} = require("./itemsController");

router.get("/", getItems);
router.get("/:itemId", getItem);
router.get("/supplier/:supplierId", getItemsBySupplier) // /items/supplier/:ID
router.post("/", createItem);
router.put("/:itemId", updateItem);
router.delete("/:itemId", deleteItem);

module.exports = router;