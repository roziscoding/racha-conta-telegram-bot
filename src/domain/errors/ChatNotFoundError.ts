import { DomainError } from './DomainError'

export class ChatNotFoundError extends DomainError {
  constructor(chatId: string) {
    super('user-not-found', `Chat with chatId ${chatId} was not found`)
  }
}
