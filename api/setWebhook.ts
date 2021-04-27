import { VercelRequest, VercelResponse } from '@vercel/node'
import { Telegraf } from 'telegraf'
import { config } from '../src/config'

export default (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') return res.status(404).end()

  new Telegraf(config.telegram.token).telegram
    .setWebhook(config.webhook.url)
    .then((result) => res.status(200).send(result))
}
