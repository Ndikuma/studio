
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link2, Copy, BarChart2, AlertCircle, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

// Mock data representing affiliate links for the logged-in user
const mockUserAffiliateLinks = [
  { 
    id: 'link001', 
    promotionalItemName: 'ProGamer Mouse X2000', 
    uniqueCode: 'a1b2c3d4', 
    shortLink: 'https://promo.st/a1b2c3d4', 
    originalUrl: 'https://example.com/progamerx2000?ref=a1b2c3d4',
    clicks: 1250, 
    conversions: 50,
    createdDate: new Date('2024-06-01'),
  },
  { 
    id: 'link002', 
    promotionalItemName: 'SmartHome Hub Pro', 
    uniqueCode: 'e5f6g7h8', 
    shortLink: 'https://promo.st/e5f6g7h8', 
    originalUrl: 'https://example.com/smarthubpro?ref=e5f6g7h8',
    clicks: 870, 
    conversions: 30,
    createdDate: new Date('2024-06-15'),
  },
  { 
    id: 'link003', 
    promotionalItemName: 'Summer Fashion Line Campaign', 
    uniqueCode: 'i9j0k1l2', 
    shortLink: 'https://promo.st/i9j0k1l2', 
    originalUrl: 'https://example.com/summerfashion?ref=i9j0k1l2',
    clicks: 3020, 
    conversions: 120,
    createdDate: new Date('2024-07-01'),
  },
];

export default function ClientLinksPage() {
  const { toast } = useToast();
  const [links, setLinks] = useState(mockUserAffiliateLinks);

  const copyToClipboard = (text: string, itemName: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({ title: 'Link Copied!', description: `Affiliate link for ${itemName} copied to clipboard.` });
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast({ title: 'Error Copying', description: 'Could not copy link to clipboard.', variant: 'destructive' });
    });
  };

  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          My Affiliate Links
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Manage and track the performance of your unique promotional links.
        </p>
      </section>

      <div className="flex justify-end mb-4">
        <Button asChild>
          <a href="/client/promotions"> {/* Link to page where links can be generated */}
            <PlusCircle className="mr-2 h-4 w-4" /> Generate New Link
          </a>
        </Button>
      </div>

      {links.length > 0 ? (
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Your Generated Links</CardTitle>
            <CardDescription>Overview of all your active affiliate links.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Promotional Item</TableHead>
                  <TableHead>Short Link</TableHead>
                  <TableHead className="text-center">Clicks</TableHead>
                  <TableHead className="text-center">Conversions</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {links.map((link) => (
                  <TableRow key={link.id}>
                    <TableCell className="font-medium">{link.promotionalItemName}</TableCell>
                    <TableCell>
                      <a href={link.shortLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {link.shortLink}
                      </a>
                    </TableCell>
                    <TableCell className="text-center">{link.clicks}</TableCell>
                    <TableCell className="text-center">{link.conversions}</TableCell>
                    <TableCell>{format(link.createdDate, "MMM d, yyyy")}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(link.shortLink, link.promotionalItemName)}>
                        <Copy className="mr-1 h-3 w-3" /> Copy
                      </Button>
                      <Button variant="ghost" size="sm">
                        <BarChart2 className="mr-1 h-3 w-3" /> Analytics
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
            <h3 className="text-xl font-semibold mb-2">No Affiliate Links Yet</h3>
            <p>You haven't generated any affiliate links. Start by finding a promotion.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
