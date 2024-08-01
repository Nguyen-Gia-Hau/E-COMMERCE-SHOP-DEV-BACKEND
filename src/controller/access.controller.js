import { CREATED, OK } from "../core/success.response.js"
import AccessServices from "../services/access.services.js"

class AccessController {
  async login(req, res, next) {
    await new OK({
      message: 'Login success',
      metadata: await new AccessServices().login(req.body)
    }).send(res)
  }

  async register(req, res, next) {
    await new CREATED({
      message: 'Registered OK!',
      metadata: await new AccessServices().register(req.body)
    }).send(res)
  }

  async forgotPassword(req, res) {

  }

  async resetPassword(req, res) {

  }
}

export default AccessController
