import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-4 px-6 md:px-10 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">
            Earn<span className="text-accent">Hub</span>
          </h1>
          <Button asChild variant="outline">
            <Link href="/dashboard">Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-6 md:px-10 py-12 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Unlock Your Earning Potential Online
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            EarnHub is your dynamic digital marketplace to monetize skills, promote products, and leverage internet-based opportunities. Start your journey to financial freedom today.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/dashboard">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <Image 
            src="https://picsum.photos/600/400?grayscale&blur=2" 
            alt="Digital Marketplace" 
            width={600} 
            height={400}
            data-ai-hint="digital marketplace business"
            className="rounded-xl shadow-2xl" 
          />
        </div>
      </main>

      <footer className="py-8 px-6 md:px-10 border-t bg-secondary">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} EarnHub. All rights reserved.</p>
          <p className="text-sm mt-1">Your gateway to online earning.</p>
        </div>
      </footer>
    </div>
  );
}
