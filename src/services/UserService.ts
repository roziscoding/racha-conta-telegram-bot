import { ObjectId } from 'bson'
import { UserRepository } from '../data/repositories/UserRepository'
import {
  PicPayAccount,
  schema as PicPayAccountSchema
} from '../domain/accounts/PicPay'
import {
  PixAccount,
  PixKey,
  schema as PixAccountSchema
} from '../domain/accounts/Pix'
import { ChatNotFoundError } from '../domain/errors/ChatNotFoundError'
import { UserNotFoundError } from '../domain/errors/UserNotFoundError'
import { schema as UserSchema, User } from '../domain/User'

export class UserService {
  constructor(private readonly repository: UserRepository) {
    this.repository = repository
  }

  async findChat(chatId: string) {
    const chat = await this.repository.findByChatId(chatId)

    if (!chat) throw new ChatNotFoundError(chatId)

    return chat
  }

  async findUserById(id: string) {
    const user = await this.repository.findById(id)

    if (!user) throw new UserNotFoundError(id)

    return user
  }

  async create(name: string, chatId: string) {
    const user: User = {
      name,
      chatId,
      accounts: {}
    }

    UserSchema.parse(user)

    const id = new ObjectId()

    return this.repository.create(id, user)
  }

  async addPixAccount(id: string, key: PixKey, name: string, city: string) {
    const account: PixAccount = {
      key,
      name,
      city
    }

    PixAccountSchema.parse(account)

    const result = await this.repository.addAccount(id, account, 'pix')

    if (!result) throw new UserNotFoundError(id)

    return result
  }

  async addPicPayAccount(id: string, username: string) {
    const account: PicPayAccount = { username }

    PicPayAccountSchema.parse(account)

    const result = await this.repository.addAccount(id, account, 'picPay')

    if (!result) throw new UserNotFoundError(id)

    return result
  }

  async existsByChatId (chatId: string) {
    return this.repository.existsByChatId(chatId)
  }
}
