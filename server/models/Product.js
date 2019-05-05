const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  image: { data: Buffer, imageType: String, iName: String },
  // image: { type: String },
  price: { type: String },
  name: { type: String },
  description: { type: String },
  quantity: { type: Number },
  // category: { name: { type: String } }
  category: { type: Schema.Types.ObjectId, ref: 'Category' }
})
const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;