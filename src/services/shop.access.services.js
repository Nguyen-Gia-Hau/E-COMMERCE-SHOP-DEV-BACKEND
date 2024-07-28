import ShopModel from '../module/shop.models.js'
import bcrypt from 'bcrypt'

class ShopServices {
  static async findByEmail(email) {
    const shop = await ShopModel.findOne({ email }).lean()
    return shop
  }

  static async createNewShop(shopData) {
    const { name, email, password, roles } = shopData

    const passwordHash = await bcrypt.hash(password, 10)

    const newShop = await ShopModel.create({
      name,
      password: passwordHash,
      email,
      roles
    })

    return newShop
  }
}

export default ShopServices  
