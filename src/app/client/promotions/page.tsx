
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from '@/components/ui/pagination';
import { ArrowRight, Search, Filter, Link as LinkIcon, Loader2, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

const mockBrands = [
  { id: 'all', name: 'All Brands' },
  { id: 'brand001', name: 'GamerFuel Inc.' },
  { id: 'brand002', name: 'ElectroGadget Co.' },
  { id: 'brand003', name: 'Chic Trends Boutique'},
  { id: 'brand004', name: 'SoftSolutions Ltd.'},
];

const mockCategories = [
  { id: 'all', name: 'All Categories'},
  { id: 'cat001', name: 'Peripherals', brandId: 'brand001' },
  { id: 'cat002', name: 'Consoles', brandId: 'brand001' },
  { id: 'cat003', name: 'Smart Home', brandId: 'brand002' },
  { id: 'cat004', name: 'Apparel', brandId: 'brand003' },
  { id: 'cat005', name: 'Productivity', brandId: 'brand004'},
];

const itemTypes = ["ALL", "PRODUCT", "DIGITAL", "SERVICE", "SUBSCRIPTION", "CAMPAIGN"];

const mockPromotionalItems = Array.from({ length: 25 }).map((_, i) => {
  const brand = mockBrands[(i % (mockBrands.length -1)) + 1]; // Exclude 'All Brands'
  const possibleCategories = mockCategories.filter(c => c.brandId === brand.id || c.id === 'all');
  const category = possibleCategories.length > 1 ? possibleCategories[(i % (possibleCategories.length - 1)) + 1] : mockCategories[0];
  const type = itemTypes[(i % (itemTypes.length - 1)) + 1];

  return {
    id: `promo${i + 1}`,
    name: `Promotional Item ${i + 1} (${type.toLowerCase()})`,
    description: `Description for promotional item ${i + 1}. This is a great opportunity to earn by promoting this ${type.toLowerCase()} from ${brand.name}.`,
    priceDisplay: type === "SUBSCRIPTION" ? `$${(Math.random() * 30 + 5).toFixed(2)}/mo` : `$${(Math.random() * 200 + 10).toFixed(2)}`,
    brandId: brand.id,
    brandName: brand.name,
    categoryId: category.id,
    categoryName: category.name,
    itemType: type,
    imageUrl: `https://picsum.photos/seed/promoitem${i + 1}/400/300`,
    dataAiHint: `${type.toLowerCase()} ${brand.name.split(' ')[0].toLowerCase()}`,
    commissionRate: (Math.random() * 20 + 5).toFixed(1), // e.g. 12.5%
  };
});


const ITEMS_PER_PAGE = 9;

export default function ClientPromotionsPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredItems, setFilteredItems] = useState(mockPromotionalItems);
  const [displayCategories, setDisplayCategories] = useState(mockCategories);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let items = mockPromotionalItems;
      if (searchTerm) {
        items = items.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
      }
      if (selectedBrand !== 'all') {
        items = items.filter(p => p.brandId === selectedBrand);
      }
      if (selectedCategory !== 'all') {
        items = items.filter(p => p.categoryId === selectedCategory);
      }
      if (selectedType !== 'ALL') {
        items = items.filter(p => p.itemType === selectedType);
      }
      setFilteredItems(items);
      setCurrentPage(1); 
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedBrand, selectedCategory, selectedType]);

  useEffect(() => {
    if (selectedBrand === 'all') {
      setDisplayCategories(mockCategories);
    } else {
      setDisplayCategories([mockCategories[0], ...mockCategories.filter(c => c.brandId === selectedBrand)]);
    }
    setSelectedCategory('all'); // Reset category when brand changes
  }, [selectedBrand]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0,0);
    }
  };
  
  const handleGetAffiliateLink = (itemName: string) => {
    toast({
      title: "Affiliate Link Generated (Simulated)",
      description: `Your unique affiliate link for ${itemName} is ready: https://promo.st/xyz123`,
    });
  };

  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Browse Promotional Opportunities
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover a wide range of products, services, and campaigns to promote and earn commissions.
        </p>
      </section>

      <Card className="shadow-lg sticky top-16 z-40 bg-background/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Filter className="h-5 w-5 text-primary" /> Filter Promotions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="search-items" className="block text-sm font-medium text-muted-foreground mb-1">Search by Name</label>
            <div className="relative">
              <Input
                id="search-items"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <div>
            <label htmlFor="brand-filter" className="block text-sm font-medium text-muted-foreground mb-1">Brand</label>
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger id="brand-filter"><SelectValue placeholder="Filter by brand" /></SelectTrigger>
              <SelectContent>
                {mockBrands.map(brand => (
                  <SelectItem key={brand.id} value={brand.id}>{brand.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="category-filter" className="block text-sm font-medium text-muted-foreground mb-1">Category</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory} disabled={selectedBrand === 'all' && displayCategories.length <=1}>
              <SelectTrigger id="category-filter"><SelectValue placeholder="Filter by category" /></SelectTrigger>
              <SelectContent>
                {displayCategories.map(category => (
                  <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="type-filter" className="block text-sm font-medium text-muted-foreground mb-1">Item Type</label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger id="type-filter"><SelectValue placeholder="Filter by type" /></SelectTrigger>
              <SelectContent>
                {itemTypes.map(type => (
                  <SelectItem key={type} value={type}>{type === 'ALL' ? 'All Types' : type.charAt(0) + type.slice(1).toLowerCase()}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-muted-foreground">Loading promotional items...</p>
        </div>
      ) : (
        <>
          {paginatedItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedItems.map((item) => (
                <Card key={item.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={400}
                    height={300}
                    data-ai-hint={item.dataAiHint}
                    className="w-full h-56 object-cover"
                  />
                  <CardHeader>
                    <CardTitle className="text-lg truncate" title={item.name}>{item.name}</CardTitle>
                    <CardDescription className="text-sm">
                      <span className="text-primary">{item.brandName}</span> | {item.categoryName !== 'All Categories' ? item.categoryName : item.itemType}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground text-sm h-16 overflow-hidden text-ellipsis">{item.description}</p>
                    <p className="mt-3 text-lg font-semibold text-foreground">{item.priceDisplay}</p>
                    <p className="mt-1 text-sm text-accent">Commission: {item.commissionRate}%</p>
                  </CardContent>
                  <CardFooter className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" className="w-full">
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button className="w-full" onClick={() => handleGetAffiliateLink(item.name)}>
                      <LinkIcon className="mr-2 h-4 w-4" /> Get Affiliate Link
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              <Search className="mx-auto h-12 w-12 mb-4" />
              <p className="text-xl">No promotional items found matching your criteria.</p>
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
                  // Basic pagination display logic (show first, last, current +/- 1, and ellipses)
                  if (
                    page === 1 || page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1) ||
                    (currentPage <=3 && page <= 3) || // show 1,2,3 if current is 1,2 or 3
                    (currentPage >= totalPages - 2 && page >= totalPages -2) // show last 3 if current is in last 3
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
                     // Show ellipsis only once between groups of numbers
                    if ((page === currentPage - 2 && currentPage > 3 && !(currentPage - 3 === 1)) || 
                        (page === currentPage + 2 && currentPage < totalPages - 2 && !(currentPage + 3 === totalPages))) {
                         return <PaginationEllipsis key={`ellipsis-${page}`} />;
                    }
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
