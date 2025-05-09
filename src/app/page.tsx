
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  CheckCircle,
  Zap,
  BarChartBig,
  MessageSquare,
  Lightbulb, // Added for consistency if needed, already in featureCards
  Brain,
  Cpu,
  Share2,
  LayoutGrid,
  SlidersHorizontal,
  PieChart,
  AreaChart,
  FileText,
  Edit3,
  Type,
  Target,
  Megaphone,
  Camera,
  Video,
  Mic,
  Briefcase,
  Rocket,
  DollarSign,
  Star,
  Award,
  CheckSquare,
  Handshake,
  Building,
  Globe,
  ShieldCheck,
  Lock,
  Server,
  MessageCircle,
  LifeBuoy,
  Users2,
  Eye,
  Flag,
  Mountain,
  Tag,
  CreditCard,
  Gift,
  HelpCircle,
  ListChecks,
  ArrowRightCircle,
  Send,
  UserPlus
} from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


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

// Section 1: Hero (Existing)
const HeroSection = () => (
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
        src="https://picsum.photos/600/400?grayscale&blur=1&random=hero"
        alt="Digital Marketplace"
        width={600}
        height={400}
        data-ai-hint="digital marketplace business"
        className="rounded-xl shadow-2xl"
        priority
      />
    </div>
  </section>
);

// Section 2: Key Features (Existing)
const KeyFeaturesSection = () => (
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
);

// Section 3: How It Works (Existing)
const HowItWorksSection = () => (
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
);

// Section 4: Testimonials (Existing)
const TestimonialsSection = () => (
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
          <Link href="/#testimonials-more"> {/* Updated href for potential future expansion */}
            Read More Testimonials <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  </section>
);

// Section 5: Advanced AI Capabilities
const AdvancedAICapabilitiesSection = () => (
  <section id="advanced-ai" className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center gap-12">
      <div className="md:w-1/2">
        <Brain className="h-12 w-12 text-primary mb-4" />
        <h2 className="text-3xl font-bold text-foreground mb-4">Unlock Advanced AI Capabilities</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Go beyond basic tools with EarnHub’s sophisticated AI. Predict market trends, segment audiences with precision, and receive data-driven insights to optimize your strategies for peak performance.
        </p>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-center"><CheckCircle className="h-5 w-5 text-accent mr-2" /> AI-driven trend prediction</li>
          <li className="flex items-center"><CheckCircle className="h-5 w-5 text-accent mr-2" /> Intelligent audience segmentation</li>
          <li className="flex items-center"><CheckCircle className="h-5 w-5 text-accent mr-2" /> Automated content personalization</li>
        </ul>
      </div>
      <div className="md:w-1/2">
        <Image
          src="https://picsum.photos/500/350?grayscale&random=ai"
          alt="Advanced AI"
          width={500}
          height={350}
          data-ai-hint="AI brain network"
          className="rounded-xl shadow-xl"
        />
      </div>
    </div>
  </section>
);

// Section 6: Multi-Platform Integration
const MultiPlatformIntegrationSection = () => (
  <section id="multi-platform" className="py-16 md:py-24 bg-secondary">
    <div className="container mx-auto px-6 md:px-10 text-center">
      <Share2 className="h-12 w-12 text-primary mb-4 mx-auto" />
      <h2 className="text-3xl font-bold text-foreground mb-4">Seamless Multi-Platform Integration</h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
        Connect EarnHub with your favorite e-commerce platforms, social media channels, and marketing tools. Manage all your affiliate activities and campaigns from one unified dashboard.
      </p>
      <div className="flex justify-center space-x-4">
        <Image src="https://picsum.photos/300/200?grayscale&random=platform1" alt="Platform Integration 1" width={300} height={200} data-ai-hint="connected devices" className="rounded-lg shadow-md"/>
        <Image src="https://picsum.photos/300/200?grayscale&random=platform2" alt="Platform Integration 2" width={300} height={200} data-ai-hint="social media" className="rounded-lg shadow-md hidden md:block"/>
      </div>
    </div>
  </section>
);

