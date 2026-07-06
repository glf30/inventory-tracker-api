const Item = require("./itemsModel");
const Supplier = require("../supplier/suppliersModel");

const getItems = async (req, res) => {
  try {

    // 8. 
    if (req.query.category) {
      const categoryItems = await Item.find({ category: req.query.category });
      return res.json(categoryItems);
    }

    let items = await Item.find().populate("supplier", "name -_id");

    // 9.
    if (req.query.simple === "true") {
      items = await Item.find()
        .select("name price -_id")
        .populate("supplier", "name -_id");
    }

    // 10.
    if(req.query.search){
      // we can still use regular filter!!
      // if the item name includes our query, return it in our results array
      items = items.filter((item) => {
        return item.name.toLowerCase().includes(req.query.search)
      })
    }

    res.json(items);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getItem = async (req, res) => {
  try {
    const foundItem = await Item.findById(req.params.itemId).populate(
      "supplier",
      "name -_id",
    );

    if (!foundItem) {
      return res.status(404).json({ message: "Item Not Found" });
    }

    res.json(foundItem);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// 12. Add a route to retrieve all items supplied by a specific supplier.
const getItemsBySupplier = async (req,res) => {
  try {
    const items = await Item.find({ supplier: req.params.supplierId }).populate("supplier", "name -_id");

    res.json(items)
  } catch (error) {
    res.json({ message: error.message });
  }
}

const createItem = async (req, res) => {
  try {
    const foundSupplier = await Supplier.findById(req.body.supplier);

    if (!foundSupplier) {
      return res
        .status(404)
        .json({ message: "Item could not be created. Supplier Not Found" });
    }

    const newItem = await Item.create(req.body);

    res.json(newItem);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.itemId,
      req.body,
      { new: true },
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item Not Found" });
    }

    res.json(updatedItem);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.itemId);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item Not Found" });
    }

    res.json({ message: `${deletedItem.name} Deleted Successfully` });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
  getItemsBySupplier
};
