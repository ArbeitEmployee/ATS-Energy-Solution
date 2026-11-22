import { getProductBySlug, getProducts } from '@/lib/api';
import { notFound } from 'next/navigation';
import ProductDetailView from '@/components/products/ProductDetailView';

interface ProductDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Fetch similar products in the same category or general catalog
  const allProducts = await getProducts();
  const similarProducts = allProducts.filter(
    (p) => p.slug !== product.slug && (p.category === product.category || !product.category)
  );

  return (
    <ProductDetailView 
      product={product} 
      similarProducts={similarProducts.length > 0 ? similarProducts : allProducts.filter(p => p.slug !== product.slug)} 
    />
  );
}
