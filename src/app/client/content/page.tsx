
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileText, Eye, Edit, Trash2, DollarSign, AlertCircle, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';

// Mock data representing content created by the logged-in user
const mockUserContent = [
  { 
    id: 'cont001', 
    title: 'My Epic Review of ProGamer Mouse X2000', 
    contentType: 'BLOG', 
    promotionalItemName: 'ProGamer Mouse X2000',
    campaignTitle: null,
    isMonetized: true, 
    adRevenue: 150.75,
    createdDate: new Date('2024-07-10'),
    status: 'Published'
  },
  { 
    id: 'cont002', 
    title: 'Unboxing SmartHome Hub Pro - You NEED This!', 
    contentType: 'VIDEO', 
    promotionalItemName: 'SmartHome Hub Pro',
    campaignTitle: null,
    isMonetized: true, 
    adRevenue: 320.50,
    createdDate: new Date('2024-07-05'),
    status: 'Published'
  },
  { 
    id: 'cont003', 
    title: 'Quick Post: Summer Gaming Fest is ON!', 
    contentType: 'SOCIAL_POST',
    promotionalItemName: null,
    campaignTitle: 'Summer Gaming Fest', 
    isMonetized: false, 
    adRevenue: 0,
    createdDate: new Date('2024-06-20'),
    status: 'Published'
  },
   { 
    id: 'cont004', 
    title: 'Draft: Top 5 Software for Productivity', 
    contentType: 'TUTORIAL',
    promotionalItemName: null,
    campaignTitle: null, 
    isMonetized: false, 
    adRevenue: 0,
    createdDate: new Date('2024-07-18'),
    status: 'Draft'
  },
];

export default function ClientContentPage() {
  const [content, setContent] = useState(mockUserContent);

  const getStatusVariant = (status: string) => {
    if (status === 'Published') return 'default';
    if (status === 'Draft') return 'outline';
    return 'secondary';
  };

  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          My Promotional Content
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Manage your created content pieces like blog posts, videos, and social media updates.
        </p>
      </section>

       <div className="flex justify-end mb-4">
        <Button> {/* Link to a content creation page if it exists, or dashboard's AI generator */}
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Content
        </Button>
      </div>

      {content.length > 0 ? (
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Your Content Library</CardTitle>
            <CardDescription>All content pieces you've created for promotions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Associated With</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ad Revenue</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {content.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.contentType.replace('_', ' ')}</TableCell>
                    <TableCell>{item.promotionalItemName || item.campaignTitle || 'N/A'}</TableCell>
                    <TableCell>{format(item.createdDate, "MMM d, yyyy")}</TableCell>
                    <TableCell><Badge variant={getStatusVariant(item.status)}>{item.status}</Badge></TableCell>
                    <TableCell className="text-right font-semibold">
                      {item.isMonetized ? `$${item.adRevenue.toFixed(2)}` : '-'}
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="icon" title="View">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Edit">
                        <Edit className="h-4 w-4" />
                      </Button>
                       <Button variant="ghost" size="icon" title="Delete" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
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
            <h3 className="text-xl font-semibold mb-2">No Content Created Yet</h3>
            <p>You haven't created any promotional content pieces.</p>
            {/* <Button className="mt-4">Create Your First Content Piece</Button> */}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
