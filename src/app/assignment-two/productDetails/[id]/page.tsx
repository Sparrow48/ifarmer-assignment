import ProductDetails from '@/components/product/ProductDetails';

const SingleProductDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  return <ProductDetails id={id} />;
};

export default SingleProductDetails;
