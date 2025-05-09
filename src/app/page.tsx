import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Zap, BarChartBig, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const featureCards = [
  {
    icon: Zap,
    title: 'AI-Powered Tools',
    description: 'Leverage cutting-edge AI for product recommendations and content generation to boost your marketing efforts.',
    dataAiHint: 'artificial intelligence technology'
  },
  {
    icon: BarChartBig,
    title: 'Comprehensive Tracking',
    description: 'Monitor your earnings, clicks, and conversions with our detailed analytics and reporting features.',
    dataAiHint: 'data analytics chart'
  },
  {
    icon: MessageSquare,
    title: 'Seamless Integration',
    description: 'Easily connect with affiliate programs and manage your campaigns all in one centralized platform.',
    dataAiHint: 'connected network integration'
  },
];

const howItWorksSteps = [
  {
    step: 1,
    title: 'Sign Up & Setup',
    description: 'Create your EarnHub account in minutes and configure your profile to get started.',
    image: 'https://picsum.photos/300/200?grayscale&random=1',
    dataAiHint: 'user registration interface'
  },
  {
    step: 2,
    title: 'Explore & Generate',
    description: 'Utilize AI tools to find product opportunities and generate engaging marketing content effortlessly.',
    image: 'https://picsum.photos/300/200?grayscale&random=2',
    dataAiHint: 'creative process tools'
  },
  {
    step: 3,
    title: 'Track & Optimize',
    description: 'Monitor your performance with real-time analytics and optimize your strategies for maximum earnings.',
    image: 'https://picsum.photos/300/200?grayscale&random=3',
    dataAiHint: 'dashboard analytics progress'
  },
];

const testimonialCards = [
  {
    name: 'Alex P.',
    role: 'Affiliate Marketer',
    quote: "EarnHub's AI tools have revolutionized how I approach content creation. My conversion rates are up by 30%!",
    avatar: 'https://picsum.photos/100/100?grayscale&random=4',
    dataAiHint: 'professional portrait man'
  },
  {
    name: 'Sarah K.',
    role: 'Content Creator',
    quote: "The earnings tracker is incredibly detailed and helps me understand exactly what's working. Highly recommended!",
    avatar: 'https://picsum.photos/100/100?grayscale&random=5',
    dataAiHint: 'professional portrait woman'
  },
  {
    name: 'Mike L.',
    role: 'Online Entrepreneur',
    quote: "Managing multiple affiliate links was a headache. EarnHub streamlined everything. A game changer!",
    avatar: 'https://picsum.photos/100/100?grayscale&random=6',
    dataAiHint: 'smiling person outdoor'
  },
];


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-4 px-6 md:px-10 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">
            Earn<span className="text-accent">Hub</span>
          </h1>
          <Button asChild variant="outline">
            <Link href="/dashboard">Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto px-6 md:px-10 py-12 md:py-24 flex flex-col md:flex-row items-center">
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
              src="https://picsum.photos/600/400?grayscale&blur=1" 
              alt="Digital Marketplace" 
              width={600} 
              height={400}
              data-ai-hint="digital marketplace business"
              className="rounded-xl shadow-2xl" 
              priority
            />
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-6 md:px-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why Choose EarnHub?</h2>
              <p className="text-lg text-muted-foreground mt-2">Powerful features designed for your success.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {featureCards.map((feature, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="items-center text-center">
                    <feature.icon className="h-12 w-12 text-primary mb-4" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Get Started in 3 Easy Steps</h2>
              <p className="text-lg text-muted-foreground mt-2">Launch your earning journey quickly and efficiently.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 items-start">
              {howItWorksSteps.map((step) => (
                <div key={step.step} className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                     <Image 
                        src={step.image}
                        alt={step.title}
                        width={300}
                        height={200}
                        data-ai-hint={step.dataAiHint}
                        className="rounded-lg shadow-md"
                      />
                    <div className="absolute -top-4 -left-4 bg-primary text-primary-foreground h-10 w-10 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-6 md:px-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Loved by Marketers & Creators</h2>
              <p className="text-lg text-muted-foreground mt-2">See what our users are saying about EarnHub.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonialCards.map((testimonial, index) => (
                 <Card key={index} className="shadow-lg flex flex-col">
                  <CardContent className="pt-6 flex-grow flex flex-col items-center text-center">
                    <Image 
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={80}
                      height={80}
                      data-ai-hint={testimonial.dataAiHint}
                      className="rounded-full mb-4"
                    />
                    <p className="text-muted-foreground italic mb-4 flex-grow">"{testimonial.quote}"</p>
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-primary">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
             <div className="text-center mt-12">
                <Button variant="outline" size="lg" asChild>
                    <Link href="/#">
                        Read More Testimonials <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 px-6 md:px-10 border-t bg-card">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} EarnHub. All rights reserved.</p>
          <p className="text-sm mt-1">Your gateway to online earning.</p>
        </div>
      </footer>
    </div>
  );
}