// Section 7: Customizable Dashboards
const CustomizableDashboardsSection = () => (
  <section id="custom-dashboards" className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-6 md:px-10 flex flex-col md:flex-row-reverse items-center gap-12">
      <div className="md:w-1/2">
        <LayoutGrid className="h-12 w-12 text-primary mb-4" />
        <h2 className="text-3xl font-bold text-foreground mb-4">Your Dashboard, Your Way</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Personalize your EarnHub dashboard to see the metrics that matter most to you. Arrange widgets, choose data visualizations, and create a workspace that fits your unique workflow.
        </p>
        <Button variant="outline">Learn More About Customization <ArrowRight className="ml-2 h-4 w-4" /></Button>
      </div>
      <div className="md:w-1/2">
        <Image
          src="https://picsum.photos/500/350?grayscale&random=dashboard"
          alt="Customizable Dashboard"
          width={500}
          height={350}
          data-ai-hint="dashboard interface"
          className="rounded-xl shadow-xl"
        />
      </div>
    </div>
  </section>
);

// Section 8: Deep Dive Analytics
const DeepDiveAnalyticsSection = () => (
  <section id="deep-analytics" className="py-16 md:py-24 bg-secondary">
    <div className="container mx-auto px-6 md:px-10">
      <div className="text-center mb-12">
        <PieChart className="h-12 w-12 text-primary mb-4 mx-auto" />
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Deep Dive Analytics Suite</h2>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Go beyond surface-level data. Our comprehensive analytics suite provides granular insights into campaign performance, customer behavior, conversion funnels, and more.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="shadow-md">
          <CardHeader><CardTitle className="flex items-center gap-2"><AreaChart className="h-6 w-6 text-accent"/> Performance Metrics</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">Track clicks, conversions, EPC, and ROI in real-time.</p></CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader><CardTitle className="flex items-center gap-2"><Users2 className="h-6 w-6 text-accent"/> Audience Insights</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">Understand demographics, interests, and purchase patterns.</p></CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader><CardTitle className="flex items-center gap-2"><SlidersHorizontal className="h-6 w-6 text-accent"/> Funnel Optimization</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">Identify drop-off points and optimize your conversion funnels.</p></CardContent>
        </Card>
      </div>
    </div>
  </section>
);

// Section 9: Versatile Content Generation
const VersatileContentGenerationSection = () => (
  <section id="content-generation" className="py-16 md:py-24 bg-background">
     <div className="container mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center gap-12">
      <div className="md:w-1/2">
        <Image
          src="https://picsum.photos/500/400?grayscale&random=content"
          alt="Content Generation"
          width={500}
          height={400}
          data-ai-hint="writing tools"
          className="rounded-xl shadow-xl"
        />
      </div>
      <div className="md:w-1/2">
        <FileText className="h-12 w-12 text-primary mb-4" />
        <h2 className="text-3xl font-bold text-foreground mb-4">AI Content for Every Need</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Our AI content generator isn't just for product descriptions. Create blog posts, social media updates, email campaigns, ad copy, and more, all tailored to your brand voice and target audience.
        </p>
        <div className="grid grid-cols-2 gap-4 text-muted-foreground">
          <div className="flex items-center"><Type className="h-5 w-5 text-accent mr-2" /> Blog Articles</div>
          <div className="flex items-center"><MessageSquare className="h-5 w-5 text-accent mr-2" /> Social Media Posts</div>
          <div className="flex items-center"><Send className="h-5 w-5 text-accent mr-2" /> Email Copy</div>
          <div className="flex items-center"><Edit3 className="h-5 w-5 text-accent mr-2" /> Ad Creatives</div>
        </div>
      </div>
    </div>
  </section>
);

// Section 10: Tailored for Affiliate Marketers
const ForAffiliateMarketersSection = () => (
  <section id="for-affiliates" className="py-16 md:py-24 bg-secondary">
    <div className="container mx-auto px-6 md:px-10 text-center">
      <Target className="h-12 w-12 text-primary mb-4 mx-auto" />
      <h2 className="text-3xl font-bold text-foreground mb-4">Built for Affiliate Marketers</h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
        EarnHub provides specialized tools for affiliate marketers: link management, commission tracking, campaign optimization, and AI-driven product discovery to find high-converting offers.
      </p>
      <Image
          src="https://picsum.photos/600/300?grayscale&random=affiliate"
          alt="Affiliate Marketing Tools"
          width={600}
          height={300}
          data-ai-hint="marketing strategy"
          className="rounded-xl shadow-xl mx-auto"
        />
    </div>
  </section>
);

