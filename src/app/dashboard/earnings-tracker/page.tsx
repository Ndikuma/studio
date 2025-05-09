'use client';

import { PageHeader } from '@/components/shared/page-header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, DollarSign, BarChart3, Activity, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip as ShadcnChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const kpiData = [
  { title: 'Total Revenue', value: '$12,875', change: '+12.5%', icon: DollarSign, changeType: 'positive' as const },
  { title: 'Total Conversions', value: '862', change: '+8.2%', icon: Activity, changeType: 'positive' as const },
  { title: 'Average Click-Through Rate', value: '2.3%', change: '-0.5%', icon: BarChart3, changeType: 'negative' as const },
  { title: 'Active Affiliates', value: '128', change: '+5', icon: Users, changeType: 'positive' as const },
];

const earningsChartData = [
  { name: 'Jan', earnings: 2400, clicks: 10000 },
  { name: 'Feb', earnings: 1398, clicks: 8000 },
  { name: 'Mar', earnings: 9800, clicks: 12000 },
  { name: 'Apr', earnings: 3908, clicks: 9500 },
  { name: 'May', earnings: 4800, clicks: 11000 },
  { name: 'Jun', earnings: 3800, clicks: 10500 },
  { name: 'Jul', earnings: 4300, clicks: 13000 },
];

const chartConfig: ChartConfig = {
  earnings: {
    label: "Earnings ($)",
    color: "hsl(var(--primary))",
  },
  clicks: {
    label: "Clicks",
    color: "hsl(var(--accent))",
  },
};

const transactionsData = [
  { id: 'TRX001', date: '2024-07-15', campaign: 'Summer Sale Ad', amount: '$250.00', status: 'Completed' },
  { id: 'TRX002', date: '2024-07-14', campaign: 'New Product Launch', amount: '$120.50', status: 'Completed' },
  { id: 'TRX003', date: '2024-07-13', campaign: 'Influencer Collab', amount: '$85.75', status: 'Pending' },
  { id: 'TRX004', date: '2024-07-12', campaign: 'Email Marketing Q3', amount: '$310.00', status: 'Completed' },
  { id: 'TRX005', date: '2024-07-11', campaign: 'Social Media Boost', amount: '$55.20', status: 'Failed' },
];


export default function EarningsTrackerPage() {
  return (
    <>
      <PageHeader
        title="Earnings Tracker"
        description="Monitor your financial performance, track clicks, conversions, and earnings."
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
            <CardDescription>Earnings and Clicks trend over the last 7 months.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] pr-0">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={earningsChartData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent))" tickLine={false} axisLine={false} tickMargin={8} />
                  <ShadcnChartTooltip 
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />} 
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="earnings" fill="var(--color-earnings)" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="clicks" fill="var(--color-clicks)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Conversion Funnel (Placeholder)</CardTitle>
            <CardDescription>Visualize user journey from click to conversion.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] flex items-center justify-center">
            <p className="text-muted-foreground">Conversion Funnel Chart Coming Soon</p>
            {/* Placeholder for a funnel chart or similar visualization */}
          </CardContent>
        </Card>
      </div>
      

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>A log of your latest earnings and payouts.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Campaign/Source</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionsData.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.campaign}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      transaction.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
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
