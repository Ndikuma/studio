
'use client';

import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Search, ArrowRight, Tag, FileText, Video, Mic } from 'lucide-react';
import Image from 'next/image';

const mockResources = [
  {
    id: 'res001',
    title: 'The Ultimate Guide to Digital Promotion in 2024',
    type: 'Article',
    category: 'Beginner Guides',
    description: 'Learn the fundamentals of digital market promotion, from choosing a niche to driving traffic and converting sales.',
    imageUrl: 'https://picsum.photos/400/200?grayscale&random=1',
    dataAiHint: 'guide book',
    icon: FileText,
  },
  {
    id: 'res002',
    title: 'Advanced SEO Strategies for Promotional Websites',
    type: 'Article',
    category: 'SEO & Traffic',
    description: 'Boost your organic traffic with these proven SEO techniques tailored for digital promoters.',
    imageUrl: 'https://picsum.photos/400/200?grayscale&random=2',
    dataAiHint: 'seo chart',
    icon: FileText,
  },
  {
    id: 'res003',
    title: 'Video Tutorial: Setting Up Your First Promo Campaign',
    type: 'Video',
    category: 'Campaign Management',
    description: 'A step-by-step video guide to creating and launching a successful digital promotion campaign.',
    imageUrl: 'https://picsum.photos/400/200?grayscale&random=3',
    dataAiHint: 'video play button',
    icon: Video,
  },
  {
    id: 'res004',
    title: 'How to Choose High-Converting Products for Promotion',
    type: 'Article',
    category: 'Product Selection',
    description: 'Discover the secrets to finding products that your audience will love and that will maximize your promotional commissions.',
    imageUrl: 'https://picsum.photos/400/200?grayscale&random=4',
    dataAiHint: 'target product',
    icon: FileText,
  },
  {
    id: 'res005',
    title: 'Podcast: Interviews with Top Digital Promoters',
    type: 'Podcast',
    category: 'Interviews & Insights',
    description: 'Hear from successful digital marketers who share their promotion tips, tricks, and inspiring journeys.',
    imageUrl: 'https://picsum.photos/400/200?grayscale&random=5',
    dataAiHint: 'microphone podcast',
    icon: Mic,
  },
  {
    id: 'res006',
    title: 'Understanding Digital Promotion Analytics',
    type: 'Article',
    category: 'Analytics & Reporting',
    description: 'Make data-driven decisions by learning how to interpret key digital promotion metrics and reports.',
    imageUrl: 'https://picsum.photos/400/200?grayscale&random=6',
    dataAiHint: 'data analytics',
    icon: FileText,
  },
];

const categories = ['All Categories', 'Beginner Guides', 'SEO & Traffic', 'Campaign Management', 'Product Selection', 'Interviews & Insights', 'Analytics & Reporting'];
const types = ['All Types', 'Article', 'Video', 'Podcast', 'Guide'];


export default function ResourceLibraryPage() {
  return (
    <>
      <PageHeader
        title="Resource Library - PromoMarket"
        description="Access guides, tutorials, and insights to help you succeed in digital market promotion."
        icon={BookOpen}
      />

      <Card className="mb-8 shadow-lg">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="md:col-span-1">
              <label htmlFor="search-resources" className="block text-sm font-medium text-muted-foreground mb-1">Search Promo Resources</label>
              <div className="relative">
                <Input id="search-resources" placeholder="Search by keyword..." className="pr-10" />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div>
              <label htmlFor="category-filter" className="block text-sm font-medium text-muted-foreground mb-1">Category</label>
              <Select defaultValue="All Categories">
                <SelectTrigger id="category-filter">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="type-filter" className="block text-sm font-medium text-muted-foreground mb-1">Type</label>
              <Select defaultValue="All Types">
                <SelectTrigger id="type-filter">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockResources.map((resource) => (
          <Card key={resource.id} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-0">
              <Image
                src={resource.imageUrl}
                alt={resource.title}
                width={400}
                height={200}
                data-ai-hint={resource.dataAiHint}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="flex-grow p-6">
              <div className="flex items-center text-xs text-muted-foreground mb-2">
                <resource.icon className="h-4 w-4 mr-1.5 text-primary" />
                <span>{resource.type}</span>
                <span className="mx-1.5">·</span>
                <Tag className="h-3 w-3 mr-1 text-primary" />
                <span>{resource.category}</span>
              </div>
              <CardTitle className="text-lg mb-2">{resource.title}</CardTitle>
              <CardDescription className="text-sm leading-relaxed">{resource.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button variant="outline" className="w-full">
                Read More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {mockResources.length === 0 && (
        <Card className="shadow-lg">
          <CardContent className="py-20 text-center text-muted-foreground">
            <BookOpen className="mx-auto h-12 w-12 mb-4" />
            <p className="text-lg">No promotional resources found.</p>
            <p>Check back later for helpful guides and articles on digital promotion.</p>
          </CardContent>
        </Card>
      )}
    </>
  );
}
