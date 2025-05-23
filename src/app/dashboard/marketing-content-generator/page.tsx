
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PenLine, Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { generateMarketingContent, type MarketingContentInput, type MarketingContentOutput } from '@/ai/flows/marketing-content-generator';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

const toneOptions = ['Professional', 'Casual', 'Enthusiastic', 'Humorous', 'Formal', 'Persuasive'];

const formSchema = z.object({
  itemNameOrCampaignTitle: z.string().min(3, 'Item/Campaign name must be at least 3 characters long.'),
  itemDescription: z.string().min(30, 'Item/Campaign description must be at least 30 characters long.'),
  targetAudience: z.string().min(10, 'Target audience description must be at least 10 characters long.'),
  keyFeaturesOrMessages: z.string().min(20, 'Key features/messages must be at least 20 characters long.'),
  tone: z.string().min(1, 'Please select a tone for the promotional content.'),
});

type ContentFormValues = z.infer<typeof formSchema>;

export default function MarketingContentGeneratorPage() {
  const [generatedContent, setGeneratedContent] = useState<MarketingContentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<ContentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemNameOrCampaignTitle: '',
      itemDescription: '',
      targetAudience: '',
      keyFeaturesOrMessages: '',
      tone: '',
    },
  });

  const onSubmit: SubmitHandler<ContentFormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);
    try {
      const result = await generateMarketingContent(data as MarketingContentInput);
      setGeneratedContent(result);
      toast({
        title: "Promotional Content Generated!",
        description: "AI has successfully created content for your promotion.",
      });
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errorMessage);
      toast({
        title: "Error Generating Promotional Content",
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
        title="AI Marketing Content Generator"
        description="Craft compelling promotional copy for your items or campaigns with the power of AI."
        icon={PenLine}
      />

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle>Promotion Details</CardTitle>
            <CardDescription>Provide details about your item/campaign to generate content.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="itemNameOrCampaignTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Name / Campaign Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., QuantumLeap X1 Bicycle, Summer Sale Campaign" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="itemDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item / Campaign Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your item/campaign in detail. What it is, what it does, why it's special..."
                          className="min-h-[120px] resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="targetAudience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Audience</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Tech-savvy millennials, busy parents" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="keyFeaturesOrMessages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Key Features / Messages</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List 3-5 key features or campaign messages. e.g., Ultra-lightweight, 20-hour battery, Boosts conversion by 50%"
                          className="min-h-[100px] resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Desired Tone</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a tone" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {toneOptions.map(tone => (
                            <SelectItem key={tone} value={tone}>{tone}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Generate Content
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          {isLoading && (
            <Card className="shadow-lg flex flex-col items-center justify-center h-full min-h-[400px]">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-lg text-muted-foreground">Generating content...</p>
            </Card>
          )}
          {error && !isLoading && (
             <Card className="shadow-lg border-destructive">
              <CardHeader className="flex-row items-center gap-2">
                 <AlertTriangle className="h-6 w-6 text-destructive" />
                <CardTitle className="text-destructive">Failed to Generate Content</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-destructive-foreground">{error}</p>
                <Button variant="outline" onClick={() => form.handleSubmit(onSubmit)()} className="mt-4">
                    Try Again
                  </Button>
              </CardContent>
            </Card>
          )}
          {generatedContent && !isLoading && !error && (
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Generated Headline</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-auto max-h-[100px] w-full pr-4">
                    <h2 className="text-2xl font-semibold text-primary">{generatedContent.headline}</h2>
                  </ScrollArea>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Generated Body</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-auto max-h-[300px] w-full pr-4">
                    <p className="text-foreground whitespace-pre-wrap">{generatedContent.body}</p>
                  </ScrollArea>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Generated Call to Action</CardTitle>
                </CardHeader>
                <CardContent>
                   <ScrollArea className="h-auto max-h-[100px] w-full pr-4">
                    <p className="text-lg font-medium text-accent">{generatedContent.callToAction}</p>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          )}
           {!isLoading && !error && !generatedContent && (
             <Card className="shadow-lg flex flex-col items-center justify-center h-full min-h-[400px] bg-secondary/50">
              <PenLine className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">Your generated content will appear here.</p>
              <p className="text-sm text-muted-foreground text-center mt-1">Fill out the form and click "Generate Content".</p>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}

