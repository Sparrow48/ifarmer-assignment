'use client';
import { AppDispatch, RootState } from '@/store';
import { getProductDetails } from '@/store/productSlice';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface ProductDetailsProps {
  id: string;
}

const ProductDetails = (props: ProductDetailsProps) => {
  const { product, status } = useSelector((state: RootState) => state.product);

  const dispatch = useDispatch<AppDispatch>();
  const { id } = props;

  useEffect(() => {
    dispatch(getProductDetails({ id }));
  }, []);

  return (
    <div>
      {status == 'succeeded' ? (
        <div>
          {product ? (
            <div className="max-w-2xl py-16 mx-5 lg:mx-auto lg:max-w-6xl lg:grid lg:grid-cols-2 lg:gap-10">
              <div className="mt-10">
                <Image
                  src={product?.images?.[0]}
                  alt="Essence Mascara Lash Princess"
                  width={500}
                  height={300}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col space-y-5">
                <h1 className="text-4xl font-bold">{product.title}</h1>
                <h2 className="text-xl text-yellow-600">{product.price} tk</h2>
                <p className="leading-8 text-gray-600">{product.description}</p>
                <p>Available : In Stock ({product.stock})</p>
                <p>Category : {product.category}</p>
                <p>Brand : {product.brand}</p>
                {/* <p>SKU : {product.psn}</p> */}
                <p className="border-b-2 border-gray-400"></p>
              </div>
            </div>
          ) : (
            <h1 className="text-5xl text-center ">Product Not found</h1>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center w-screen h-screen bg-gray-50">
          <h1 className="text-2xl text-center ">Loading...</h1>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
