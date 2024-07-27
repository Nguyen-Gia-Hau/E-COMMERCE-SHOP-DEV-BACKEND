import mongoose from "mongoose";

const KeyTokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  publicKey: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  refreshTokensUsed: {
    type: Array,
    default: []
  }
})

const KeyTokenModel = mongoose.models.KeyTokens || mongoose.model('KeyTokens', KeyTokenSchema)

export default KeyTokenModel
