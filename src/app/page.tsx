
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
  Building, // For Brands
  Megaphone, // For Campaigns
  Link2 as LinkIcon, // For Affiliate Links
} from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PromoMarketLogo } from '@/components/icons/promomarket-logo';


const featureCards = [
  {
    icon: Brain, // Changed from Zap
    title: 'AI-Powered Promotion Suite',
    description: 'Leverage AI for item recommendations, content generation, and campaign insights to maximize your promotional impact.',
    dataAiHint: 'artificial intelligence technology'
  },
  {
    icon: BarChartBig,
    title: 'Comprehensive Analytics',
    description: 'Track earnings, link clicks, campaign conversions, and content performance with detailed reporting.',
    dataAiHint: 'data analytics chart'
  },
  {
    icon: LayoutGrid, // Changed from MessageSquare
    title: 'Centralized Management',
    description: 'Manage brands, promotional items, affiliate links, campaigns, and content all in one unified platform.',
    dataAiHint: 'dashboard interface'
  },
];

const howItWorksSteps = [
  {
    step: 1,
    title: 'Sign Up & Setup',
    description: 'Create your PromoMarket account and configure your profile to access powerful promotional tools.',
    image: 'https://picsum.photos/300/200?grayscale&random=1',
    dataAiHint: 'user registration interface'
  },
  {
    step: 2,
    title: 'Discover & Create',
    description: 'Explore promotional items, generate affiliate links, create campaigns, and use AI to craft marketing content.',
    image: 'https://picsum.photos/300/200?grayscale&random=2',
    dataAiHint: 'creative process tools'
  },
  {
    step: 3,
    title: 'Track & Optimize',
    description: 'Monitor performance with real-time analytics and refine your strategies for maximum earnings and impact.',
    image: 'https://picsum.photos/300/200?grayscale&random=3',
    dataAiHint: 'dashboard analytics progress'
  },
];

const testimonialCards = [
  {
    name: 'Alex P.',
    role: 'Affiliate Marketer',
    quote: "PromoMarket's AI tools for item discovery and content generation are incredible. My earnings have significantly increased!",
    avatar: 'https://picsum.photos/100/100?grayscale&random=4',
    dataAiHint: 'professional portrait man'
  },
  {
    name: 'Sarah K.',
    role: 'Content Creator',
    quote: "The platform makes it so easy to manage my promotional content and track ad revenue. A must-have for creators!",
    avatar: 'https://picsum.photos/100/100?grayscale&random=5',
    dataAiHint: 'professional portrait woman'
  },
  {
    name: 'Mike L.',
    role: 'Campaign Manager',
    quote: "Managing multiple campaigns and their affiliate links was complex. PromoMarket streamlined everything. Highly efficient!",
    avatar: 'https://picsum.photos/100/100?grayscale&random=6',
    dataAiHint: 'smiling person outdoor'
  },
];

const HeroSection = () => (
  <section className="container mx-auto px-6 md:px-10 py-12 md:py-24 flex flex-col md:flex-row items-center">
    <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
      <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
        Elevate Your Digital Market Promotions
      </h2>
      <p className="text-lg text-muted-foreground mb-8">
        PromoMarket is your ultimate platform to manage brands, discover promotional items, launch campaigns, and track earnings. Maximize your online impact with AI-driven tools.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/client/home">
            Explore Client Area <Home className="ml-2 h-5 w-5" />
          </Link>
        </Button>
         <Button asChild size="lg" variant="outline">
          <Link href="/dashboard">
            Go to Admin Dashboard <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
    <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
      <Image
        src="https://picsum.photos/600/400?grayscale&blur=1&random=hero"
        alt="Digital Marketing Promotion Platform"
        width={600}
        height={400}
        data-ai-hint="digital marketing business"
        className="rounded-xl shadow-2xl"
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
);

const HowItWorksSection = () => (
  <section className="py-16 md:py-24">
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
  <section className="py-16 md:py-24 bg-secondary">
    <div className="container mx-auto px-6 md:px-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Loved by Promoters & Creators</h2>
        <p className="text-lg text-muted-foreground mt-2">See what our users are saying about PromoMarket.</p>
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
          <Link href="#testimonials-more"> {/* Placeholder link */}
            Read More Testimonials <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  </section>
);

// Placeholder for additional sections to reach 20 total. 
// Actual content would depend on specific aspects of "EarnHub" to highlight.
const PlaceholderSection = ({ title, icon: Icon, description, imageHint, imageUrlSeed }: { title: string, icon: React.ElementType, description: string, imageHint: string, imageUrlSeed: string }) => (
  <section className="py-16 md:py-24 odd:bg-background even:bg-secondary">
    <div className="container mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center gap-12 odd:md:flex-row-reverse">
      <div className="md:w-1/2">
        <Icon className="h-12 w-12 text-primary mb-4" />
        <h2 className="text-3xl font-bold text-foreground mb-4">{title}</h2>
        <p className="text-lg text-muted-foreground mb-6">{description}</p>
         <Button variant="link" asChild><Link href="/client/home">Learn More <ArrowRight className="ml-2 h-4 w-4"/></Link></Button>
      </div>
      <div className="md:w-1/2">
        <Image
          src={`https://picsum.photos/500/350?grayscale&random=${imageUrlSeed}`}
          alt={title}
          width={500}
          height={350}
          data-ai-hint={imageHint}
          className="rounded-xl shadow-xl"
        />
      </div>
    </div>
  </section>
);


