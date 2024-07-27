import UserModels from '../module/user.models.js'
import bcrypt from 'bcrypt'

class UserServices {
  static async findByEmail(email) {
    const user = await UserModels.findOne({ email }).lean()
    return user
  }

  static async createNewUser(userData) {
    const { name, email, password } = userData

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = await UserModels.create({
      name,
      password: passwordHash,
      email
    })

    return newUser
  }
}

export default UserServices
