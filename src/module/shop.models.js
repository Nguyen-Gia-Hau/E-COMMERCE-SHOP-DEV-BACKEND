import mongoose, { Schema } from "mongoose";

const ShopSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxLength: 150
  },
  email: {
    type: String,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  },
  verify: {
    type: Schema.Types.Boolean,
    default: false
  },
  roles: {
    type: Array,
    default: []
  }
})

const ShopModel = mongoose.models.Shops || mongoose.model('Shops', ShopSchema)
export default ShopModel 
