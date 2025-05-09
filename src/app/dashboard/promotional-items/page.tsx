
'use client';

import { useState, useEffect } from 'react';
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
import { ShoppingCart, PlusCircle, MoreHorizontal, Edit, Trash2, Eye, UploadCloud, DollarSign } from 'lucide-react';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

const itemTypes = ["PRODUCT", "DIGITAL", "SERVICE", "SUBSCRIPTION", "CAMPAIGN"];

// Mock data for brands and categories (in a real app, this would come from an API)
const mockBrands = [
  { id: 'brand001', name: 'GamerFuel Inc.' },
  { id: 'brand002', name: 'ElectroGadget Co.' },
  { id: 'brand003', name: 'Chic Trends Boutique'},
];
const mockCategories = [
  { id: 'cat001', name: 'Peripherals', brandId: 'brand001' },
  { id: 'cat002', name: 'Consoles', brandId: 'brand001' },
  { id: 'cat003', name: 'Smart Home', brandId: 'brand002' },
  { id: 'cat004', name: 'Apparel', brandId: 'brand003' },
  { id: 'cat005', name: 'General Tech', brandId: 'brand002'},
];

const promotionalItemSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "Item name must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  brandId: z.string({ required_error: "Brand is required."}),
  categoryId: z.string().optional(),
  itemType: z.enum(itemTypes as [string, ...string[]], { required_error: "Item type is required."}),
  affiliateUrl: z.string().url("Must be a valid affiliate URL."),
  imageUrl: z.string().url("Must be a valid image URL.").optional().or(z.literal('')),
  commissionRate: z.coerce.number().min(0).max(100, "Commission rate must be between 0 and 100."),
  metadata: z.string().optional().refine((val) => {
    if (!val || val.trim() === "") return true;
    try {
      JSON.parse(val);
      return true;
    } catch (e) {
      return false;
    }
  }, { message: "Metadata must be valid JSON or empty." }),
});

type PromotionalItemFormValues = z.infer<typeof promotionalItemSchema>;

const mockPromotionalItemsData: (PromotionalItemFormValues & { brandName: string, categoryName?: string })[] = [
  { id: 'item001', name: 'ProGamer Mouse X2000', description: 'High-precision gaming mouse with customizable RGB.', brandId: 'brand001', brandName: 'GamerFuel Inc.', categoryId: 'cat001', categoryName: 'Peripherals', itemType: 'PRODUCT', affiliateUrl: 'https://example.com/progamerx2000?aff=promomarket', imageUrl: 'https://picsum.photos/seed/mouse/64/64', commissionRate: 12.50, metadata: JSON.stringify({ dpi: 16000, buttons: 8 }) },
  { id: 'item002', name: 'SmartHome Hub Pro', description: 'Centralize your smart home devices with ease.', brandId: 'brand002', brandName: 'ElectroGadget Co.', categoryId: 'cat003', categoryName: 'Smart Home', itemType: 'PRODUCT', affiliateUrl: 'https://example.com/smarthubpro?aff=promomarket', imageUrl: 'https://picsum.photos/seed/hub/64/64', commissionRate: 8.00, metadata: JSON.stringify({ connectivity: ["WiFi", "Zigbee"] }) },
  { id: 'item003', name: 'Summer Fashion Line Promo', description: 'Promote the new summer collection.', brandId: 'brand003', brandName: 'Chic Trends Boutique', itemType: 'CAMPAIGN', affiliateUrl: 'https://example.com/summerpromo?aff=promomarket', commissionRate: 15.00, metadata: JSON.stringify({ duration: "30 days" }) },
];

