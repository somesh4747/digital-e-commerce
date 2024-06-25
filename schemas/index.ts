import z from 'zod'

const fileSchema = z.instanceof(File, { message: 'not an image' })

export const productsEntrySchema = z.object({
    itemName: z.string().min(1, 'Provide Item Name'),
    description: z.string().min(1, 'Provide Item Description'),
    priceInCents: z.coerce.number().min(1),
    downloadableItem: fileSchema,
    image: fileSchema,
    // .refine((file) => file.type.startsWith('image/'), {
    //     message: `It's not image`,
    // })
    // .optional(),
})
