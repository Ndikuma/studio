
'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lightbulb, TrendingUp, PenLine, LayoutDashboard, DollarSign, BarChart3, Users, Building, ShoppingCart, Megaphone, FileText, Link2, BookOpen } from 'lucide-react';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"


const overviewCards = [
  {
    title: 'Manage Brands',
    description: 'Oversee brands you work with or represent in your promotions.',
    href: '/dashboard/brands',
    icon: Building,
    cta: 'View Brands',
  },
  {
    title: 'Promotional Items',
    description: 'Manage products, services, or digital items for promotion.',
    href: '/dashboard/promotional-items',
    icon: ShoppingCart,
    cta: 'Manage Items',
  },
  {
    title: 'Campaigns',
    description: 'Create and track your marketing campaigns for specific promotions.',
    href: '/dashboard/campaigns',
    icon: Megaphone,
    cta: 'View Campaigns',
  },
  {
    title: 'Affiliate Links',
    description: 'Generate and manage your unique affiliate links.',
    href: '/dashboard/affiliate-links',
    icon: Link2,
    cta: 'Manage Links',
  },
   {
    title: 'Content Management',
    description: 'Organize and review promotional content like blogs and videos.',
    href: '/dashboard/content-management',
    icon: FileText,
    cta: 'Manage Content',
  },
  {
    title: 'AI Promo Recommender',
    description: 'Get AI suggestions for top promotional items and strategies.',
    href: '/dashboard/product-recommender',
    icon: Lightbulb,
    cta: 'Find Items',
  },
  {
    title: 'Performance Tracker',
    description: 'Monitor your clicks, conversions, and earnings in real-time.',
    href: '/dashboard/earnings-tracker',
    icon: TrendingUp,
    cta: 'View Performance',
  },
  {
    title: 'AI Content Generator',
    description: 'Create engaging marketing content for your promotions.',
    href: '/dashboard/marketing-content-generator',
    icon: PenLine,
    cta: 'Generate Content',
  },
  {
    title: 'Resource Library',
    description: 'Access guides and tutorials to boost your promotion skills.',
    href: '/dashboard/resources',
    icon: BookOpen,
    cta: 'Explore Resources',
  },
];

const kpiData = [
  { metric: "Total Revenue", value: "$2,750", change: "+12%", icon: DollarSign, period: "this month" },
  { metric: "Active Campaigns", value: "8", change: "+1", icon: Megaphone, period: "this month" },
  { metric: "Total Clicks", value: "15,300", change: "+8%", icon: BarChart3, period: "last 30 days" },
  { metric: "New Affiliates Joined", value: "5", change: "+2", icon: Users, period: "this week" },
];

const chartData = [
  { month: "Jan", earnings: 950 },
  { month: "Feb", earnings: 1120 },
  { month: "Mar", earnings: 880 },
  { month: "Apr", earnings: 1250 },
  { month: "May", earnings: 1440 },
  { month: "Jun", earnings: 1600 },
];

const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Welcome to PromoMarket!"
        description="Your central hub for managing and growing your digital promotions."
        icon={LayoutDashboard}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {kpiData.map((kpi) => (
          <Card key={kpi.metric} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.metric}</CardTitle>
              <kpi.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{kpi.value}</div>
              <p className="text-xs text-green-500 flex items-center">
                {kpi.change}
                <span className="text-muted-foreground ml-1">vs {kpi.period}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card className="shadow-lg md:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions for Your Promotions</CardTitle>
            <CardDescription>Jump right into key features.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {overviewCards.map((card) => (
              <Link href={card.href} key={card.title} className="block group">
                <Card className="hover:border-primary transition-colors duration-200 p-4 shadow-sm hover:shadow-md h-full">
                  <div className="flex flex-col justify-between h-full">
                    <div className="flex items-start gap-3">
                      <card.icon className="h-8 w-8 text-primary mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary">{card.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{card.description}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-primary font-medium">
                      {card.cta}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-lg col-span-2 md:col-span-2"> 
          <CardHeader>
            <CardTitle>Monthly Earnings Overview</CardTitle>
            <CardDescription>Track your earnings progress over the past few months.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] pr-0">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `$${value}`} />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="earnings" fill="var(--color-earnings)" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

