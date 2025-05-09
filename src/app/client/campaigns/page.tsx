
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Megaphone, Eye, TrendingUp, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

// Mock data representing campaigns for the logged-in user
const mockUserCampaigns = [
  { 
    id: 'camp001', 
    title: 'My Summer Gaming Promo', 
    promotionalItemName: 'ProGamer Mouse X2000', 
    brandName: 'GamerFuel Inc.',
    startDate: new Date('2024-06-01'), 
    endDate: new Date('2024-08-31'), 
    status: 'Active', 
    clicks: 1205, 
    conversions: 62,
    earnings: 310.50,
  },
  { 
    id: 'camp002', 
    title: 'Q3 Smart Home Drive', 
    promotionalItemName: 'SmartHome Hub Pro',
    brandName: 'ElectroGadget Co.',
    startDate: new Date('2024-07-15'), 
    endDate: new Date('2024-09-30'), 
    status: 'Active', 
    clicks: 850, 
    conversions: 40,
    earnings: 200.00,
  },
  { 
    id: 'camp003', 
    title: 'Spring Fashion Spotlight', 
    brandName: 'Chic Trends Boutique',
    startDate: new Date('2024-03-01'), 
    endDate: new Date('2024-05-31'), 
    status: 'Ended', 
    clicks: 2500, 
    conversions: 150,
    earnings: 750.00,
  },
];

export default function ClientCampaignsPage() {
  const [campaigns, setCampaigns] = useState(mockUserCampaigns);

  const getStatusVariant = (status: string) => {
    if (status === 'Active') return 'default';
    if (status === 'Ended') return 'secondary';
    if (status === 'Upcoming') return 'outline';
    return 'destructive';
  };


  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          My Promotional Campaigns
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Track the performance and details of your promotional campaigns.
        </p>
      </section>

      {campaigns.length > 0 ? (
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Your Campaigns</CardTitle>
            <CardDescription>Overview of all campaigns you are running or have run.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign Title</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Clicks</TableHead>
                  <TableHead className="text-center">Conversions</TableHead>
                  <TableHead className="text-right">Earnings</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">{campaign.title}</TableCell>
                    <TableCell>{campaign.promotionalItemName || campaign.brandName || 'General'}</TableCell>
                    <TableCell>{format(campaign.startDate, "MMM d, yy")} - {format(campaign.endDate, "MMM d, yy")}</TableCell>
                    <TableCell><Badge variant={getStatusVariant(campaign.status)}>{campaign.status}</Badge></TableCell>
                    <TableCell className="text-center">{campaign.clicks}</TableCell>
                    <TableCell className="text-center">{campaign.conversions}</TableCell>
                    <TableCell className="text-right font-semibold">${campaign.earnings.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="mr-1 h-4 w-4" /> View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-lg">
          <CardContent className="py-20 text-center text-muted-foreground">
            <AlertCircle className="mx-auto h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">No Campaigns Yet</h3>
            <p>You haven't created or joined any promotional campaigns.</p>
            <Button className="mt-4" asChild>
              {/* Link to where user can create/join campaigns, e.g., browse promotions or a dedicated "start campaign" page */}
              <a href="/client/promotions">Browse Promotions to Start a Campaign</a>
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="shadow-lg bg-secondary/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-accent"/>Campaign Performance Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p><strong>Monitor Regularly:</strong> Keep an eye on your clicks and conversions to understand what's working.</p>
          <p><strong>Target Wisely:</strong> Ensure your campaign target (item or brand) aligns with your audience.</p>
          <p><strong>Compelling Content:</strong> Use high-quality images and persuasive copy for your promotions.</p>
          <p><strong>Test and Iterate:</strong> Don't be afraid to try different approaches and learn from your results.</p>
        </CardContent>
      </Card>
    </div>
  );
}
