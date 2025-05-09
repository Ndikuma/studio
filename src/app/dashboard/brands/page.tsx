
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Building, PlusCircle, MoreHorizontal, Edit, Trash2, Eye, UploadCloud } from 'lucide-react';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

const brandCategories = [
  "GAMING", "ELECTRONICS", "FASHION", "SOFTWARE", "HEALTH", "EDUCATION", "OTHER"
];

const brandSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Brand name must be at least 2 characters."),
  description: z.string().optional(),
  category: z.enum(brandCategories as [string, ...string[]], { required_error: "Category is required."}),
  logoUrl: z.string().url("Must be a valid URL for logo.").optional().or(z.literal('')),
  websiteUrl: z.string().url("Must be a valid URL.").optional().or(z.literal('')),
});

type BrandFormValues = z.infer<typeof brandSchema>;

const mockBrandsData: BrandFormValues[] = [
  { id: 'brand001', name: 'GamerFuel Inc.', description: 'Top-tier gaming peripherals and accessories.', category: 'GAMING', logoUrl: 'https://picsum.photos/seed/gamerfuel/40/40', websiteUrl: 'https://gamerfuel.example.com' },
  { id: 'brand002', name: 'ElectroGadget Co.', description: 'Innovative electronic devices for modern living.', category: 'ELECTRONICS', logoUrl: 'https://picsum.photos/seed/electrogadget/40/40', websiteUrl: 'https://electrogadget.example.com' },
  { id: 'brand003', name: 'Chic Trends Boutique', description: 'Latest fashion apparel and accessories.', category: 'FASHION', logoUrl: 'https://picsum.photos/seed/chictrends/40/40', websiteUrl: 'https://chictrends.example.com' },
  { id: 'brand004', name: 'SoftSolutions Ltd.', description: 'Cutting-edge software for businesses and individuals.', category: 'SOFTWARE', logoUrl: 'https://picsum.photos/seed/softsolutions/40/40', websiteUrl: 'https://softsolutions.example.com' },
];

export default function BrandsPage() {
  const { toast } = useToast();
  const [brands, setBrands] = useState<BrandFormValues[]>(mockBrandsData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<BrandFormValues | null>(null);

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: '',
      description: '',
      category: undefined,
      logoUrl: '',
      websiteUrl: '',
    },
  });

  const handleDialogOpen = (brand?: BrandFormValues) => {
    if (brand) {
      setEditingBrand(brand);
      form.reset(brand);
    } else {
      setEditingBrand(null);
      form.reset({ name: '', description: '', category: undefined, logoUrl: '', websiteUrl: '' });
    }
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingBrand(null);
    form.reset();
  };

  const onSubmit: SubmitHandler<BrandFormValues> = (data) => {
    if (editingBrand) {
      setBrands(brands.map(b => b.id === editingBrand.id ? { ...data, id: editingBrand.id } : b));
      toast({ title: "Brand Updated", description: `Brand "${data.name}" has been updated.` });
    } else {
      setBrands([...brands, { ...data, id: `brand${Date.now()}` }]);
      toast({ title: "Brand Added", description: `Brand "${data.name}" has been added.` });
    }
    handleDialogClose();
  };

  const handleDelete = (brandId: string) => {
    setBrands(brands.filter(b => b.id !== brandId));
    toast({ title: "Brand Deleted", description: "The brand has been deleted.", variant: "destructive" });
  };


  return (
    <>
      <PageHeader
        title="Manage Brands"
        description="Oversee all brands available for promotion on PromoMarket."
        icon={Building}
        action={
          <Button onClick={() => handleDialogOpen()}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Brand
          </Button>
        }
      />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>All Brands</CardTitle>
          <CardDescription>A list of brands you can promote or associate with promotional items.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Logo</TableHead>
                <TableHead>Brand Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Website</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brands.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell>
                    {brand.logoUrl ? (
                      <Image src={brand.logoUrl} alt={brand.name} width={32} height={32} className="rounded-sm" data-ai-hint="company logo" />
                    ) : (
                      <div className="w-8 h-8 bg-muted rounded-sm flex items-center justify-center text-muted-foreground text-xs">
                        {brand.name.substring(0,2).toUpperCase()}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{brand.name}</TableCell>
                  <TableCell>{brand.category}</TableCell>
                  <TableCell>
                    {brand.websiteUrl ? (
                      <a href={brand.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Visit Site
                      </a>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Brand Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => alert(`Viewing details for ${brand.name}`)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDialogOpen(brand)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Brand
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(brand.id!)} className="text-destructive dark:text-red-400 dark:focus:text-red-300">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Brand
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {brands.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              <p>No brands added yet.</p>
              <Button variant="link" className="mt-2" onClick={() => handleDialogOpen()}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add your first brand
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingBrand ? 'Edit Brand' : 'Add New Brand'}</DialogTitle>
            <DialogDescription>
              {editingBrand ? `Update the details for ${editingBrand.name}.` : 'Fill in the information for the new brand.'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand Name</FormLabel>
                    <FormControl><Input placeholder="e.g., Awesome Tech Co." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl><Textarea placeholder="A brief description of the brand." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select brand category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {brandCategories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat.charAt(0) + cat.slice(1).toLowerCase()}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="logoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo URL (Optional)</FormLabel>
                    <FormControl><Input type="url" placeholder="https://example.com/logo.png" {...field} /></FormControl>
                     <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="websiteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL (Optional)</FormLabel>
                    <FormControl><Input type="url" placeholder="https://example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleDialogClose}>Cancel</Button>
                <Button type="submit">{editingBrand ? 'Save Changes' : 'Add Brand'}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
