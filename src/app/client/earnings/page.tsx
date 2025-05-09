
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, TrendingUp, Download, AlertCircle, Link as LinkIcon, FileText as AdIcon, Megaphone as CampaignIcon } from 'lucide-react';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip as ShadcnChartTooltip, ChartTooltipContent } from "@/components/ui/chart";


// Mock data representing earnings for the logged-in user
const mockUserEarnings = [
  { 
    id: 'earn001', 
    source: 'AFFILIATE', 
    amount: 75.50, 
    relatedItemName: 'ProGamer Mouse X2000',
    createdDate: new Date('2024-07-15'),
    status: 'Paid Out'
  },
  { 
    id: 'earn002', 
    source: 'AD_REVENUE', 
    amount: 120.25, 
    relatedItemName: 'My Epic Review Blog',
    createdDate: new Date('2024-07-10'),
    status: 'Credited'
  },
  { 
    id: 'earn003', 
    source: 'CAMPAIGN', 
    amount: 200.00, 
    relatedItemName: 'Summer Gaming Fest Participation',
    createdDate: new Date('2024-07-01'),
    status: 'Paid Out'
  },
  { 
    id: 'earn004', 
    source: 'AFFILIATE', 
    amount: 40.00, 
    relatedItemName: 'SmartHome Hub Pro',
    createdDate: new Date('2024-06-25'),
    status: 'Pending Payout'
  },
   { 
    id: 'earn005', 
    source: 'AFFILIATE', 
    amount: 33.80, 
    relatedItemName: 'ProGamer Mouse X2000',
    createdDate: new Date('2024-06-20'),
    status: 'Paid Out'
  },
];

const monthlySummaryData = [
  { month: 'Feb 24', affiliate: 300, adRevenue: 150, campaign: 50, total: 500 },
  { month: 'Mar 24', affiliate: 450, adRevenue: 200, campaign: 100, total: 750 },
  { month: 'Apr 24', affiliate: 400, adRevenue: 180, campaign: 70, total: 650 },
  { month: 'May 24', affiliate: 600, adRevenue: 250, campaign: 150, total: 1000 },
  { month: 'Jun 24', affiliate: 550, adRevenue: 220, campaign: 120, total: 890 },
  { month: 'Jul 24', affiliate: 700, adRevenue: 300, campaign: 200, total: 1200 },
];

const chartConfig: ChartConfig = {
  total: { label: "Total ($)", color: "hsl(var(--primary))" },
  affiliate: { label: "Affiliate", color: "hsl(var(--chart-1))" },
  adRevenue: { label: "Ad Revenue", color: "hsl(var(--chart-2))" },
  campaign: { label: "Campaign", color: "hsl(var(--chart-3))" },
};


export default function ClientEarningsPage() {
  const [earnings, setEarnings] = useState(mockUserEarnings);
  const totalAvailable = earnings.filter(e => e.status === 'Credited' || e.status === 'Pending Payout').reduce((sum, e) => sum + e.amount, 0);
  const totalPaidOut = earnings.filter(e => e.status === 'Paid Out').reduce((sum, e) => sum + e.amount, 0);

  const getSourceIcon = (source: string) => {
    if (source === 'AFFILIATE') return <LinkIcon className="h-4 w-4 text-blue-500" />;
    if (source === 'AD_REVENUE') return <AdIcon className="h-4 w-4 text-green-500" />;
    if (source === 'CAMPAIGN') return <CampaignIcon className="h-4 w-4 text-purple-500" />;
    return <DollarSign className="h-4 w-4 text-muted-foreground" />;
  };


  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          My Earnings
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Track your income from affiliate commissions, ad revenue, and campaign payments.
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Earnings (All Time)</CardTitle>
            <DollarSign className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">${(totalAvailable + totalPaidOut).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Combined from all sources.</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Available for Payout</CardTitle>
            <TrendingUp className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">${totalAvailable.toFixed(2)}</div>
             <p className="text-xs text-muted-foreground">Across all pending sources.</p>
          </CardContent>
           <CardFooter>
            <Button className="w-full" size="sm" disabled={totalAvailable === 0}>Request Payout</Button>
          </CardFooter>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Paid Out</CardTitle>
            <Download className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">${totalPaidOut.toFixed(2)}</div>
             <p className="text-xs text-muted-foreground">Successfully withdrawn.</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Monthly Earnings Summary</CardTitle>
          <CardDescription>Breakdown of your earnings by source over the recent months.</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px] pr-0">
           <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySummaryData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickFormatter={(value) => `$${value}`} tickLine={false} axisLine={false} tickMargin={8}/>
                <ShadcnChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="affiliate" stackId="a" fill="var(--color-affiliate)" radius={[0, 0, 0, 0]} name="Affiliate"/>
                <Bar dataKey="adRevenue" stackId="a" fill="var(--color-adRevenue)" radius={[0, 0, 0, 0]} name="Ad Revenue"/>
                <Bar dataKey="campaign" stackId="a" fill="var(--color-campaign)" radius={[4,4,0,0]} name="Campaign"/>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>


      {earnings.length > 0 ? (
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Earnings History</CardTitle>
            <CardDescription>Detailed log of your earnings transactions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {earnings.map((earning) => (
                  <TableRow key={earning.id}>
                    <TableCell>{format(earning.createdDate, "MMM d, yyyy")}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      {getSourceIcon(earning.source)}
                      {earning.source.replace('_', ' ')}
                    </TableCell>
                    <TableCell>{earning.relatedItemName}</TableCell>
                    <TableCell className="text-right font-semibold">${earning.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        earning.status === 'Paid Out' ? 'bg-green-100 text-green-700' : 
                        earning.status === 'Credited' ? 'bg-blue-100 text-blue-700' : 
                        'bg-yellow-100 text-yellow-700'
                        }`}>{earning.status}
                      </span>
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
            <h3 className="text-xl font-semibold mb-2">No Earnings Yet</h3>
            <p>Start promoting items or monetizing content to see your earnings here.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
