import { Db } from 'mongodb'
import { MiddlewareFn } from 'telegraf'
import { MiddlewaresContext } from '.'
import { UserRepository } from '../../../data/repositories/UserRepository'
import { UserService } from '../../../services/UserService'

export type Services = {
  user: UserService
}

export function factory(mongoDb: Db): MiddlewareFn<MiddlewaresContext> {
  const userRepository = new UserRepository(mongoDb.collection('users'))
  const userService = new UserService(userRepository)

  const services = {
    user: userService
  }

  return (ctx, next) => {
    Object.defineProperty(ctx, 'services', {
      get: () => services,
      writable: false
    })

    next()
  }
}
