
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
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FileText, PlusCircle, MoreHorizontal, Edit, Trash2, Eye, User, DollarSign } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

const contentTypes = ["BLOG", "VIDEO", "TUTORIAL", "SOCIAL_POST"];

// Mock data
const mockCreators = [{ id: 'user1', name: 'Content Creator A' }, { id: 'user2', name: 'Influencer B' }];
const mockPromotionalItems = [{ id: 'item001', name: 'ProGamer Mouse X2000' }, { id: 'item002', name: 'SmartHome Hub Pro' }];
const mockCampaigns = [{ id: 'camp001', title: 'Summer Gaming Fest' }, { id: 'camp002', title: 'Smart Living Q3 Push' }];

const contentSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Content title must be at least 3 characters."),
  body: z.string().min(20, "Content body must be at least 20 characters."),
  creatorId: z.string({ required_error: "Creator is required." }),
  promotionalItemId: z.string().optional(),
  campaignId: z.string().optional(),
  contentType: z.enum(contentTypes as [string, ...string[]], { required_error: "Content type is required." }),
  isMonetized: z.boolean().default(false),
  adRevenue: z.coerce.number().min(0).optional(),
});

type ContentFormValues = z.infer<typeof contentSchema>;

const mockContentData: (ContentFormValues & { creatorName: string, promotionalItemName?: string, campaignTitle?: string })[] = [
  { id: 'cont001', title: 'My Review of ProGamer Mouse X2000', body: 'This mouse is amazing for FPS games...', creatorId: 'user1', creatorName: 'Content Creator A', promotionalItemId: 'item001', promotionalItemName: 'ProGamer Mouse X2000', contentType: 'BLOG', isMonetized: true, adRevenue: 150.75 },
  { id: 'cont002', title: 'Unboxing SmartHome Hub Pro!', body: 'Check out this cool smart home hub I got...', creatorId: 'user2', creatorName: 'Influencer B', promotionalItemId: 'item002', promotionalItemName: 'SmartHome Hub Pro', contentType: 'VIDEO', isMonetized: true, adRevenue: 320.50 },
  { id: 'cont003', title: 'Join the Summer Gaming Fest', body: 'Excited to be part of this gaming fest campaign!', creatorId: 'user1', creatorName: 'Content Creator A', campaignId: 'camp001', campaignTitle: 'Summer Gaming Fest', contentType: 'SOCIAL_POST', isMonetized: false },
];

