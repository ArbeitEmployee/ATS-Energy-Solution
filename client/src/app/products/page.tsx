import { getProducts, getCategories } from '@/lib/api';
import ProductsCatalogClient from '@/components/products/ProductsCatalogClient';

export const dynamic = 'force-dynamic';

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams.category || '';
  const currentSearch = resolvedParams.search || '';

  // Fetch all initial products and categories from API / Data store
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts()
  ]);

  return (
    <ProductsCatalogClient
      initialProducts={products}
      categories={categories}
      initialCategorySlug={currentCategory}
      initialSearch={currentSearch}
    />
  );
}