// Section 11: Empowering Content Creators
const ForContentCreatorsSection = () => (
  <section id="for-creators" className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-6 md:px-10 flex flex-col md:flex-row-reverse items-center gap-12">
      <div className="md:w-1/2">
        <Camera className="h-12 w-12 text-primary mb-4" />
        <h2 className="text-3xl font-bold text-foreground mb-4">Fueling Content Creators</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Monetize your passion. EarnHub helps content creators find relevant products to promote, generate engaging scripts or posts, and track earnings from their creative endeavors.
        </p>
         <div className="flex space-x-4">
            <Video className="h-8 w-8 text-accent"/>
            <Mic className="h-8 w-8 text-accent"/>
            <Lightbulb className="h-8 w-8 text-accent"/>
         </div>
      </div>
      <div className="md:w-1/2">
         <Image
          src="https://picsum.photos/500/350?grayscale&random=creator"
          alt="Content Creator Tools"
          width={500}
          height={350}
          data-ai-hint="creative workspace"
          className="rounded-xl shadow-xl"
        />
      </div>
    </div>
  </section>
);

// Section 12: Solutions for Online Entrepreneurs
const ForEntrepreneursSection = () => (
  <section id="for-entrepreneurs" className="py-16 md:py-24 bg-secondary">
    <div className="container mx-auto px-6 md:px-10">
       <div className="text-center mb-12">
        <Briefcase className="h-12 w-12 text-primary mb-4 mx-auto" />
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Your Partner in Online Business</h2>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          For entrepreneurs scaling their online ventures, EarnHub offers tools to diversify revenue streams, optimize marketing spend, and manage promotional activities efficiently.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <Image
            src="https://picsum.photos/500/300?grayscale&random=entrepreneur"
            alt="Online Entrepreneurship"
            width={500}
            height={300}
            data-ai-hint="business growth"
            className="rounded-xl shadow-xl"
          />
        </div>
        <ul className="space-y-4 text-lg">
          <li className="flex items-start"><Rocket className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" /> <span>Scale your marketing efforts with AI automation.</span></li>
          <li className="flex items-start"><DollarSign className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" /> <span>Maximize ROI with intelligent campaign management.</span></li>
          <li className="flex items-start"><BarChartBig className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" /> <span>Access actionable data to drive strategic decisions.</span></li>
        </ul>
      </div>
    </div>
  </section>
);

// Section 13: Real Success Stories (Case Studies)
const SuccessStoriesSection = () => (
  <section id="success-stories" className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-6 md:px-10">
      <div className="text-center mb-12">
        <Award className="h-12 w-12 text-primary mb-4 mx-auto" />
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Real Results, Real Success</h2>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Discover how users like you have transformed their online earnings with EarnHub.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg hover:shadow-xl">
          <CardHeader>
            <Image src="https://picsum.photos/80/80?grayscale&random=success1" alt="User 1" width={80} height={80} data-ai-hint="business person" className="rounded-full mb-2"/>
            <CardTitle>Increased Conversions by 45%</CardTitle>
            <CardDescription>"EarnHub's AI recommendations helped me target the right products to my audience." - Jane D.</CardDescription>
          </CardHeader>
          <CardContent>
             <Image src="https://picsum.photos/400/200?grayscale&random=case1" alt="Case Study 1 Graph" width={400} height={200} data-ai-hint="graph increase" className="rounded-md"/>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl">
          <CardHeader>
            <Image src="https://picsum.photos/80/80?grayscale&random=success2" alt="User 2" width={80} height={80} data-ai-hint="happy user" className="rounded-full mb-2"/>
            <CardTitle>Saved 10+ Hours Weekly on Content</CardTitle>
            <CardDescription>"The AI content generator is a lifesaver! I can now focus on strategy." - Mark S.</CardDescription>
          </CardHeader>
           <CardContent>
             <Image src="https://picsum.photos/400/200?grayscale&random=case2" alt="Case Study 2 Illustration" width={400} height={200} data-ai-hint="time saving" className="rounded-md"/>
          </CardContent>
        </Card>
      </div>
       <div className="text-center mt-12">
        <Button variant="default" size="lg" asChild className="bg-primary hover:bg-primary/90">
          <Link href="/case-studies">
            Explore More Case Studies <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  </section>
);

// Section 14: Trusted Partners & Ecosystem
const PartnersSection = () => (
  <section id="partners" className="py-16 md:py-24 bg-secondary">
    <div className="container mx-auto px-6 md:px-10 text-center">
      <Handshake className="h-12 w-12 text-primary mb-4 mx-auto" />
      <h2 className="text-3xl font-bold text-foreground mb-4">Our Trusted Partners & Ecosystem</h2>
      <p className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
        We collaborate with leading platforms and services to provide you with a seamless and powerful experience.
      </p>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
        {[...Array(5)].map((_, i) => (
          <Image key={i} src={`https://picsum.photos/150/80?grayscale&random=partner${i+1}`} alt={`Partner Logo ${i+1}`} width={150} height={80} data-ai-hint="company logo" className="opacity-70 hover:opacity-100 transition-opacity"/>
        ))}
      </div>
    </div>
  </section>
);