export default function ContentManagementPage() {
  const { toast } = useToast();
  const [contents, setContents] = useState<(ContentFormValues & { creatorName: string, promotionalItemName?: string, campaignTitle?: string })[]>(mockContentData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<ContentFormValues | null>(null);

  const form = useForm<ContentFormValues>({
    resolver: zodResolver(contentSchema),
    defaultValues: { isMonetized: false, adRevenue: 0 },
  });
  
  const watchIsMonetized = form.watch("isMonetized");

  const handleDialogOpen = (content?: ContentFormValues) => {
    if (content) {
      setEditingContent(content);
      form.reset({
        ...content,
        adRevenue: content.adRevenue !== undefined ? Number(content.adRevenue) : 0,
      });
    } else {
      setEditingContent(null);
      form.reset({
        title: '', body: '', creatorId: undefined, promotionalItemId: undefined, campaignId: undefined,
        contentType: undefined, isMonetized: false, adRevenue: 0
      });
    }
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingContent(null);
    form.reset();
  };

  const onSubmit: SubmitHandler<ContentFormValues> = (data) => {
    const creatorName = mockCreators.find(c => c.id === data.creatorId)?.name || 'N/A';
    const promotionalItemName = mockPromotionalItems.find(item => item.id === data.promotionalItemId)?.name;
    const campaignTitle = mockCampaigns.find(c => c.id === data.campaignId)?.title;
    
    const submittedData = { ...data, creatorName, promotionalItemName, campaignTitle };
    if (!data.isMonetized) {
        submittedData.adRevenue = 0; // Reset ad revenue if not monetized
    }


    if (editingContent) {
      setContents(contents.map(c => c.id === editingContent.id ? { ...submittedData, id: editingContent.id } : c));
      toast({ title: "Content Updated", description: `Content piece "${data.title}" has been updated.` });
    } else {
      setContents([...contents, { ...submittedData, id: `cont${Date.now()}` }]);
      toast({ title: "Content Added", description: `Content piece "${data.title}" has been added.` });
    }
    handleDialogClose();
  };
  
  const handleDelete = (contentId: string) => {
    setContents(contents.filter(c => c.id !== contentId));
    toast({ title: "Content Deleted", description: "The content piece has been deleted.", variant: "destructive" });
  };

  return (
    <>
      <PageHeader
        title="Content Management"
        description="Oversee and manage all promotional content pieces."
        icon={FileText}
        action={
          <Button onClick={() => handleDialogOpen()}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Content
          </Button>
        }
      />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>All Content Pieces</CardTitle>
          <CardDescription>A list of blog posts, videos, social media posts, etc.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Creator</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Associated With</TableHead>
                <TableHead>Monetized</TableHead>
                <TableHead className="text-right">Ad Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contents.map((content) => (
                <TableRow key={content.id}>
                  <TableCell className="font-medium">{content.title}</TableCell>
                  <TableCell>{content.creatorName}</TableCell>
                  <TableCell>{content.contentType.replace('_', ' ')}</TableCell>
                  <TableCell>{content.promotionalItemName || content.campaignTitle || 'N/A'}</TableCell>
                  <TableCell>{content.isMonetized ? 'Yes' : 'No'}</TableCell>
                  <TableCell className="text-right">
                    {content.isMonetized && content.adRevenue ? `$${content.adRevenue.toFixed(2)}` : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                         <DropdownMenuItem onClick={() => alert(`Viewing ${content.title}`)}>
                          <Eye className="mr-2 h-4 w-4" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDialogOpen(content)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(content.id!)} className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {contents.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              <p>No content pieces created yet.</p>
              <Button variant="link" className="mt-2" onClick={() => handleDialogOpen()}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add your first content piece
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingContent ? 'Edit Content Piece' : 'Add New Content Piece'}</DialogTitle>
            <DialogDescription>
              {editingContent ? 'Update details for this content.' : 'Provide information for the new content piece.'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
              <FormField name="title" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Content Title</FormLabel><FormControl><Input placeholder="e.g., Top 5 Gaming Mice of 2024" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="body" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Body / Script</FormLabel><FormControl><Textarea placeholder="Main content of the blog, video script, or social media post..." {...field} className="min-h-[120px]" /></FormControl><FormMessage /></FormItem>
              )} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField name="creatorId" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Creator (User)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select creator" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {mockCreators.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="contentType" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select content type" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {contentTypes.map(type => <SelectItem key={type} value={type}>{type.replace('_', ' ')}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField name="promotionalItemId" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Associated Promotional Item (Optional)</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select item" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {mockPromotionalItems.map(item => <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="campaignId" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Associated Campaign (Optional)</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select campaign" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {mockCampaigns.map(c => <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <FormField control={form.control} name="isMonetized" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm col-span-1">
                      <div className="space-y-0.5">
                        <FormLabel>Is Monetized?</FormLabel>
                        <FormDescription className="text-xs">Does this content generate ad revenue?</FormDescription>
                      </div>
                      <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                  )}
                />
                {watchIsMonetized && (
                    <FormField name="adRevenue" control={form.control} render={({ field }) => (
                        <FormItem>
                        <FormLabel>Ad Revenue ($)</FormLabel>
                        <FormControl><Input type="number" step="0.01" placeholder="e.g., 55.25" {...field} onChange={event => field.onChange(event.target.value === '' ? 0 : +event.target.value)} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )} />
                )}
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleDialogClose}>Cancel</Button>
                <Button type="submit">{editingContent ? 'Save Changes' : 'Add Content'}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
