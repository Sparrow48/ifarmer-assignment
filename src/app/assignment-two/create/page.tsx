/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import ProductForm from '@/components/product/ProductForm';
import { AppDispatch } from '@/store';
import { createProducts } from '@/store/productSlice';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import toastr from 'toastr';

export default function CreateProductPage() {
  const dispatch = useDispatch<AppDispatch>();
  const route = useRouter();

  const handleCreate = async (data: any) => {
    const res = await dispatch(createProducts(data));

    if (res.payload) {
      toastr.success(`${res.payload.title} added successfully.`);
      route.push('/assignment-two');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4 justify-center w-full items-center flex">
        Create Product
      </h1>
      <ProductForm onSubmit={handleCreate} />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}
