
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Megaphone, PlusCircle, MoreHorizontal, Edit, Trash2, Eye, CalendarIcon, DollarSign } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Mock data (in a real app, this would come from an API)
const mockPromoters = [{ id: 'user1', name: 'Alice Promoter' }, { id: 'user2', name: 'Bob Marketer' }];
const mockPromotionalItems = [
  { id: 'item001', name: 'ProGamer Mouse X2000' }, 
  { id: 'item002', name: 'SmartHome Hub Pro' },
];
const mockBrands = [
  { id: 'brand001', name: 'GamerFuel Inc.' },
  { id: 'brand002', name: 'ElectroGadget Co.' },
];

const campaignSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Campaign title must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  promoterId: z.string({ required_error: "Promoter is required."}),
  promotionalItemId: z.string().optional(),
  brandId: z.string().optional(),
  startDate: z.date({ required_error: "Start date is required."}),
  endDate: z.date({ required_error: "End date is required."}),
  commissionRate: z.coerce.number().min(0).max(100).optional(),
}).refine(data => !data.promotionalItemId || !data.brandId, {
  message: "Cannot select both Promotional Item and Brand. Choose one or neither.",
  path: ["promotionalItemId"], // Or brandId, path doesn't matter much here
}).refine(data => data.endDate >= data.startDate, {
  message: "End date must be after or the same as start date.",
  path: ["endDate"],
});

type CampaignFormValues = z.infer<typeof campaignSchema>;

const mockCampaignsData: (CampaignFormValues & { promoterName: string, promotionalItemName?: string, brandName?: string, clicks: number, conversions: number })[] = [
  { id: 'camp001', title: 'Summer Gaming Fest', description: 'Promote new gaming gear for summer.', promoterId: 'user1', promoterName: 'Alice Promoter', promotionalItemId: 'item001', promotionalItemName: 'ProGamer Mouse X2000', startDate: new Date('2024-06-01'), endDate: new Date('2024-08-31'), commissionRate: 10.00, clicks: 1500, conversions: 75 },
  { id: 'camp002', title: 'Smart Living Q3 Push', description: 'Drive sales for smart home devices.', promoterId: 'user2', promoterName: 'Bob Marketer', brandId: 'brand002', brandName: 'ElectroGadget Co.', startDate: new Date('2024-07-01'), endDate: new Date('2024-09-30'), commissionRate: 8.50, clicks: 2200, conversions: 110 },
];

