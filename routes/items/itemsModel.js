const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    category: {
      type: String,
      default: ""
    },
    quantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: true
    },
    supplier: {
      type: ObjectId,
      ref: 'Supplier',
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Item = mongoose.model('Item', itemSchema)

module.exports = Item;