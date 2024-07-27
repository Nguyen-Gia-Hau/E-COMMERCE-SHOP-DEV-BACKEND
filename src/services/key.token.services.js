import KeyTokenModel from "../module/key.token.models.js"

class KeyTokenServices {
  static async saveKeyToken({ userId, publicKey, refreshToken }) {
    const publicKeyString = String(publicKey)

    const result = await KeyTokenModel.create({
      user: userId,
      publicKey: publicKeyString,
      refreshToken
    })

    return result
  }
}

export default KeyTokenServices
