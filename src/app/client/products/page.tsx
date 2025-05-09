
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { ArrowRight, Search, Filter, ShoppingCart, Loader2 } from 'lucide-react';
import Image from 'next/image';

const mockProducts = Array.from({ length: 20 }).map((_, i) => ({
  id: `prod${i + 1}`,
  name: `Product Title ${i + 1}`,
  description: `This is a detailed description for Product ${i + 1}, highlighting its key features and benefits. It's designed to appeal to a wide audience.`,
  price: (Math.random() * 100 + 10).toFixed(2),
  category: ['Electronics', 'Home Goods', 'Fashion', 'Outdoor', 'Books'][i % 5],
  imageUrl: `https://picsum.photos/seed/productpage${i + 1}/400/300`,
  dataAiHint: `product ${i % 5 === 0 ? 'electronics' : i % 5 === 1 ? 'home' : i % 5 === 2 ? 'fashion' : i % 5 === 3 ? 'outdoor' : 'books'}`
}));

const ITEMS_PER_PAGE = 9;

export default function ClientProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    const timer = setTimeout(() => {
      let products = mockProducts;
      if (searchTerm) {
        products = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
      }
      if (selectedCategory !== 'all') {
        products = products.filter(p => p.category === selectedCategory);
      }
      setFilteredProducts(products);
      setCurrentPage(1); // Reset to first page on filter change
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const categories = ['all', ...new Set(mockProducts.map(p => p.category))];

  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Explore Our Products
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Find exactly what you're looking for from our wide selection.
        </p>
      </section>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Filter className="h-5 w-5 text-primary" /> Filter Products</CardTitle>
          <CardDescription>Refine your search to find the perfect items.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div>
            <label htmlFor="search-products" className="block text-sm font-medium text-muted-foreground mb-1">Search by Name</label>
            <div className="relative">
              <Input
                id="search-products"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <div>
            <label htmlFor="category-filter" className="block text-sm font-medium text-muted-foreground mb-1">Category</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category-filter">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-muted-foreground">Loading products...</p>
        </div>
      ) : (
        <>
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={400}
                    height={300}
                    data-ai-hint={product.dataAiHint}
                    className="w-full h-56 object-cover"
                  />
                  <CardHeader>
                    <CardTitle className="text-lg truncate" title={product.name}>{product.name}</CardTitle>
                    <CardDescription className="text-sm text-primary">{product.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground text-sm h-16 overflow-hidden text-ellipsis">{product.description}</p>
                    <p className="mt-3 text-xl font-semibold text-foreground">${product.price}</p>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" className="w-full">
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button className="w-full">
                      <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              <Search className="mx-auto h-12 w-12 mb-4" />
              <p className="text-xl">No products found matching your criteria.</p>
              <p>Try adjusting your search or filters.</p>
            </div>
          )}

          {totalPages > 1 && (
            <Pagination className="mt-12">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => { e.preventDefault(); handlePageChange(page); }}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  } else if (
                    (page === currentPage - 2 && currentPage > 3) ||
                    (page === currentPage + 2 && currentPage < totalPages - 2)
                  ) {
                    return <PaginationEllipsis key={`ellipsis-${page}`} />;
                  }
                  return null;
                })}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}
