'use client';

import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Network, PlusCircle, MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';

const mockPrograms = [
  { id: 'prog001', name: 'Amazon Associates', platform: 'Amazon', commissionRate: 'Up to 10%', status: 'Active', joinDate: '2023-01-15' },
  { id: 'prog002', name: 'ShareASale Network', platform: 'ShareASale', commissionRate: 'Varies', status: 'Active', joinDate: '2023-03-22' },
  { id: 'prog003', name: 'ClickBank Products', platform: 'ClickBank', commissionRate: 'Up to 75%', status: 'Inactive', joinDate: '2023-05-10' },
  { id: 'prog004', name: 'CJ Affiliate', platform: 'Commission Junction', commissionRate: 'Varies', status: 'Active', joinDate: '2023-07-01' },
  { id: 'prog005', name: 'Shopify Affiliate Program', platform: 'Shopify', commissionRate: '20% per sale', status: 'Pending', joinDate: '2024-02-20' },
];

export default function AffiliateProgramsPage() {
  return (
    <>
      <PageHeader
        title="Affiliate Programs"
        description="Manage your affiliate program memberships and track their performance."
        icon={Network}
        action={
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Program
          </Button>
        }
      />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Your Affiliate Programs</CardTitle>
          <CardDescription>A list of affiliate programs you have joined or are tracking.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Program Name</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Commission Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPrograms.map((program) => (
                <TableRow key={program.id}>
                  <TableCell className="font-medium">{program.name}</TableCell>
                  <TableCell>{program.platform}</TableCell>
                  <TableCell>{program.commissionRate}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      program.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                      program.status === 'Inactive' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' :
                      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' // Pending
                    }`}>
                      {program.status}
                    </span>
                  </TableCell>
                  <TableCell>{program.joinDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Program Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Program
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive dark:text-red-400 dark:focus:text-red-300">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove Program
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {mockPrograms.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              <p>No affiliate programs added yet.</p>
              <Button variant="link" className="mt-2">
                <PlusCircle className="mr-2 h-4 w-4" /> Add your first program
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