const additionalSectionsData = [
  { title: "Brand Management Hub", icon: Building, description: "Organize and manage all the brands you collaborate with for promotions, all in one place.", imageHint: "brand logos collage", imageUrlSeed: "brands" },
  { title: "Promotional Item Discovery", icon: ShoppingCart, description: "Explore a diverse catalog of products, services, and digital goods ready for promotion.", imageHint: "product showcase", imageUrlSeed: "promoitems" },
  { title: "Dynamic Campaign Creation", icon: Megaphone, description: "Launch targeted promotional campaigns with customizable parameters and track their progress.", imageHint: "campaign planning", imageUrlSeed: "campaigns" },
  { title: "Smart Affiliate Link Generation", icon: LinkIcon, description: "Easily create and manage unique affiliate links for every promotional item and campaign.", imageHint: "link network", imageUrlSeed: "links" },
  { title: "Content Monetization Tools", icon: FileText, description: "Integrate promotional content and track ad revenue alongside your affiliate earnings.", imageHint: "writing tools", imageUrlSeed: "contenttools" },
  { title: "Advanced Trend Prediction", icon: Lightbulb, description: "Stay ahead with AI-driven insights into market trends and profitable niches for promotion.", imageHint: "future graph", imageUrlSeed: "trends" },
  { title: "Multi-Platform Integration", icon: Share2, description: "Connect PromoMarket with your favorite e-commerce platforms, social media, and marketing tools.", imageHint: "connected devices", imageUrlSeed: "integration" },
  { title: "Customizable Dashboards", icon: LayoutGrid, description: "Personalize your dashboard to see the metrics that matter most for your promotional efforts.", imageHint: "dashboard interface", imageUrlSeed: "dashboards" },
  { title: "Deep Dive Analytics Suite", icon: PieChart, description: "Go beyond surface-level data with granular insights into campaign performance and customer behavior.", imageHint: "analytics charts", imageUrlSeed: "deepanalytics" },
  { title: "Versatile Content Generation AI", icon: Type, description: "Create blog posts, social media updates, email campaigns, and ad copy with AI assistance.", imageHint: "ai writing", imageUrlSeed: "aicontent" },
  { title: "For Affiliate Marketers", icon: Target, description: "Specialized tools for link management, commission tracking, and discovering high-impact items.", imageHint: "marketing strategy", imageUrlSeed: "affiliates" },
  { title: "Empowering Content Creators", icon: Camera, description: "Monetize your passion by finding relevant items to promote and track earnings from your content.", imageHint: "creative workspace", imageUrlSeed: "creators" },
  { title: "Growth for Entrepreneurs", icon: Briefcase, description: "Scale your online ventures by diversifying promotional channels and optimizing marketing spend.", imageHint: "business growth", imageUrlSeed: "entrepreneurs" },
  { title: "Success Stories & Case Studies", icon: Award, description: "Discover how users have transformed their digital promotions and earnings with PromoMarket.", imageHint: "success trophy", imageUrlSeed: "success" },
  { title: "Robust Security & Reliability", icon: Server, description: "Your data security and platform reliability are our top priorities, with industry-standard measures.", imageHint: "data security", imageUrlSeed: "security" },
  { title: "Community & Support", icon: Users2, description: "Connect with fellow users, share strategies, and get support from our active community and helpdesk.", imageHint: "community people", imageUrlSeed: "community" },
];


const FAQSection = () => {
  const faqs = [
    {
      question: "What is PromoMarket?",
      answer: "PromoMarket is a comprehensive platform designed to help individuals and businesses manage and optimize their digital market promotions through AI-powered tools, analytics, brand and item management, campaign creation, and content monetization features."
    },
    {
      question: "How does the AI item recommender work for promotions?",
      answer: "Our AI analyzes target audience profiles, interests, and market trends to suggest relevant and high-converting promotional items (products, services, campaigns) for you to promote effectively."
    },
    {
      question: "Is there a free trial or a free plan for PromoMarket?",
      answer: "Yes, PromoMarket offers a free tier with basic features to get you started. We also have premium plans with more advanced promotional capabilities and higher usage limits."
    },
    {
      question: "Can I manage multiple brands and their promotional items?",
      answer: "Absolutely! PromoMarket allows you to manage multiple brands, their specific categories, and a wide array of promotional items associated with them."
    },
    {
      question: "How does campaign management work?",
      answer: "You can create detailed promotional campaigns, associate them with specific items or brands, set start and end dates, define commission rates, and track their performance through clicks and conversions."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <HelpCircle className="h-12 w-12 text-primary mb-4 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            Got questions about PromoMarket? We've got answers.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index + 1}`} key={index}>
              <AccordionTrigger className="text-left hover:no-underline">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
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
      <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-10 py-6">
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
        <HowItWorksSection />
        <TestimonialsSection />
        {additionalSectionsData.map(sec => <PlaceholderSection key={sec.imageUrlSeed} {...sec} />)}
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