// Section 15: Robust Security & Reliability
const SecuritySection = () => (
  <section id="security" className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center gap-12">
      <div className="md:w-1/2">
        <ShieldCheck className="h-12 w-12 text-primary mb-4" />
        <h2 className="text-3xl font-bold text-foreground mb-4">Security You Can Trust</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Your data security and platform reliability are our top priorities. We employ industry-standard security measures and robust infrastructure to keep your information safe and EarnHub running smoothly.
        </p>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-center"><Lock className="h-5 w-5 text-accent mr-2" /> End-to-end data encryption</li>
          <li className="flex items-center"><Server className="h-5 w-5 text-accent mr-2" /> 99.9% uptime guarantee</li>
          <li className="flex items-center"><CheckSquare className="h-5 w-5 text-accent mr-2" /> Regular security audits</li>
        </ul>
      </div>
      <div className="md:w-1/2">
        <Image
          src="https://picsum.photos/500/350?grayscale&random=security"
          alt="Data Security"
          width={500}
          height={350}
          data-ai-hint="data security"
          className="rounded-xl shadow-xl"
        />
      </div>
    </div>
  </section>
);

// Section 16: Vibrant Community & Support
const CommunitySupportSection = () => (
  <section id="community-support" className="py-16 md:py-24 bg-secondary">
    <div className="container mx-auto px-6 md:px-10 text-center">
      <Users2 className="h-12 w-12 text-primary mb-4 mx-auto" />
      <h2 className="text-3xl font-bold text-foreground mb-4">Join Our Vibrant Community</h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
        Connect with fellow EarnHub users, share strategies, and get support from our active community and dedicated helpdesk. We're here to help you succeed.
      </p>
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="text-left shadow-md">
          <CardHeader><CardTitle className="flex items-center gap-2"><MessageCircle className="h-6 w-6 text-accent"/> Community Forum</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">Ask questions, share tips, and learn from others.</p></CardContent>
        </Card>
        <Card className="text-left shadow-md">
          <CardHeader><CardTitle className="flex items-center gap-2"><LifeBuoy className="h-6 w-6 text-accent"/> Dedicated Support</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">Our support team is ready to assist you with any queries.</p></CardContent>
        </Card>
         <Card className="text-left shadow-md">
          <CardHeader><CardTitle className="flex items-center gap-2"><ListChecks className="h-6 w-6 text-accent"/> Knowledge Base</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">Access tutorials, guides, and best practices.</p></CardContent>
        </Card>
      </div>
    </div>
  </section>
);

// Section 17: Our Vision & Mission
const VisionMissionSection = () => (
  <section id="vision-mission" className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-6 md:px-10 flex flex-col md:flex-row-reverse items-center gap-12">
       <div className="md:w-1/2">
        <Eye className="h-12 w-12 text-primary mb-4" />
        <h2 className="text-3xl font-bold text-foreground mb-4">Our Vision for the Future</h2>
        <p className="text-lg text-muted-foreground mb-3">
          <strong>Mission:</strong> To empower individuals and businesses to achieve financial independence through innovative and accessible online earning solutions.
        </p>
        <p className="text-lg text-muted-foreground mb-6">
          <strong>Vision:</strong> To be the leading global platform that democratizes online earning, fostering a world where anyone can build a sustainable income online.
        </p>
      </div>
      <div className="md:w-1/2">
         <Image
          src="https://picsum.photos/500/350?grayscale&random=vision"
          alt="Future Vision"
          width={500}
          height={350}
          data-ai-hint="future vision"
          className="rounded-xl shadow-xl"
        />
      </div>
    </div>
  </section>
);

