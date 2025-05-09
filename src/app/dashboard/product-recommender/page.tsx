
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Lightbulb, Loader2, AlertTriangle, ShoppingCart, Info } from 'lucide-react';
import { generateProductRecommendation, type ProductRecommendationInput, type ProductRecommendationOutput } from '@/ai/flows/product-recommendation';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

const formSchema = z.object({
  userProfile: z.string().min(50, 'Target audience profile must be at least 50 characters long.'),
  interests: z.string().min(10, 'Target audience interests must be at least 10 characters long.'),
});

type RecommendationFormValues = z.infer<typeof formSchema>;

export default function ProductRecommenderPage() {
  const [recommendations, setRecommendations] = useState<ProductRecommendationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<RecommendationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userProfile: '',
      interests: '',
    },
  });

  const onSubmit: SubmitHandler<RecommendationFormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);
    try {
      const result = await generateProductRecommendation(data as ProductRecommendationInput);
      setRecommendations(result);
      toast({
        title: "Promotional Item Recommendations Generated!",
        description: "AI has successfully suggested items for your promotion.",
      });
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errorMessage);
      toast({
        title: "Error Generating Recommendations",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="AI Promotional Item Recommender"
        description="Let AI suggest the best promotional items (products, services, campaigns) based on target audience profiles and interests."
        icon={Lightbulb}
      />

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle>Provide Target Audience Details</CardTitle>
            <CardDescription>Enter the audience's profile and interests to get tailored promotional item recommendations.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="userProfile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Audience Profile</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., A 30-year-old male, loves hiking and photography, works as a software developer, shops online for tech gadgets and outdoor gear..."
                          className="min-h-[150px] resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Audience Interests</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Sustainable living, DIY projects, gourmet cooking, artificial intelligence, travel blogging, digital marketing tools"
                          className="min-h-[100px] resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Lightbulb className="mr-2 h-4 w-4" />
                  )}
                  Get Promotional Recommendations
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          {isLoading && (
            <Card className="shadow-lg flex flex-col items-center justify-center h-full min-h-[300px]">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-lg text-muted-foreground">Generating recommendations...</p>
            </Card>
          )}
          {error && !isLoading && (
             <Card className="shadow-lg border-destructive">
              <CardHeader className="flex-row items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-destructive" />
                <CardTitle className="text-destructive">Failed to Generate Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-destructive-foreground">{error}</p>
                 <Button variant="outline" onClick={() => form.handleSubmit(onSubmit)()} className="mt-4">
                    Try Again
                  </Button>
              </CardContent>
            </Card>
          )}
          {recommendations && !isLoading && !error && (
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>AI Recommended Promotional Items</CardTitle>
                  <CardDescription>Here are the items AI suggests for promotion.</CardDescription>
                </CardHeader>
                <CardContent>
                  {recommendations.recommendations && recommendations.recommendations.length > 0 ? (
                    <ScrollArea className="h-auto max-h-[400px] w-full pr-4">
                      <div className="space-y-4">
                        {recommendations.recommendations.map((item, index) => (
                          <Card key={index} className="bg-muted/30 p-4">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <ShoppingCart className="h-5 w-5 text-primary" />
                              {item.name}
                            </CardTitle>
                            <CardDescription className="mt-1 text-xs">
                              <span className="font-semibold text-foreground">{item.brandName}</span> - {item.itemType}
                            </CardDescription>
                            <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                            <p className="text-sm font-semibold text-accent mt-2">
                              Potential Commission: {item.commissionRate?.toFixed(1)}%
                            </p>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  ) : (
                    <p className="text-muted-foreground">No specific recommendations generated. Try refining your input.</p>
                  )}
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Info className="h-5 w-5 text-primary"/>Reasoning</CardTitle>
                  <CardDescription>The rationale behind AI's suggestions.</CardDescription>
                </CardHeader>
                <CardContent>
                   <ScrollArea className="h-auto max-h-[150px] w-full pr-4">
                    <p className="text-muted-foreground whitespace-pre-wrap">{recommendations.reasoning}</p>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          )}
          {!isLoading && !error && !recommendations && (
             <Card className="shadow-lg flex flex-col items-center justify-center h-full min-h-[300px] bg-secondary/50">
              <Lightbulb className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">Your promotional item recommendations will appear here.</p>
              <p className="text-sm text-muted-foreground text-center mt-1">Fill out the form and click "Get Recommendations".</p>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
