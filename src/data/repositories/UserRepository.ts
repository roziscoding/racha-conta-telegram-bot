import { Collection, ObjectId } from 'mongodb'
import { PicPayAccount } from '../../domain/accounts/PicPay'
import { PixAccount } from '../../domain/accounts/Pix'
import { User } from '../../domain/User'
import { Document } from '../types/Document'

export type UserDocument = Document<User>
type UserCollection = Collection<UserDocument>

export class UserRepository {
  constructor(private users: UserCollection) {
    this.users = users
  }

  async findById(id: string) {
    if (!ObjectId.isValid(id)) return null

    return this.users.findOne(new ObjectId(id))
  }

  async findByChatId(chatId: string) {
    return this.users.findOne({ chatId })
  }

  async existsByChatId(chatId: string) {
    return this.users.countDocuments({ chatId }).then((result) => result > 0)
  }

  async create(_id: ObjectId, { chatId, name, accounts }: User) {
    return this.users
      .insertOne({
        _id,
        chatId,
        name,
        accounts,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .then((result) => result.ops[0] as UserDocument)
  }

  async addAccount(
    id: string,
    account: PixAccount | PicPayAccount,
    accountType: keyof User['accounts']
  ) {
    if (!ObjectId.isValid(id)) return null

    return this.users
      .findOneAndUpdate(
        new ObjectId(id),
        { $set: { [`accounts.${accountType}`]: account } },
        { returnOriginal: false }
      )
      .then((result) => result.value ?? null)
  }
}
