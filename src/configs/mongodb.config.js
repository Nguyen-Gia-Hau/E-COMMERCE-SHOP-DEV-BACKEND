
const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3000
  },
  db: {
    name: process.env.DEV_DB_NAME || 'ECOMMERCE-SHOP-DEV',
    host: process.env.DEV_DB_HOST || 'localhost',
    port: process.env.DEV_DB_PORT || 27017
  }
}

const config = { dev }
const node_env = process.env.NODE_ENV || 'dev'

export default config[node_env]
