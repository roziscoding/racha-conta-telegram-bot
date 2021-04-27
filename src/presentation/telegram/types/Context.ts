import * as Telegraf from 'telegraf'
import { MiddlewaresContext } from '../middlewares'

export type Context = Telegraf.Context & MiddlewaresContext