// Section 18: Transparent Pricing / Get Started Free
const PricingSection = () => (
  <section id="pricing" className="py-16 md:py-24 bg-secondary">
    <div className="container mx-auto px-6 md:px-10 text-center">
      <Tag className="h-12 w-12 text-primary mb-4 mx-auto" />
      <h2 className="text-3xl font-bold text-foreground mb-4">Simple, Transparent Pricing</h2>
      <p className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
        Get started with EarnHub for free, and explore flexible plans that scale with your success. No hidden fees, just pure value.
      </p>
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="shadow-xl border-2 border-transparent hover:border-primary transition-all">
          <CardHeader className="bg-muted/50"><CardTitle>Free Tier</CardTitle><CardDescription>Perfect for getting started</CardDescription></CardHeader>
          <CardContent className="pt-6">
            <p className="text-4xl font-bold mb-4">$0<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-6 text-left">
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-2"/> Basic AI Tools</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-2"/> Limited Tracking</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-2"/> Community Access</li>
            </ul>
            <Button variant="outline" className="w-full">Sign Up for Free</Button>
          </CardContent>
        </Card>
         <Card className="shadow-xl border-2 border-primary relative">
           <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-full">Most Popular</div>
          <CardHeader><CardTitle>Pro Plan</CardTitle><CardDescription>For serious marketers</CardDescription></CardHeader>
          <CardContent className="pt-6">
            <p className="text-4xl font-bold mb-4">$29<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-6 text-left">
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-2"/> Advanced AI Suite</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-2"/> Full Analytics</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-2"/> Priority Support</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-2"/> More Integrations</li>
            </ul>
            <Button className="w-full bg-primary hover:bg-primary/90">Choose Pro</Button>
          </CardContent>
        </Card>
        <Card className="shadow-xl border-2 border-transparent hover:border-primary transition-all">
          <CardHeader className="bg-muted/50"><CardTitle>Enterprise</CardTitle><CardDescription>For large teams & agencies</CardDescription></CardHeader>
          <CardContent className="pt-6">
            <p className="text-4xl font-bold mb-4">Custom</p>
             <ul className="space-y-2 text-sm text-muted-foreground mb-6 text-left">
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-2"/> All Pro Features</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-2"/> Dedicated Account Manager</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-2"/> Custom Solutions</li>
            </ul>
            <Button variant="outline" className="w-full">Contact Sales</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

// Section 19: Frequently Asked Questions (FAQ)
const FAQSection = () => {
  const faqs = [
    {
      question: "What is EarnHub?",
      answer: "EarnHub is a comprehensive platform designed to help individuals and businesses monetize their online presence through affiliate marketing, AI-powered content creation, and product recommendations."
    },
    {
      question: "How does the AI product recommender work?",
      answer: "Our AI analyzes user profiles, interests, and market trends to suggest relevant and high-converting products for you to promote."
    },
    {
      question: "Is there a free trial or a free plan?",
      answer: "Yes, EarnHub offers a free tier with basic features to get you started. We also have premium plans with more advanced capabilities."
    },
    {
      question: "Can I integrate EarnHub with my existing tools?",
      answer: "Absolutely! EarnHub supports integration with various popular e-commerce platforms, social media channels, and marketing automation tools."
    },
    {
      question: "How secure is my data on EarnHub?",
      answer: "We take data security very seriously. EarnHub employs industry-standard encryption and security protocols to protect your information."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <HelpCircle className="h-12 w-12 text-primary mb-4 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            Got questions? We've got answers. If you don't find what you're looking for, feel free to contact us.
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

// Section 20: Final Call to Action (Join EarnHub Today)
const FinalCTASection = () => (
  <section id="join-today" className="py-16 md:py-24 bg-gradient-to-r from-primary to-accent">
    <div className="container mx-auto px-6 md:px-10 text-center">
      <UserPlus className="h-16 w-16 text-white mb-6 mx-auto" />
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Elevate Your Online Earnings?</h2>
      <p className="text-xl text-primary-foreground mb-10 max-w-3xl mx-auto">
        Join thousands of successful marketers, creators, and entrepreneurs who are already using EarnHub to achieve their financial goals. Sign up today and unlock your full potential.
      </p>
      <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-10 py-6">
        <Link href="/dashboard">
          Get Started with EarnHub <ArrowRightCircle className="ml-3 h-6 w-6" />
        </Link>
      </Button>
    </div>
  </section>
);


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-4 px-6 md:px-10 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-primary">
            Earn<span className="text-accent">Hub</span>
          </Link>
          <Button asChild variant="outline">
            <Link href="/dashboard">Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow">
        <HeroSection />
        <KeyFeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />

        {/* Added Sections */}
        <AdvancedAICapabilitiesSection />
        <MultiPlatformIntegrationSection />
        <CustomizableDashboardsSection />
        <DeepDiveAnalyticsSection />
        <VersatileContentGenerationSection />
        <ForAffiliateMarketersSection />
        <ForContentCreatorsSection />
        <ForEntrepreneursSection />
        <SuccessStoriesSection />
        <PartnersSection />
        <SecuritySection />
        <CommunitySupportSection />
        <VisionMissionSection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
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
