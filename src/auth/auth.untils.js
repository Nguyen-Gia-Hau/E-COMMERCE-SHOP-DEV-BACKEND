import JWT from "jsonwebtoken"

const generateTokens = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = JWT.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '2 days'
    })

    const refreshToken = JWT.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '7 days'
    })

    return { accessToken, refreshToken }

  } catch (error) {
    console.log(error)
  }
}

export {
  generateTokens
}
