import { ObjectId } from 'mongodb'

export type Document<TEntity> = TEntity & {
  _id: ObjectId
  createdAt: Date
  updatedAt: Date
}
