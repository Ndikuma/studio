
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ShoppingBag, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const featuredProducts = [
  {
    id: 'prod1',
    name: 'Eco-Friendly Water Bottle',
    description: 'Stay hydrated with our stylish and sustainable water bottle.',
    price: '$25.00',
    imageUrl: 'https://picsum.photos/seed/product1/300/200',
    dataAiHint: 'water bottle'
  },
  {
    id: 'prod2',
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Immerse yourself in sound with these premium headphones.',
    price: '$149.00',
    imageUrl: 'https://picsum.photos/seed/product2/300/200',
    dataAiHint: 'headphones audio'
  },
  {
    id: 'prod3',
    name: 'Smart Home Assistant',
    description: 'Control your home with voice commands. Makes life easier.',
    price: '$99.00',
    imageUrl: 'https://picsum.photos/seed/product3/300/200',
    dataAiHint: 'smart speaker'
  },
];

export default function ClientHomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-10 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg shadow-sm">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Welcome to EarnHub!
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
          Discover amazing products, track your interests, and enjoy a seamless shopping experience.
          We're glad to have you here.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button size="lg" asChild>
            <Link href="/client/products">
              Browse Products <ShoppingBag className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/client/profile">
              Your Profile <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground mb-8 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={300}
                height={200}
                data-ai-hint={product.dataAiHint}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-xl">{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{product.description}</CardDescription>
                <p className="mt-4 text-lg font-semibold text-primary">{product.price}</p>
              </CardContent>
              <div className="p-6 pt-0">
                <Button className="w-full">
                  View Product <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-secondary p-8 rounded-lg shadow-sm">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground mb-4">
              Why Shop With Us?
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center">
                <Star className="h-5 w-5 text-accent mr-2" />
                Curated selection of high-quality products.
              </li>
              <li className="flex items-center">
                <Star className="h-5 w-5 text-accent mr-2" />
                Secure and easy checkout process.
              </li>
              <li className="flex items-center">
                <Star className="h-5 w-5 text-accent mr-2" />
                Fast shipping and reliable customer support.
              </li>
               <li className="flex items-center">
                <Star className="h-5 w-5 text-accent mr-2" />
                Personalized recommendations just for you.
              </li>
            </ul>
            <Button className="mt-6" asChild>
              <Link href="/client/contact">Learn More</Link>
            </Button>
          </div>
          <div>
            <Image
              src="https://picsum.photos/seed/shop/500/350"
              alt="Happy Shopper"
              width={500}
              height={350}
              data-ai-hint="happy shopping"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
