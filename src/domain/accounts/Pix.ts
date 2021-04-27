import * as z from 'zod'

export const keySchema = z.union([
  z.string().email().nonempty(), // Email
  z.string().length(11).regex(/\d+/), // CPF
  z.string().length(14).regex(/\d+/), // CNPJ
  z.string().regex(/\+\d{2}\d+/), // Telefone
  z.string().uuid().nonempty() // Chave Aleatória
])

export const schema = z.object({
  key: keySchema,
  name: z.string().nonempty(),
  city: z.string().nonempty()
})

export type PixKey = z.infer<typeof keySchema>
export type PixAccount = z.infer<typeof schema>
