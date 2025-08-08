'use client';
import FilterProducts from '@/components/product/FilterProducts';
import ProductItem from '@/components/product/ProductItem';
import { getProducts } from '@/store/productSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';

const Product = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, total, skip, limit } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div>
      <div className="flex flex-col max-w-2xl px-10 py-16 mx-auto space-y-10 md:space-y-0 lg:px-0 md:max-w-3xl lg:max-w-4xl xl:max-w-6xl md:flex-row">
        <div className=" h-full pr-5 top-24 lg:sticky  basis-1/6">
          <FilterProducts />
        </div>
        <div className="max-w-2xl divide-y lg:max-w-4xl xl:max-w-5xl basis-5/6">
          <div className="flex flex-col md:flex-row gap-3 justify-between lg:w-4xl xl:max-w-5xl pb-2">
            <div className="px-3 w-fit pt-1 bg-gray-100 border rounded">
              <h1>{products.length} Products Found.</h1>
            </div>

            <div className="relative inline-block w-64 ">
              <button>Add New</button>
            </div>
          </div>
          {total > 0 ? (
            <div className="flex flex-wrap justify-center gap-10 max-w-5xl mx-auto pt-5">
              {products.map((product) => (
                <div key={product?.id}>
                  <ProductItem
                    image={product?.images[0]}
                    title={product?.title}
                    price={product?.price}
                    _id={product?.id}
                  />
                </div>
              ))}
            </div>
          ) : (
            <>No Product Found</>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
