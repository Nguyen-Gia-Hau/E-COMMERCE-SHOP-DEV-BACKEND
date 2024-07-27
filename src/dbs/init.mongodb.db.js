import mongoose from 'mongoose'
import configMongoDB from '../configs/mongodb.config.js'

const { db: { name, host, port } } = configMongoDB

class Database {
  constructor() {
    this.connectString = `mongodb://${host}:${port}/${name}`
    this.connect()
  }

  async connect() {
    try {
      await mongoose.connect(this.connectString)
      console.log(`Mongodb connect success::`, this.connectString)
    } catch (error) {
      console.log(error)
    }
  }

  static getIntance() {
    if (!Database.intance)
      Database.intance = new Database()
    return Database.intance
  }
}

const intance = Database.getIntance()
