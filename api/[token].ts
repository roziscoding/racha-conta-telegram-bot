import { VercelRequest, VercelResponse } from '@vercel/node'
import { MongoClient } from 'mongodb'
import { config } from '../src/config'
import bot from '../src/presentation/telegram/bot'

let mongodbConnection = null

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST' || req.query.token !== config.telegram.token) {
    return res.status(403).end()
  }

  mongodbConnection =
    mongodbConnection ||
    (await MongoClient.connect(config.mongodb.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }))

  const db = mongodbConnection.db(config.mongodb.dbName)
  const botInstance = await bot.factory(config, db)
  const update = req.body

  res.status(204).end()

  botInstance.handleUpdate(update)
}
