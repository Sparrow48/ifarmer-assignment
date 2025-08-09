'use client';
import FilterProducts from '@/components/product/FilterProducts';
import ProductItem from '@/components/product/ProductItem';
import { getProducts } from '@/store/productSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';
import Link from 'next/link';
import Pagination from '@/components/product/Pagination';

const Product = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, total, status } = useSelector(
    (state: RootState) => state.product
  );

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getProducts({ page: currentPage }));
  }, [currentPage]);

  return (
    <div>
      <div className="flex flex-col max-w-2xl px-10 py-16 mx-auto space-y-10 md:space-y-0 lg:px-0 md:max-w-3xl lg:max-w-4xl xl:max-w-6xl md:flex-row">
        <div className=" h-full pr-5 top-24 lg:sticky  basis-1/6">
          <FilterProducts />
        </div>
        <div className="max-w-2xl divide-y lg:max-w-4xl xl:max-w-5xl basis-5/6">
          <div className="flex flex-col md:flex-row gap-3 justify-between lg:w-4xl xl:max-w-5xl pb-2">
            <div className=" w-fit p-2 bg-gray-200 border border-gray-200 rounded">
              <h1>{total} Products Found.</h1>
            </div>

            <div className="relative inline-block w-40">
              <Link
                className="border shadow-2xl bg-blue-300 p-2 rounded-md border-blue-400 hover:bg-blue-200 hover:border-blue-200"
                href={`/assignment-two/create`}
              >
                Add New Product
              </Link>
            </div>
          </div>
          {status == 'succeeded' ? (
            <>
              {total > 0 ? (
                <div>
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
                    <Pagination
                      currentPage={currentPage}
                      totalPages={Math.round(total / 30)}
                      onPageChange={(page) => setCurrentPage(page)}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-screen">
                  <p className="text-3xl">No Product Found</p>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-screen">
              <p className="text-3xl">Loading...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
