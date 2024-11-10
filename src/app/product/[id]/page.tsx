import ProductDetailsPage from "@/pages/front/product/Detail"

export default async function ProductPage({ params }: { params: { id: string } }) {
  const productId = Number(await params.id);

  // You can use server-side logic to fetch the product or directly pass it if it's static for now
  const product = {
    id: productId,
    name: 'Sample Product',
    description: 'This is a detailed description of the sample product.',
    price: 29.99,
    images: [
      '/images/sample1.jpg',
      '/images/sample2.jpg',
      '/images/sample3.jpg'
    ]
  }

  return <ProductDetailsPage product={product} />
}
