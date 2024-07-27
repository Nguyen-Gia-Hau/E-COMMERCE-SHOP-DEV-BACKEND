import UserServices from "./user.access.services.js"
import crypto from 'crypto'
import { generateTokens } from '../auth/auth.untils.js'
import KeyTokenServices from "./key.token.services.js";

class AccessServices {
  async generalKeyPair() {
    const {
      publicKey,
      privateKey,
    } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });

    return { publicKey, privateKey }
  }


  async login({ email, password, refreshToken = null }) {

  }

  async register({ name, email, password }) {
    try {
      // check email is registered 
      const user = await UserServices.findByEmail(email)
      if (user) return {
        code: 'xxx',
        message: `Your email has already been registered. Please enter a different email address to continue.`
      }

      const newUser = await UserServices.createNewUser({ name, email, password })
      if (newUser) {
        // create publicKey and privateKey
        const { publicKey, privateKey } = await this.generalKeyPair()

        // create keyTokens
        const tokens = await generateTokens({ userId: newUser._id, email }, publicKey, privateKey)

        const storeKey = await KeyTokenServices.saveKeyToken({
          userId: newUser._id,
          publicKey: publicKey,
          refreshToken: tokens.refreshToken
        })

        if (!storeKey) return {
          code: 'xxx',
          message: 'Store key error!'
        }

        return {
          code: '0000',
          message: 'Registration successful! Your account has been created successfully.',
          metadata: {
            newUser,
            tokens,
            privateKey
          }
        }
      }

      return {
        code: '0000',
        message: 'Registration successful! Your account has been created successfully.',
        metadata: null
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async logout() {

  }

  async resetPassword() {

  }

  async forgotPassword() {

  }

}

export default AccessServices
