import { z } from 'zod';

export const productSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),

  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),

  sku: z
    .string()
    .min(3, 'SKU must be at least 3 characters')
    .max(20, 'SKU must be less than 20 characters'),

  price: z.number().min(0, 'Price cannot be negative'),

  stock: z.number().min(0, 'Stock cannot be negative'),

  brand: z
    .string()
    .min(2, 'Brand must be at least 2 characters')
    .max(50, 'Brand must be less than 50 characters'),

  category: z
    .string()
    .min(2, 'Category must be at least 2 characters')
    .max(50, 'Category must be less than 50 characters'),

  rating: z
    .number()
    .min(0, 'Rating cannot be less than 0')
    .max(5, 'Rating cannot be more than 5'),
});

export type ProductFormData = z.infer<typeof productSchema>;
