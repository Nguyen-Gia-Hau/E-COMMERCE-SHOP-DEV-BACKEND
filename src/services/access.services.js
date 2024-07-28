import crypto from 'crypto'
import { generateTokens } from '../auth/auth.untils.js'
import KeyTokenServices from "./key.token.services.js";
import ShopServices from './shop.access.services.js';

const RoleShop = {
  SHOP: 'SHOP',
  WRITER: 'WRITER',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN'
}

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
    try {
      // check email is registered
      const shop = await ShopServices.findByEmail(email)
      if (!shop) return {
        code: 'xxx',
        message: `Your account does not exist.Please register to create a new account.`
      }

      const { publicKey, privateKey } = await this.generalKeyPair()

      // create key tokens
      const tokens = await generateTokens({ email, userId: shop._id }, publicKey, privateKey)

      // store key
      const storeKey = await KeyTokenServices.saveKeyToken({
        userId: shop._id,
        publicKey: publicKey,
        refreshToken: tokens.refreshToken
      })

      if (!storeKey) return {
        code: 'xxx',
        message: `Store key error`
      }

      return {
        code: '0000',
        message: 'Registration successful! Your account has been created successfully.',
        metadata: {
          shop,
          tokens,
          privateKey
        }
      }
    } catch (error) {
      console.log(error)
      return {
        code: 'xxxx',
        message: error
      }
    }
  }

  async register({ name, email, password }) {
    try {
      // check email is registered 
      const shop = await ShopServices.findByEmail(email)
      if (shop) return {
        code: 'xxx',
        message: `Your email has already been registered. Please enter a different email address to continue.`
      }

      const newShop = await ShopServices.createNewShop({ name, email, password, roles: [RoleShop.SHOP] })
      if (newShop) {
        // create publicKey and privateKey
        const { publicKey, privateKey } = await this.generalKeyPair()

        // create keyTokens
        const tokens = await generateTokens({ userId: newShop._id, email }, publicKey, privateKey)

        const storeKey = await KeyTokenServices.saveKeyToken({
          userId: newShop._id,
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
            newShop,
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
