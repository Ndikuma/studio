
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  CheckCircle,
  Zap,
  BarChartBig,
  MessageSquare,
  Lightbulb, 
  Brain,
  Share2,
  LayoutGrid,
  SlidersHorizontal,
  PieChart,
  AreaChart,
  FileText,
  Edit3,
  Type,
  Target,
  Camera,
  Video,
  Mic,
  Briefcase,
  Rocket,
  DollarSign,
  Award,
  CheckSquare,
  Handshake,
  Server,
  MessageCircle as MessageCircleIcon, 
  LifeBuoy,
  Users2,
  Eye,
  Tag,
  HelpCircle,
  ListChecks,
  ArrowRightCircle,
  Send,
  UserPlus,
  ShoppingCart,
  Contact,
  UserCircle2,
  Home,
  Building, 
  Megaphone, 
  Link2 as LinkIcon, 
  TrendingUp,
  PenLine,
} from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PromoMarketLogo } from '@/components/icons/promomarket-logo';


const featureCards = [
  {
    icon: Brain, 
    title: 'AI-Powered Promotion Suite',
    description: 'Leverage AI for item recommendations, content generation, and campaign insights to maximize your promotional impact.',
  },
  {
    icon: BarChartBig,
    title: 'Comprehensive Analytics',
    description: 'Track earnings, link clicks, campaign conversions, and content performance with detailed reporting.',
  },
  {
    icon: LayoutGrid, 
    title: 'Centralized Management',
    description: 'Manage brands, promotional items, affiliate links, campaigns, and content all in one unified platform.',
  },
];

const coreModules = [
  {
    icon: Lightbulb,
    title: 'AI-Powered Recommendations',
    description: 'Discover high-potential promotional items and strategies tailored to your audience with intelligent suggestions.',
    cta: 'Get Recommendations',
    href: '/dashboard/product-recommender',
  },
  {
    icon: PenLine,
    title: 'AI Content Generation',
    description: 'Craft compelling marketing copy, blog posts, and social media updates in minutes with our AI writing assistant.',
    cta: 'Create Content',
    href: '/dashboard/marketing-content-generator',
  },
  {
    icon: TrendingUp,
    title: 'Advanced Performance Tracking',
    description: 'Monitor clicks, conversions, and earnings with in-depth analytics to optimize your promotional efforts.',
    cta: 'Track Performance',
    href: '/dashboard/earnings-tracker',
  },
  {
    icon: Megaphone,
    title: 'Seamless Campaign Management',
    description: 'Plan, execute, and oversee your marketing campaigns, from individual promotions to large-scale initiatives.',
    cta: 'Manage Campaigns',
    href: '/dashboard/campaigns',
  },
  {
    icon: LinkIcon,
    title: 'Simplified Affiliate Links',
    description: 'Generate, manage, and track all your unique affiliate links efficiently in one central hub.',
    cta: 'Organize Links',
    href: '/dashboard/affiliate-links',
  },
  {
    icon: Building,
    title: 'Centralized Brand & Item Hub',
    description: 'Effortlessly manage your portfolio of brands and promotional items, keeping all details organized and accessible.',
    cta: 'View Your Assets',
    href: '/dashboard/brands',
  },
];


const howItWorksSteps = [
  {
    step: 1,
    title: 'Sign Up & Setup',
    description: 'Create your PromoMarket account and configure your profile to access powerful promotional tools.',
    image: 'https://picsum.photos/seed/signup/300/200?grayscale',
    dataAiHint: 'user registration interface'
  },
  {
    step: 2,
    title: 'Discover & Create',
    description: 'Explore promotional items, generate affiliate links, create campaigns, and use AI to craft marketing content.',
    image: 'https://picsum.photos/seed/discover/300/200?grayscale',
    dataAiHint: 'creative process tools'
  },
  {
    step: 3,
    title: 'Track & Optimize',
    description: 'Monitor performance with real-time analytics and refine your strategies for maximum earnings and impact.',
    image: 'https://picsum.photos/seed/track/300/200?grayscale',
    dataAiHint: 'dashboard analytics progress'
  },
];

