
'use client';

import { PageHeader } from '@/components/shared/page-header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, DollarSign, BarChart3, Activity, Users, FileText, Megaphone, LinkIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip as ShadcnChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const kpiData = [
  { title: 'Total Earnings', value: '$15,320', change: '+10.5%', icon: DollarSign, changeType: 'positive' as const },
  { title: 'Affiliate Earnings', value: '$8,750', change: '+12.2%', icon: LinkIcon, changeType: 'positive' as const },
  { title: 'Ad Revenue', value: '$4,500', change: '+5.1%', icon: FileText, changeType: 'positive' as const },
  { title: 'Campaign Payments', value: '$2,070', change: '+15.0%', icon: Megaphone, changeType: 'positive' as const },
];

const earningsChartData = [
  { name: 'Jan', affiliate: 1200, adRevenue: 600, campaign: 300, total: 2100 },
  { name: 'Feb', affiliate: 1000, adRevenue: 500, campaign: 200, total: 1700 },
  { name: 'Mar', affiliate: 2500, adRevenue: 1200, campaign: 500, total: 4200 },
  { name: 'Apr', affiliate: 1800, adRevenue: 900, campaign: 400, total: 3100 },
  { name: 'May', affiliate: 2200, adRevenue: 1100, campaign: 450, total: 3750 },
  { name: 'Jun', affiliate: 1900, adRevenue: 950, campaign: 350, total: 3200 },
  { name: 'Jul', affiliate: 2800, adRevenue: 1300, campaign: 600, total: 4700 },
];

const chartConfig: ChartConfig = {
  total: { label: "Total ($)", color: "hsl(var(--primary))" },
  affiliate: { label: "Affiliate ($)", color: "hsl(var(--chart-1))" },
  adRevenue: { label: "Ad Revenue ($)", color: "hsl(var(--chart-2))" },
  campaign: { label: "Campaign ($)", color: "hsl(var(--chart-3))" },
};

const transactionsData = [
  { id: 'ERN001', date: '2024-07-15', source: 'AFFILIATE', amount: '$120.00', relatedItem: 'ProGamer Mouse X2000', status: 'Paid' },
  { id: 'ERN002', date: '2024-07-14', source: 'AD_REVENUE', amount: '$55.20', relatedItem: 'My Review Blog Post', status: 'Credited' },
  { id: 'ERN003', date: '2024-07-13', source: 'CAMPAIGN', amount: '$500.00', relatedItem: 'Summer Gaming Fest', status: 'Paid' },
  { id: 'ERN004', date: '2024-07-12', source: 'AFFILIATE', amount: '$85.50', relatedItem: 'SmartHome Hub Pro', status: 'Pending Payout' },
  { id: 'ERN005', date: '2024-07-11', source: 'AD_REVENUE', amount: '$30.10', relatedItem: 'Unboxing Video', status: 'Credited' },
];


export default function EarningsTrackerPage() {
  return (
    <>
      <PageHeader
        title="Earnings Tracker - PromoMarket"
        description="Monitor your financial performance from all promotional activities."
        icon={TrendingUp}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {kpiData.map((kpi) => (
          <Card key={kpi.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
              <kpi.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{kpi.value}</div>
              <p className={`text-xs ${kpi.changeType === 'positive' ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                {kpi.change}
                <span className="text-muted-foreground ml-1">from last month</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-lg mb-8">
        <CardHeader>
          <CardTitle>Monthly Earnings Breakdown</CardTitle>
          <CardDescription>Earnings by source over the last 7 months.</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] pr-0">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={earningsChartData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickFormatter={(value) => `$${value}`} tickLine={false} axisLine={false} tickMargin={8} />
                <ShadcnChartTooltip 
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />} 
                />
                <Legend />
                <Bar dataKey="affiliate" stackId="a" fill="var(--color-affiliate)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="adRevenue" stackId="a" fill="var(--color-adRevenue)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="campaign" stackId="a" fill="var(--color-campaign)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Recent Earnings Log</CardTitle>
          <CardDescription>A log of your latest earnings transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Related Item/Campaign</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionsData.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.source.replace('_', ' ')}</TableCell>
                  <TableCell>{transaction.relatedItem}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      transaction.status === 'Paid' ? 'bg-green-100 text-green-700' :
                      transaction.status === 'Credited' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700' // Pending Payout
                    }`}>
                      {transaction.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

