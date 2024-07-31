import mongoose from "mongoose"

const ApiKeySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: Boolean,
    default: true
  },
  permissions: {
    type: [String],
    required: true,
    default: [`0000`, `1111`, `2222`]
  }
})

const ApiKeyModel = mongoose.models.apikeys || mongoose.model('apikeys', ApiKeySchema)

export default ApiKeyModel
