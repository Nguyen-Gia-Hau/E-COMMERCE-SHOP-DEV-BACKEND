import AccessServices from "../services/access.services.js"

class AccessController {
  async login(req, res) {
    try {
      return res.status(201).json(await new AccessServices().login(req.body))
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async register(req, res) {
    try {
      return res.status(201).json(await new AccessServices().register(req.body))
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async forgotPassword(req, res) {

  }

  async resetPassword(req, res) {

  }
}

export default AccessController
