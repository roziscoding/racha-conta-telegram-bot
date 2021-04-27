import { Db } from 'mongodb'
import { Telegraf } from 'telegraf'
import { Config } from '../../config'
import * as commands from './commands'
import * as middlewares from './middlewares'
import { Context } from './types/Context'

export async function factory(config: Config, mongoDb: Db) {
  const bot = new Telegraf<Context>(config.telegram.token, {
    telegram: { webhookReply: false }
  })

  bot.use(middlewares.serivces(mongoDb))
  bot.start(commands.start)

  return bot
}

export default { factory }