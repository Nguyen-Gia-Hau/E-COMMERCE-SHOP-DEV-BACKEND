import ApiKeyServices from "../services/api.key.services.js"

const HEADER = {
  API_KEY: `x-api-key`,
  AUTHORIZATION: `authorization`
}

const checkApiKey = async (req, res, next) => {
  try {

    const key = req.headers[HEADER.API_KEY]?.toString()
    if (!key) {
      return res.status(403).json({
        message: 'Forbidden Error',
      })
    }

    // check apikey
    const objkey = await ApiKeyServices.findByKey(key)
    if (!objkey) {
      return res.status(403).json({
        message: 'Forbidden Error',
      })

    }

    req.objkey = objkey
    return next()
  } catch (error) {

  }
}

const checkPermissions = (permissions) => {
  return (req, res, next) => {
    if (!req.objkey.permissions) {
      return res.status(403).json({
        message: 'Forbidden Error',
      })
    }

    const validPermission = req.objkey.permissions.includes(permissions);
    if (!validPermission) {
      return res.status(403).json({
        message: 'Permission denied',
      })
    }

    return next()
  }
}

export {
  checkApiKey,
  checkPermissions
}
