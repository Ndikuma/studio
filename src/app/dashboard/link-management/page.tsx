'use client';

import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link2, PlusCircle, MoreHorizontal, Edit, Trash2, BarChart2, Copy } from 'lucide-react';

const mockLinks = [
  { id: 'link001', originalUrl: 'https://example.com/product-a?ref=user123', shortLink: 'https://ern.hb/prodA', clicks: 1250, campaign: 'Summer Sale', createdDate: '2024-06-01', program: 'Amazon Associates' },
  { id: 'link002', originalUrl: 'https://another-store.com/item-b-long-url-here', shortLink: 'https://ern.hb/itemB', clicks: 870, campaign: 'New Launch', createdDate: '2024-06-15', program: 'ShareASale' },
  { id: 'link003', originalUrl: 'https://service-provider.net/signup?aff_id=xyz', shortLink: 'https://ern.hb/servX', clicks: 340, campaign: 'Q3 Promotion', createdDate: '2024-07-01', program: 'CJ Affiliate' },
  { id: 'link004', originalUrl: 'https://marketplace.com/unique-offer-page', shortLink: 'https://ern.hb/offerU', clicks: 0, campaign: 'Holiday Special', createdDate: '2024-07-20', program: 'ClickBank' },
];

export default function LinkManagementPage() {
  // A simple copy to clipboard function. In a real app, consider a library or more robust error handling.
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Consider adding a toast notification here for user feedback
      alert('Link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
      alert('Failed to copy link.');
    });
  };

  return (
    <>
      <PageHeader
        title="Link Management"
        description="Create, manage, and track your affiliate links efficiently."
        icon={Link2}
        action={
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Link
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
                <TableHead className="w-[250px]">Short Link</TableHead>
                <TableHead>Original URL</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead className="text-center">Clicks</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLinks.map((link) => (
                <TableRow key={link.id}>
                  <TableCell className="font-medium">
                    <a href={link.shortLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {link.shortLink}
                    </a>
                  </TableCell>
                  <TableCell className="truncate max-w-xs text-muted-foreground">{link.originalUrl}</TableCell>
                  <TableCell>{link.program}</TableCell>
                  <TableCell>{link.campaign || '-'}</TableCell>
                  <TableCell className="text-center">{link.clicks}</TableCell>
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
                        <DropdownMenuItem>
                          <BarChart2 className="mr-2 h-4 w-4" />
                          View Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Link
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive dark:text-red-400 dark:focus:text-red-300">
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
           {mockLinks.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              <p>No links created yet.</p>
              <Button variant="link" className="mt-2">
                <PlusCircle className="mr-2 h-4 w-4" /> Create your first link
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