export default function PromotionalItemsPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<(PromotionalItemFormValues & { brandName: string, categoryName?: string })[]>(mockPromotionalItemsData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PromotionalItemFormValues | null>(null);
  const [availableCategories, setAvailableCategories] = useState<{ id: string, name: string }[]>([]);

  const form = useForm<PromotionalItemFormValues>({
    resolver: zodResolver(promotionalItemSchema),
  });

  useEffect(() => {
    const selectedBrandId = form.watch('brandId');
    if (selectedBrandId) {
      setAvailableCategories(mockCategories.filter(c => c.brandId === selectedBrandId));
    } else {
      setAvailableCategories([]);
    }
  }, [form.watch('brandId')]);


  const handleDialogOpen = (item?: PromotionalItemFormValues) => {
    if (item) {
      setEditingItem(item);
      form.reset({
        ...item,
        commissionRate: Number(item.commissionRate), // Ensure number
        metadata: typeof item.metadata === 'object' ? JSON.stringify(item.metadata, null, 2) : item.metadata || ""
      });
    } else {
      setEditingItem(null);
      form.reset({
        name: '', description: '', brandId: undefined, categoryId: undefined,
        itemType: undefined, affiliateUrl: '', imageUrl: '', commissionRate: 0, metadata: ''
      });
    }
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
    form.reset();
  };

  const onSubmit: SubmitHandler<PromotionalItemFormValues> = (data) => {
    const brandName = mockBrands.find(b => b.id === data.brandId)?.name || 'Unknown Brand';
    const categoryName = mockCategories.find(c => c.id === data.categoryId)?.name;
    const submittedData = { ...data, brandName, categoryName };

    if (editingItem) {
      setItems(items.map(i => i.id === editingItem.id ? { ...submittedData, id: editingItem.id } : i));
      toast({ title: "Item Updated", description: `Promotional item "${data.name}" has been updated.` });
    } else {
      setItems([...items, { ...submittedData, id: `item${Date.now()}` }]);
      toast({ title: "Item Added", description: `Promotional item "${data.name}" has been added.` });
    }
    handleDialogClose();
  };
  
  const handleDelete = (itemId: string) => {
    setItems(items.filter(i => i.id !== itemId));
    toast({ title: "Item Deleted", description: "The promotional item has been deleted.", variant: "destructive" });
  };

  return (
    <>
      <PageHeader
        title="Promotional Items"
        description="Manage all products, services, and campaigns available for promotion."
        icon={ShoppingCart}
        action={
          <Button onClick={() => handleDialogOpen()}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Item
          </Button>
        }
      />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>All Promotional Items</CardTitle>
          <CardDescription>Browse and manage items that can be promoted.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Image</TableHead>
                <TableHead>Item Name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Commission</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {item.imageUrl ? (
                      <Image src={item.imageUrl} alt={item.name} width={48} height={48} className="rounded-md object-cover" data-ai-hint="product item" />
                    ) : (
                      <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                        <ShoppingCart className="h-6 w-6" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.brandName}</TableCell>
                  <TableCell>{item.itemType}</TableCell>
                  <TableCell>{item.commissionRate?.toFixed(2)}%</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => alert(`Viewing ${item.name}`)}>
                          <Eye className="mr-2 h-4 w-4" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDialogOpen(item)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(item.id!)} className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {items.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              <p>No promotional items added yet.</p>
              <Button variant="link" className="mt-2" onClick={() => handleDialogOpen()}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add your first item
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Promotional Item' : 'Add New Promotional Item'}</DialogTitle>
            <DialogDescription>
              {editingItem ? 'Update details for this promotional item.' : 'Provide information for the new promotional item.'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
              <FormField name="name" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Item Name</FormLabel><FormControl><Input placeholder="e.g., SuperWidget Pro" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="description" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Detailed description of the item..." {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField name="brandId" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <Select onValueChange={(value) => { field.onChange(value); form.setValue('categoryId', undefined); }} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select brand" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {mockBrands.map(brand => <SelectItem key={brand.id} value={brand.id}>{brand.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="categoryId" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category (Optional)</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled={availableCategories.length === 0}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {availableCategories.map(cat => <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>)}
                         {availableCategories.length === 0 && form.getValues("brandId") && <SelectItem value="-" disabled>No categories for this brand</SelectItem>}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField name="itemType" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select item type" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {itemTypes.map(type => <SelectItem key={type} value={type}>{type.charAt(0) + type.slice(1).toLowerCase()}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                 <FormField name="commissionRate" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commission Rate (%)</FormLabel>
                    <FormControl><Input type="number" step="0.01" placeholder="e.g., 10.5" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField name="affiliateUrl" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Affiliate URL</FormLabel><FormControl><Input type="url" placeholder="https://partner.example.com/track?id=..." {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="imageUrl" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Image URL (Optional)</FormLabel><FormControl><Input type="url" placeholder="https://example.com/image.jpg" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="metadata" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Metadata (Optional, JSON format)</FormLabel>
                  <FormControl><Textarea placeholder='e.g., { "color": "blue", "size": "large" }' {...field} className="font-mono text-xs min-h-[80px]" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleDialogClose}>Cancel</Button>
                <Button type="submit">{editingItem ? 'Save Changes' : 'Add Item'}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
