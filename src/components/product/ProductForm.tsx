'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, ProductFormData } from './../../utils/index';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function ProductForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => void;
}) {
  const { status } = useSelector((state: RootState) => state.product);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-lg mx-auto"
    >
      <div>
        <label>Title</label>
        <input {...register('title')} className="border p-2 w-full" />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <label>Description</label>
        <textarea {...register('description')} className="border p-2 w-full" />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label>SKU</label>
        <input {...register('sku')} className="border p-2 w-full" />
        {errors.sku && <p className="text-red-500">{errors.sku.message}</p>}
      </div>

      <div>
        <label>Price</label>
        <input
          type="number"
          step="0.01"
          {...register('price', { valueAsNumber: true })}
          className="border p-2 w-full"
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>

      <div>
        <label>Stock</label>
        <input
          type="number"
          {...register('stock', { valueAsNumber: true })}
          className="border p-2 w-full"
        />
        {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
      </div>

      <div>
        <label>Brand</label>
        <input {...register('brand')} className="border p-2 w-full" />
        {errors.brand && <p className="text-red-500">{errors.brand.message}</p>}
      </div>

      <div>
        <label>Category</label>
        <input {...register('category')} className="border p-2 w-full" />
        {errors.category && (
          <p className="text-red-500">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label>Rating</label>
        <input
          type="number"
          step="0.1"
          {...register('rating', { valueAsNumber: true })}
          className="border p-2 w-full"
        />
        {errors.rating && (
          <p className="text-red-500">{errors.rating.message}</p>
        )}
      </div>

      <button
        type="submit"
        className={` text-white px-4 py-2 rounded cursor-pointer ${
          status === 'loading' ? 'bg-gray-200' : 'bg-blue-500'
        }`}
        disabled={status === 'loading'}
      >
        Save Product
      </button>
    </form>
  );
}
