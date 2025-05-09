
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Lightbulb, Loader2, AlertTriangle } from 'lucide-react';
import { generateProductRecommendation, type ProductRecommendationInput, type ProductRecommendationOutput } from '@/ai/flows/product-recommendation';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

const formSchema = z.object({
  userProfile: z.string().min(50, 'User profile description must be at least 50 characters long.'),
  interests: z.string().min(10, 'User interests must be at least 10 characters long.'),
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
        title: "Promotional Recommendations Generated!",
        description: "AI has successfully suggested products/services for your promotion.",
      });
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errorMessage);
      toast({
        title: "Error Generating Promotional Recommendations",
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
        title="AI Promotion Recommender - PromoMarket"
        description="Let AI suggest the best products, services, and affiliate programs for your promotional campaigns based on user profiles and interests."
        icon={Lightbulb}
      />

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle>Provide Target Audience Details</CardTitle>
            <CardDescription>Enter the target audience's profile and interests to get tailored promotional recommendations.</CardDescription>
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
              <p className="text-lg text-muted-foreground">Generating promotional recommendations...</p>
            </Card>
          )}
          {error && !isLoading && (
             <Card className="shadow-lg border-destructive">
              <CardHeader className="flex-row items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-destructive" />
                <CardTitle className="text-destructive">Failed to Generate Promotional Recommendations</CardTitle>
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
                  <CardTitle>AI Recommended Products/Services for Promotion</CardTitle>
                  <CardDescription>Here are the items AI suggests for promotion based on the provided details.</CardDescription>
                </CardHeader>
                <CardContent>
                  {recommendations.productRecommendations && recommendations.productRecommendations.length > 0 ? (
                    <ScrollArea className="h-[200px] w-full pr-4">
                      <ul className="space-y-2 list-disc list-inside">
                        {recommendations.productRecommendations.map((product, index) => (
                          <li key={index} className="text-foreground">{product}</li>
                        ))}
                      </ul>
                    </ScrollArea>
                  ) : (
                    <p className="text-muted-foreground">No specific promotional recommendations generated. Try refining your input.</p>
                  )}
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Reasoning for Promotion</CardTitle>
                  <CardDescription>The rationale behind AI's promotional suggestions.</CardDescription>
                </CardHeader>
                <CardContent>
                   <ScrollArea className="h-[150px] w-full pr-4">
                    <p className="text-muted-foreground whitespace-pre-wrap">{recommendations.reasoning}</p>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          )}
          {!isLoading && !error && !recommendations && (
             <Card className="shadow-lg flex flex-col items-center justify-center h-full min-h-[300px] bg-secondary/50">
              <Lightbulb className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">Your promotional recommendations will appear here.</p>
              <p className="text-sm text-muted-foreground text-center mt-1">Fill out the form and click "Get Promotional Recommendations".</p>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
