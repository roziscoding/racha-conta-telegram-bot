import * as z from 'zod'
import { schema as PicPayAccount } from './accounts/PicPay'
import { schema as PixAccount } from './accounts/Pix'

export const schema = z.object({
  name: z.string(),
  chatId: z.string(),
  accounts: z.object({
    pix: PixAccount.optional(),
    picPay: PicPayAccount.optional()
  })
})

export type User = z.infer<typeof schema>