export default function CampaignsPage() {
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState<(CampaignFormValues & { promoterName: string, promotionalItemName?: string, brandName?: string, clicks: number, conversions: number })[]>(mockCampaignsData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<CampaignFormValues | null>(null);

  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignSchema),
  });

  const handleDialogOpen = (campaign?: CampaignFormValues) => {
    if (campaign) {
      setEditingCampaign(campaign);
      form.reset({
        ...campaign,
        commissionRate: campaign.commissionRate !== undefined ? Number(campaign.commissionRate) : undefined,
        startDate: new Date(campaign.startDate),
        endDate: new Date(campaign.endDate),
      });
    } else {
      setEditingCampaign(null);
      form.reset({
        title: '', description: '', promoterId: undefined, promotionalItemId: undefined, brandId: undefined,
        startDate: new Date(), endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default end date 7 days from now
        commissionRate: undefined,
      });
    }
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingCampaign(null);
    form.reset();
  };

  const onSubmit: SubmitHandler<CampaignFormValues> = (data) => {
    const promoterName = mockPromoters.find(p => p.id === data.promoterId)?.name || 'N/A';
    const promotionalItemName = mockPromotionalItems.find(item => item.id === data.promotionalItemId)?.name;
    const brandName = mockBrands.find(b => b.id === data.brandId)?.name;
    
    const submittedData = { ...data, promoterName, promotionalItemName, brandName, clicks: 0, conversions: 0 };

    if (editingCampaign) {
      setCampaigns(campaigns.map(c => c.id === editingCampaign.id ? { ...submittedData, id: editingCampaign.id, clicks: c.clicks, conversions: c.conversions } : c));
      toast({ title: "Campaign Updated", description: `Campaign "${data.title}" has been updated.` });
    } else {
      setCampaigns([...campaigns, { ...submittedData, id: `camp${Date.now()}` }]);
      toast({ title: "Campaign Added", description: `Campaign "${data.title}" has been added.` });
    }
    handleDialogClose();
  };
  
  const handleDelete = (campaignId: string) => {
    setCampaigns(campaigns.filter(c => c.id !== campaignId));
    toast({ title: "Campaign Deleted", description: "The campaign has been deleted.", variant: "destructive" });
  };

  return (
    <>
      <PageHeader
        title="Manage Campaigns"
        description="Create, monitor, and manage your promotional campaigns."
        icon={Megaphone}
        action={
          <Button onClick={() => handleDialogOpen()}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Campaign
          </Button>
        }
      />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
          <CardDescription>A list of your ongoing and past promotional campaigns.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Promoter</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Commission</TableHead>
                <TableHead className="text-center">Clicks</TableHead>
                <TableHead className="text-center">Conversions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.title}</TableCell>
                  <TableCell>{campaign.promoterName}</TableCell>
                  <TableCell>{campaign.promotionalItemName || campaign.brandName || 'General'}</TableCell>
                  <TableCell>{format(new Date(campaign.startDate), "MMM d, yyyy")} - {format(new Date(campaign.endDate), "MMM d, yyyy")}</TableCell>
                  <TableCell>{campaign.commissionRate ? `${campaign.commissionRate.toFixed(2)}%` : 'N/A'}</TableCell>
                  <TableCell className="text-center">{campaign.clicks}</TableCell>
                  <TableCell className="text-center">{campaign.conversions}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => alert(`Viewing ${campaign.title}`)}>
                          <Eye className="mr-2 h-4 w-4" /> View Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDialogOpen(campaign)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(campaign.id!)} className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {campaigns.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              <p>No campaigns created yet.</p>
              <Button variant="link" className="mt-2" onClick={() => handleDialogOpen()}>
                <PlusCircle className="mr-2 h-4 w-4" /> Create your first campaign
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingCampaign ? 'Edit Campaign' : 'Create New Campaign'}</DialogTitle>
            <DialogDescription>
              {editingCampaign ? 'Update details for this campaign.' : 'Provide information for the new campaign.'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
              <FormField name="title" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Campaign Title</FormLabel><FormControl><Input placeholder="e.g., Q4 Holiday Blast" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="description" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Detailed description of the campaign goals and activities..." {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              
              <FormField name="promoterId" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Promoter (User)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select promoter" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {mockPromoters.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <FormField name="promotionalItemId" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Promotional Item (Optional)</FormLabel>
                    <Select onValueChange={(val) => {field.onChange(val); if(val) form.setValue('brandId', undefined);}} value={field.value || ""} disabled={!!form.watch('brandId')}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select item" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {mockPromotionalItems.map(item => <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="brandId" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand (Optional)</FormLabel>
                    <Select onValueChange={(val) => {field.onChange(val); if(val) form.setValue('promotionalItemId', undefined);}} value={field.value || ""} disabled={!!form.watch('promotionalItemId')}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select brand" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {mockBrands.map(brand => <SelectItem key={brand.id} value={brand.id}>{brand.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="startDate" render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField control={form.control} name="endDate" render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < (form.getValues("startDate") || new Date(0)) } initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField name="commissionRate" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Commission Rate (%) (Optional)</FormLabel>
                  <FormControl><Input type="number" step="0.01" placeholder="e.g., 5.0" {...field} onChange={event => field.onChange(event.target.value === '' ? undefined : +event.target.value)} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleDialogClose}>Cancel</Button>
                <Button type="submit">{editingCampaign ? 'Save Changes' : 'Create Campaign'}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
