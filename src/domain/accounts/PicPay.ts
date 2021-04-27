import * as z from 'zod'

export const schema = z.object({
  username: z.string().nonempty()
})

export type PicPayAccount = z.infer<typeof schema>