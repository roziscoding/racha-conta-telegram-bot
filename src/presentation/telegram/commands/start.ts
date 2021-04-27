import { Middleware } from 'telegraf'
import { Context } from '../types/Context'

export const start: Middleware<Context> = async (ctx, next) => {
  if (!ctx.message?.from.id) return next()

  const service = ctx.services.user

  const userId = `${ctx.message.from.id}`
  const userName = ctx.message.from.first_name

  const user = (await service.existsByChatId(userId))
    ? await service.findChat(userId)
    : await service.create(userName, userId)

  ctx.reply(`Boas vindas, ${user.name}!`)
}
