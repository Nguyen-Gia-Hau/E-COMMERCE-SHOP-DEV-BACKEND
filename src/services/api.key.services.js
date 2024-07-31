import ApiKeyModel from "../module/api.key.model.js";
import crypto from 'crypto'
class ApiKeyServices {
  static async createApiKey(permissions = null) {
    try {
      const newKey = crypto.randomBytes(8).toString('hex')
      await ApiKeyModel.create({
        key: newKey,
        permissions: permissions
      })
    } catch (error) {

    }
  }

  static async findByKey(key) {
    const objkey = await ApiKeyModel.findOne({ key, status: true }).lean()
    return objkey
  }
}

export default ApiKeyServices
