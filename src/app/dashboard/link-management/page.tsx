
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Link2, PlusCircle, MoreHorizontal, Edit, Trash2, BarChart2, Copy, User } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';


// Mock data
const mockPromotionalItems = [
  { id: 'item001', name: 'ProGamer Mouse X2000', affiliateUrlBase: 'https://example.com/progamerx2000' },
  { id: 'item002', name: 'SmartHome Hub Pro', affiliateUrlBase: 'https://example.com/smarthubpro' },
];
const mockAffiliates = [ // Represents Users
  { id: 'user1', username: 'AliceAffiliate' },
  { id: 'user2', username: 'BobPromoter' },
];

const affiliateLinkSchema = z.object({
  id: z.string().optional(),
  promotionalItemId: z.string({ required_error: "Promotional Item is required."}),
  affiliateId: z.string({ required_error: "Affiliate is required."}),
  uniqueCode: z.string().optional(), // Will be auto-generated
  // Clicks and conversions are usually managed by the backend
});

type AffiliateLinkFormValues = z.infer<typeof affiliateLinkSchema>;

const mockAffiliateLinksData: (AffiliateLinkFormValues & { promotionalItemName: string, affiliateUsername: string, clicks: number, conversions: number, shortLink: string, originalUrl: string, createdDate: string })[] = [
  { id: 'link001', promotionalItemId: 'item001', promotionalItemName: 'ProGamer Mouse X2000', affiliateId: 'user1', affiliateUsername: 'AliceAffiliate', uniqueCode: 'a1b2c3d4', clicks: 1250, conversions: 50, shortLink: 'https://promo.st/a1b2c3d4', originalUrl: 'https://example.com/progamerx2000?ref=a1b2c3d4', createdDate: '2024-06-01' },
  { id: 'link002', promotionalItemId: 'item002', promotionalItemName: 'SmartHome Hub Pro', affiliateId: 'user2', affiliateUsername: 'BobPromoter', uniqueCode: 'e5f6g7h8', clicks: 870, conversions: 30, shortLink: 'https://promo.st/e5f6g7h8', originalUrl: 'https://example.com/smarthubpro?ref=e5f6g7h8', createdDate: '2024-06-15' },
];