const testimonialCards = [
  {
    name: 'Alex P.',
    role: 'Affiliate Marketer',
    quote: "PromoMarket's AI tools for item discovery and content generation are incredible. My earnings have significantly increased!",
    avatar: 'https://picsum.photos/seed/alex/100/100?grayscale',
    dataAiHint: 'professional portrait man'
  },
  {
    name: 'Sarah K.',
    role: 'Content Creator',
    quote: "The platform makes it so easy to manage my promotional content and track ad revenue. A must-have for creators!",
    avatar: 'https://picsum.photos/seed/sarah/100/100?grayscale',
    dataAiHint: 'professional portrait woman'
  },
  {
    name: 'Mike L.',
    role: 'Campaign Manager',
    quote: "Managing multiple campaigns and their affiliate links was complex. PromoMarket streamlined everything. Highly efficient!",
    avatar: 'https://picsum.photos/seed/mike/100/100?grayscale',
    dataAiHint: 'smiling person outdoor'
  },
];

const HeroSection = () => (
  <section className="container mx-auto px-6 md:px-10 py-12 md:py-24 flex flex-col md:flex-row items-center">
    <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
        Amplify Your Digital Promotions with <span className="text-primary">AI Precision</span>
      </h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-xl">
        Transform your marketing strategy with PromoMarket. Leverage intelligent tools to discover top items, create stunning content, manage campaigns effortlessly, and skyrocket your earnings. Your success in the digital market starts here.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        <Button asChild size="lg" className="text-lg px-8 py-6">
          <Link href="/client/home">
            Explore Client Area <Home className="ml-2 h-5 w-5" />
          </Link>
        </Button>
         <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6">
          <Link href="/dashboard">
            Go to Admin Dashboard <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
    <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
      <Image
        src="https://picsum.photos/seed/digitalmarket/600/450?grayscale"
        alt="PromoMarket Digital Marketing Platform"
        width={600}
        height={450}
        data-ai-hint="digital marketing business"
        className="rounded-xl shadow-2xl object-cover"
        priority
      />
    </div>
  </section>
);

