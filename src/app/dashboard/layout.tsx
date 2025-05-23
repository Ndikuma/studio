
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Lightbulb,
  TrendingUp,
  PenLine,
  Menu,
  UserCircle,
  Settings,
  LogOut,
  Building, // For Brands
  ShoppingCart, // For Promotional Items
  Megaphone, // For Campaigns
  FileText, // For Content Management
  Link2, // For Affiliate Links (was Link Management)
  BookOpen,
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar'; 
import { PromoMarketLogo, PromoMarketLogoIcon } from '@/components/icons/promomarket-logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React from 'react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/brands', label: 'Brands', icon: Building },
  { href: '/dashboard/promotional-items', label: 'Promotional Items', icon: ShoppingCart },
  { href: '/dashboard/campaigns', label: 'Campaigns', icon: Megaphone },
  { href: '/dashboard/affiliate-links', label: 'Affiliate Links', icon: Link2 },
  { href: '/dashboard/content-management', label: 'Content Management', icon: FileText },
  { href: '/dashboard/product-recommender', label: 'AI Promo Recommender', icon: Lightbulb },
  { href: '/dashboard/earnings-tracker', label: 'Performance Tracker', icon: TrendingUp },
  { href: '/dashboard/marketing-content-generator', label: 'AI Content Generator', icon: PenLine },
  { href: '/dashboard/resources', label: 'Resource Library', icon: BookOpen },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const sidebarContent = (
    <>
      <SidebarHeader className="p-4">
        <PromoMarketLogo />
        <div className="hidden group-data-[collapsible=icon]:block">
          <PromoMarketLogoIcon />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
                  tooltip={{ children: item.label, side: 'right', className: 'bg-card text-card-foreground border-border' }}
                  asChild
                >
                  <a>
                    <item.icon />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 mt-auto">
        <Link href="/dashboard/settings" legacyBehavior passHref>
            <SidebarMenuButton
              tooltip={{ children: "Settings", side: 'right', className: 'bg-card text-card-foreground border-border' }}
              asChild
              isActive={pathname === '/dashboard/settings'}
            >
            <a>
                <Settings />
                <span>Settings</span>
            </a>
            </SidebarMenuButton>
        </Link>
      </SidebarFooter>
    </>
  );


  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar collapsible="icon" className="border-r">
          {sidebarContent}
        </Sidebar>
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col p-0 w-72">
                   <SidebarHeader className="p-4 border-b">
                      <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                        <PromoMarketLogo />
                      </Link>
                    </SidebarHeader>
                    <SidebarContent className="overflow-y-auto">
                      <SidebarMenu className="p-2">
                        {navItems.map((item) => (
                          <SidebarMenuItem key={item.href}>
                            <Link href={item.href} legacyBehavior passHref>
                              <Button
                                variant={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href)) ? "secondary" : "ghost"}
                                className="w-full justify-start gap-2"
                                asChild
                              >
                                <a><item.icon className="h-5 w-5" /> {item.label}</a>
                              </Button>
                            </Link>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarContent>
                     <SidebarFooter className="p-4 mt-auto border-t">
                        <Link href="/dashboard/settings" legacyBehavior passHref>
                           <Button variant={pathname === '/dashboard/settings' ? "secondary" : "ghost"} className="w-full justify-start gap-2">
                             <Settings className="h-5 w-5" /> Settings
                           </Button>
                        </Link>
                      </SidebarFooter>
                </SheetContent>
              </Sheet>
            </div>
            
            <div className="w-full flex-1">
              {/* Optional: Breadcrumbs or search bar can go here */}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <UserCircle className="h-6 w-6" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                 <Link href="/dashboard/settings">
                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </DropdownMenuItem>
                 </Link>
                 <Link href="/">
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

