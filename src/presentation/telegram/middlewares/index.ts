import * as Telegraf from 'telegraf'
import { Services } from './services'

export { factory as serivces } from './services'

export type MiddlewaresContext = Telegraf.Context & {
  services: Services
}