import crypto from 'crypto'
import { generateTokens } from '../auth/auth.untils.js'
import KeyTokenServices from "./key.token.services.js";
import ShopServices from './shop.access.services.js';
import { BadRequestError } from '../core/error.response.js';

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
    // check email is registered
    const shop = await ShopServices.findByEmail(email)
    if (!shop) throw new BadRequestError("Error: Shop don't already registered")
    const { publicKey, privateKey } = await this.generalKeyPair()

    // create key tokens
    const tokens = await generateTokens({ email, userId: shop._id }, publicKey, privateKey)

    // store key
    const storeKey = await KeyTokenServices.saveKeyToken({
      userId: shop._id,
      publicKey: publicKey,
      refreshToken: tokens.refreshToken
    })

    if (!storeKey) throw BadRequestError('Error: Store key error')

    return {
      code: '0000',
      message: 'Registration successful! Your account has been created successfully.',
      metadata: {
        shop,
        tokens,
        privateKey
      }
    }
  }

  async register({ name, email, password }) {
    // check email is registered 
    const shop = await ShopServices.findByEmail(email)
    if (shop) throw new BadRequestError(`Error: Your email has already been registered. Please enter a different email address to continue.`)

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

      if (!storeKey) throw new BadRequestError('Error: Store key error')
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
  }

  async logout() {

  }

  async resetPassword() {

  }

  async forgotPassword() {

  }

}

export default AccessServices
