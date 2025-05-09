// ProductRecommendation flow implementation.
'use server';

/**
 * @fileOverview AI-powered tool to suggest the best products and affiliate programs based on user profiles and interests.
 *
 * - generateProductRecommendation - A function that handles the product recommendation process.
 * - ProductRecommendationInput - The input type for the generateProductRecommendation function.
 * - ProductRecommendationOutput - The return type for the generateProductRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationInputSchema = z.object({
  userProfile: z
    .string()
    .describe('A detailed profile of the user, including their interests, purchase history, and demographic information.'),
  interests: z.string().describe('The interests of the user'),
});
export type ProductRecommendationInput = z.infer<typeof ProductRecommendationInputSchema>;

const ProductRecommendationOutputSchema = z.object({
  productRecommendations: z
    .array(z.string())
    .describe('A list of product recommendations based on the user profile and interests.'),
  reasoning: z.string().describe('The reasoning behind the product recommendations.'),
});
export type ProductRecommendationOutput = z.infer<typeof ProductRecommendationOutputSchema>;

export async function generateProductRecommendation(input: ProductRecommendationInput): Promise<ProductRecommendationOutput> {
  return productRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productRecommendationPrompt',
  input: {schema: ProductRecommendationInputSchema},
  output: {schema: ProductRecommendationOutputSchema},
  prompt: `You are an AI product recommendation expert.

  Based on the user profile and interests, provide a list of product recommendations and the reasoning behind them.

  User Profile: {{{userProfile}}}
  Interests: {{{interests}}}

  Format your response as a JSON object:
  {
    "productRecommendations": ["product1", "product2", "product3"],
    "reasoning": "The reasoning behind the product recommendations."
  }`,
});

const productRecommendationFlow = ai.defineFlow(
  {
    name: 'productRecommendationFlow',
    inputSchema: ProductRecommendationInputSchema,
    outputSchema: ProductRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