export default function AffiliateLinksPage() {
  const { toast } = useToast();
  const [links, setLinks] = useState<(AffiliateLinkFormValues & { promotionalItemName: string, affiliateUsername: string, clicks: number, conversions: number, shortLink: string, originalUrl: string, createdDate: string })[]>(mockAffiliateLinksData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<(AffiliateLinkFormValues & { promotionalItemName: string, affiliateUsername: string, clicks: number, conversions: number, shortLink: string, originalUrl: string, createdDate: string }) | null>(null);

  const form = useForm<AffiliateLinkFormValues>({
    resolver: zodResolver(affiliateLinkSchema),
  });
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({ title: 'Copied!', description: 'Affiliate link copied to clipboard.' });
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast({ title: 'Error', description: 'Failed to copy link.', variant: 'destructive' });
    });
  };

  const handleDialogOpen = (link?: (AffiliateLinkFormValues & { promotionalItemName: string, affiliateUsername: string, clicks: number, conversions: number, shortLink: string, originalUrl: string, createdDate: string })) => {
    if (link) {
      setEditingLink(link);
      form.reset(link);
    } else {
      setEditingLink(null);
      form.reset({ promotionalItemId: undefined, affiliateId: undefined });
    }
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingLink(null);
    form.reset();
  };

  const onSubmit: SubmitHandler<AffiliateLinkFormValues> = (data) => {
    const promotionalItem = mockPromotionalItems.find(item => item.id === data.promotionalItemId);
    const affiliate = mockAffiliates.find(user => user.id === data.affiliateId);

    if (!promotionalItem || !affiliate) {
      toast({ title: 'Error', description: 'Invalid promotional item or affiliate.', variant: 'destructive' });
      return;
    }
    
    const uniqueCode = Math.random().toString(36).substring(2, 10); // Simulate UUID
    const newLinkData = {
      ...data,
      promotionalItemName: promotionalItem.name,
      affiliateUsername: affiliate.username,
      uniqueCode,
      clicks: 0,
      conversions: 0,
      shortLink: `https://promo.st/${uniqueCode}`,
      originalUrl: `${promotionalItem.affiliateUrlBase}?ref=${uniqueCode}`,
      createdDate: new Date().toISOString().split('T')[0],
    };

    if (editingLink) {
      // Editing existing link - generally, unique code might not change, but for simplicity here we regenerate.
      // In a real app, you might only allow editing of associated item/affiliate if no clicks yet, or other logic.
      setLinks(links.map(l => l.id === editingLink.id ? { ...newLinkData, id: editingLink.id, clicks: editingLink.clicks, conversions: editingLink.conversions } : l));
      toast({ title: "Link Updated", description: `Affiliate link for "${promotionalItem.name}" has been updated.` });
    } else {
      setLinks([...links, { ...newLinkData, id: `link${Date.now()}` }]);
      toast({ title: "Link Generated", description: `New affiliate link generated for "${promotionalItem.name}".` });
    }
    handleDialogClose();
  };

  const handleDelete = (linkId: string) => {
    setLinks(links.filter(l => l.id !== linkId));
    toast({ title: "Link Deleted", description: "The affiliate link has been deleted.", variant: "destructive" });
  };


  return (
    <>
      <PageHeader
        title="Affiliate Links"
        description="Generate, manage, and track your unique affiliate links."
        icon={Link2}
        action={
          <Button onClick={() => handleDialogOpen()}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Generate New Link
          </Button>
        }
      />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Your Affiliate Links</CardTitle>
          <CardDescription>A list of all your generated affiliate links.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Short Link</TableHead>
                <TableHead>Promotional Item</TableHead>
                <TableHead>Affiliate</TableHead>
                <TableHead className="text-center">Clicks</TableHead>
                <TableHead className="text-center">Conversions</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {links.map((link) => (
                <TableRow key={link.id}>
                  <TableCell className="font-medium">
                    <a href={link.shortLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {link.shortLink}
                    </a>
                  </TableCell>
                  <TableCell className="truncate max-w-xs text-muted-foreground">{link.promotionalItemName}</TableCell>
                  <TableCell>{link.affiliateUsername}</TableCell>
                  <TableCell className="text-center">{link.clicks}</TableCell>
                  <TableCell className="text-center">{link.conversions}</TableCell>
                  <TableCell>{link.createdDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                           <span className="sr-only">Link Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => copyToClipboard(link.shortLink)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Short Link
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => alert(`Analytics for ${link.shortLink}`)}>
                          <BarChart2 className="mr-2 h-4 w-4" />
                          View Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDialogOpen(link)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Link
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(link.id!)} className="text-destructive dark:text-red-400 dark:focus:text-red-300">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Link
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
           {links.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              <p>No affiliate links created yet.</p>
              <Button variant="link" className="mt-2" onClick={() => handleDialogOpen()}>
                <PlusCircle className="mr-2 h-4 w-4" /> Generate your first link
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingLink ? 'Edit Affiliate Link' : 'Generate New Affiliate Link'}</DialogTitle>
            <DialogDescription>
              {editingLink ? 'Modify the details for this affiliate link.' : 'Select an item and affiliate to generate a new link.'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField name="promotionalItemId" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Promotional Item</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select promotional item" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {mockPromotionalItems.map(item => <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="affiliateId" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Affiliate (User)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select affiliate" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {mockAffiliates.map(user => <SelectItem key={user.id} value={user.id}>{user.username}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              {/* Unique code is auto-generated, not directly editable in this simplified form */}
               {editingLink && (
                <div>
                  <Label>Unique Code</Label>
                  <Input value={editingLink.uniqueCode} readOnly disabled className="mt-1 bg-muted" />
                </div>
              )}
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleDialogClose}>Cancel</Button>
                <Button type="submit">{editingLink ? 'Save Changes' : 'Generate Link'}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

