import { DomainError } from './DomainError'

export class UserNotFoundError extends DomainError {
  constructor(userId: string) {
    super('user-not-found', `User with id ${userId} was not found`)
  }
}