const KeyFeaturesSection = () => (
  <section className="py-16 md:py-24 bg-secondary">
    <div className="container mx-auto px-6 md:px-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why Choose PromoMarket?</h2>
        <p className="text-lg text-muted-foreground mt-2">Powerful features designed for your promotional success.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {featureCards.map((feature, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
            <CardHeader className="items-center text-center">
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const CoreModulesSection = () => (
  <section className="py-16 md:py-24">
    <div className="container mx-auto px-6 md:px-10">
      <div className="text-center mb-16">
        <Zap className="h-12 w-12 text-primary mb-4 mx-auto" />
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Supercharge Your Promotions</h2>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          PromoMarket equips you with a comprehensive suite of tools designed for digital marketing excellence.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {coreModules.map((module) => (
          <Card key={module.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col bg-card">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <module.icon className="h-8 w-8 text-accent" />
                <CardTitle className="text-xl text-foreground">{module.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{module.description}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full text-primary border-primary hover:bg-primary/10">
                <Link href={module.href}>
                  {module.cta} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  </section>
);


const HowItWorksSection = () => (
  <section className="py-16 md:py-24 bg-secondary">
    <div className="container mx-auto px-6 md:px-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Get Started with PromoMarket in 3 Easy Steps</h2>
        <p className="text-lg text-muted-foreground mt-2">Launch your promotional journey quickly and efficiently.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 items-start">
        {howItWorksSteps.map((step) => (
          <div key={step.step} className="flex flex-col items-center text-center p-4">
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
);

const TestimonialsSection = () => (
  <section className="py-16 md:py-24">
    <div className="container mx-auto px-6 md:px-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Loved by Promoters & Creators</h2>
        <p className="text-lg text-muted-foreground mt-2">See what our users are saying about PromoMarket.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonialCards.map((testimonial, index) => (
          <Card key={index} className="shadow-lg flex flex-col bg-card">
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
          <Link href="/client/contact"> 
            Share Your Story <Send className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  </section>
);

const FAQSection = () => {
  const faqs = [
    {
      question: "What is PromoMarket and how does it help with digital market promotions?",
      answer: "PromoMarket is a comprehensive platform designed to help individuals and businesses manage and optimize their digital market promotions. It offers AI-powered tools for item recommendations and content generation, robust analytics, and centralized management for brands, promotional items, campaigns, and affiliate links, all aimed at maximizing your online impact and earnings."
    },
    {
      question: "How does the AI promotional item recommender work?",
      answer: "Our AI analyzes target audience profiles, interests, and current digital market trends to suggest relevant and high-converting promotional items (including products, services, and campaigns) tailored to your specific promotional needs and audience."
    },
    {
      question: "What kind of support can I expect for my digital promotion activities?",
      answer: "PromoMarket provides access to a resource library, a community forum to connect with other promoters, and a dedicated helpdesk for technical and strategic assistance to ensure your digital marketing efforts are successful."
    },
    {
      question: "Can I manage promotions for multiple brands or products?",
      answer: "Absolutely! PromoMarket is built to handle multiple brands, their specific product categories, and a diverse array of promotional items. You can organize and track all your digital market promotions efficiently from one dashboard."
    },
    {
      question: "How does PromoMarket help in creating and managing promotional campaigns?",
      answer: "You can create detailed promotional campaigns, associate them with specific items or brands, define target audiences, set start and end dates, establish commission structures, and track their performance in real-time through comprehensive analytics on clicks, conversions, and overall ROI for your digital market initiatives."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <HelpCircle className="h-12 w-12 text-primary mb-4 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            Got questions about maximizing your digital market promotions with PromoMarket? We've got answers.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index + 1}`} key={index} className="bg-card rounded-md mb-2 shadow-sm">
              <AccordionTrigger className="text-left hover:no-underline px-6 py-4 text-foreground">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground px-6 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

const FinalCTASection = () => (
  <section id="join-today" className="py-16 md:py-24 bg-gradient-to-r from-primary to-accent">
    <div className="container mx-auto px-6 md:px-10 text-center">
      <UserPlus className="h-16 w-16 text-white mb-6 mx-auto" />
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Revolutionize Your Digital Promotions?</h2>
      <p className="text-xl text-primary-foreground mb-10 max-w-3xl mx-auto">
        Join PromoMarket today and unlock a suite of powerful tools designed to help you succeed in the competitive world of digital market promotion. Sign up and start maximizing your earnings.
      </p>
      <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-shadow">
        <Link href="/client/home">
          Get Started with PromoMarket <ArrowRightCircle className="ml-3 h-6 w-6" />
        </Link>
      </Button>
    </div>
  </section>
);


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="py-4 px-6 md:px-10 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
             <PromoMarketLogo/>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/client/home" className="text-sm font-medium text-muted-foreground hover:text-primary">
              <Home className="inline-block mr-1 h-4 w-4" /> Client Area
            </Link>
            <Link href="/client/promotions" className="text-sm font-medium text-muted-foreground hover:text-primary">
              <ShoppingCart className="inline-block mr-1 h-4 w-4" /> Promotions
            </Link>
             <Link href="/client/profile" className="text-sm font-medium text-muted-foreground hover:text-primary">
              <UserCircle2 className="inline-block mr-1 h-4 w-4" /> My Profile
            </Link>
            <Link href="/client/contact" className="text-sm font-medium text-muted-foreground hover:text-primary">
              <Contact className="inline-block mr-1 h-4 w-4" /> Contact
            </Link>
          </nav>
          <Button asChild variant="outline">
            <Link href="/dashboard">Admin Dashboard <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow">
        <HeroSection />
        <KeyFeaturesSection />
        <CoreModulesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTASection />
      </main>

      <footer className="py-8 px-6 md:px-10 border-t bg-card">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PromoMarket. All rights reserved.</p>
          <p className="text-sm mt-1">Your partner in digital market promotion.</p>
        </div>
      </footer>
    </div>
  );
}
