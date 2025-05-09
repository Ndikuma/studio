// src/ai/flows/marketing-content-generator.ts
'use server';

/**
 * @fileOverview AI-powered marketing content generator for product promotion.
 *
 * - generateMarketingContent - A function to generate marketing content based on product information.
 * - MarketingContentInput - The input type for the generateMarketingContent function.
 * - MarketingContentOutput - The return type for the generateMarketingContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MarketingContentInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  productDescription: z.string().describe('A detailed description of the product.'),
  targetAudience: z.string().describe('The target audience for the product.'),
  keyFeatures: z.string().describe('Key features and benefits of the product.'),
  tone: z.string().describe('The desired tone of the marketing content (e.g., professional, funny, serious).'),
});
export type MarketingContentInput = z.infer<typeof MarketingContentInputSchema>;

const MarketingContentOutputSchema = z.object({
  headline: z.string().describe('A catchy headline for the marketing content.'),
  body: z.string().describe('The main body of the marketing content.'),
  callToAction: z.string().describe('A clear call to action for the marketing content.'),
});
export type MarketingContentOutput = z.infer<typeof MarketingContentOutputSchema>;

export async function generateMarketingContent(
  input: MarketingContentInput
): Promise<MarketingContentOutput> {
  return marketingContentGeneratorFlow(input);
}

const marketingContentPrompt = ai.definePrompt({
  name: 'marketingContentPrompt',
  input: {schema: MarketingContentInputSchema},
  output: {schema: MarketingContentOutputSchema},
  prompt: `You are an expert marketing copywriter. Generate compelling marketing content for the following product, tailored to the specified target audience and tone.

Product Name: {{{productName}}}
Product Description: {{{productDescription}}}
Target Audience: {{{targetAudience}}}
Key Features: {{{keyFeatures}}}
Tone: {{{tone}}}

Generate a catchy headline, an engaging body, and a clear call to action.

Headline:
{{headline}}

Body:
{{body}}

Call to Action:
{{callToAction}}`,
});

const marketingContentGeneratorFlow = ai.defineFlow(
  {
    name: 'marketingContentGeneratorFlow',
    inputSchema: MarketingContentInputSchema,
    outputSchema: MarketingContentOutputSchema,
  },
  async input => {
    const {output} = await marketingContentPrompt(input);
    return output!;
  }
);
