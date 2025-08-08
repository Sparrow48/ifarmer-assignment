'use client';
import FilterProducts from '@/components/product/FilterProducts';
import ProductItem from '@/components/product/ProductItem';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Product = () => {
  const dispatch = useDispatch();
  // const { updateProducts, products, show = true, fetchProductStatus } = useSelector(state => state.product);

  // useEffect(() => {
  //   if (Object.keys(products)?.length <= 0) {
  //     dispatch(fetchProduct())
  //   }
  // }, [])

  // if (fetchProductStatus === 'loading') {
  //   return (
  //     <Skeleton />
  //   )
  // }

  const updateProducts = {
    0: {
      _id: '1a',
      image:
        'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
      title: 'Hello',
      price: 50,
    },
    1: {
      _id: '1s',
      image:
        'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
      title: 'Hello',
      price: 50,
    },
    2: {
      _id: '1d',
      image:
        'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
      title: 'Hello',
      price: 50,
    },
    3: {
      _id: '1f',
      image:
        'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
      title: 'Hello',
      price: 50,
    },
    4: {
      _id: '1g',
      image:
        'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
      title: 'Hello',
      price: 50,
    },
    5: {
      _id: '1h',
      image:
        'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
      title: 'Hello',
      price: 50,
    },
  };

  return (
    <div>
      <div className="flex flex-col max-w-2xl px-10 py-16 mx-auto space-y-10 md:space-y-0 lg:px-0 md:max-w-3xl lg:max-w-4xl xl:max-w-6xl md:flex-row">
        <div className=" h-full pr-5 top-24 lg:sticky  basis-1/6">
          <FilterProducts />
        </div>
        <div className="max-w-2xl divide-y lg:max-w-5xl basis-5/6">
          <div className="flex flex-col md:flex-row gap-3 justify-between lg:w-5xl pb-2">
            <div className="px-3 w-fit pt-1 bg-gray-100 border rounded">
              <h1>55 Products Found.</h1>
            </div>

            <div className="relative inline-block w-64 ">
              <button>Add New</button>
            </div>
          </div>
          {Object.keys(updateProducts)?.length > 0 ? (
            <div className="grid max-w-2xl grid-cols-1 pt-5 mx-auto lg:max-w-5xl lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-12">
              {Object.values(updateProducts)?.map((product) => (
                <ProductItem
                  key={product._id}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  _id={product._id}
                />
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
