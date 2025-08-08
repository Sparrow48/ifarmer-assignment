import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ProductItemProps {
  _id: number;
  image: string;
  title: string;
  price: number;
}

const ProductItem: React.FC<ProductItemProps> = (props) => {
  return (
    <div className="flex flex-col space-y-3 lg:w-72  shadow-lg rounded-lg p-2">
      <Link href={`/productDetails/${props._id}`}>
        <div className="relative w-64 h-64">
          <Image
            src={props.image}
            alt="Essence Mascara Lash Princess"
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex justify-between">
          <h1 className="text-gray-600 truncate">{props.title}</h1>
          <h2 className="text-yellow-600">{props.price} tk</h2>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
