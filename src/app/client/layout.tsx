
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PromoMarketLogo } from '@/components/icons/promomarket-logo';
import type { Metadata } from 'next';
import { ShoppingBag, User, Mail, HomeIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Client Area - PromoMarket',
  description: 'Explore promotional tools and manage your account on PromoMarket.',
};

const clientNavItems = [
  { href: '/client/home', label: 'Home', icon: HomeIcon },
  { href: '/client/products', label: 'Products for Promotion', icon: ShoppingBag },
  { href: '/client/profile', label: 'My Profile', icon: User },
  { href: '/client/contact', label: 'Contact Us', icon: Mail },
];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/client/home" className="mr-6 flex items-center space-x-2">
            <PromoMarketLogo />
          </Link>
          <nav className="hidden md:flex gap-6">
            {clientNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <item.icon className="inline-block mr-1 h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/dashboard">Admin Dashboard</Link>
            </Button>
             <Button asChild>
                <Link href="/">Main Site</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8">{children}</main>
      <footer className="py-8 px-6 md:px-10 border-t bg-card">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PromoMarket Client Area. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
