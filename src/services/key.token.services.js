import KeyTokenModel from "../module/key.token.models.js"

class KeyTokenServices {
  static async saveKeyToken({ userId, publicKey, refreshToken }) {
    const publicKeyString = String(publicKey)

    const filter = {
      user: userId
    }, update = {
      user: userId,
      publicKey: publicKeyString,
      refreshToken
    }, option = {
      new: true,
      upsert: true
    }

    const result = await KeyTokenModel.findOneAndUpdate(filter, update, option)
    return result
  }
}

export default KeyTokenServices
