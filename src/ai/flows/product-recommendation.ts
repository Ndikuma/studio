
// ProductRecommendation flow implementation.
'use server';

/**
 * @fileOverview AI-powered tool to suggest the best promotional items based on user profiles and interests.
 *
 * - generateProductRecommendation - A function that handles the promotional item recommendation process.
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

const RecommendedItemSchema = z.object({
  name: z.string().describe("The name of the promotional item."),
  description: z.string().describe("A brief description of the promotional item."),
  brandName: z.string().describe("The brand of the promotional item."),
  itemType: z.string().describe("The type of promotional item (e.g., PRODUCT, DIGITAL, SERVICE, CAMPAIGN)."),
  commissionRate: z.number().describe("The commission rate for promoting this item (as a percentage, e.g., 10.5 for 10.5%).")
});

const ProductRecommendationOutputSchema = z.object({
  recommendations: z
    .array(RecommendedItemSchema)
    .describe('A list of promotional item recommendations based on the user profile and interests.'),
  reasoning: z.string().describe('The reasoning behind the promotional item recommendations.'),
});
export type ProductRecommendationOutput = z.infer<typeof ProductRecommendationOutputSchema>;

export async function generateProductRecommendation(input: ProductRecommendationInput): Promise<ProductRecommendationOutput> {
  return productRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productRecommendationPrompt',
  input: {schema: ProductRecommendationInputSchema},
  output: {schema: ProductRecommendationOutputSchema},
  prompt: `You are an AI expert in recommending promotional items (products, services, or campaigns).
  Based on the user profile and interests, provide a list of 3-5 promotional item recommendations.
  For each item, include its name, a brief description, the brand name, item type, and potential commission rate (as a number, e.g., 10 or 15.5 for percent).

  User Profile: {{{userProfile}}}
  Interests: {{{interests}}}

  Respond with a JSON object matching the output schema. Ensure commissionRate is a number.
  Example for one recommendation:
  {
    "name": "Example Product X",
    "description": "A fantastic product for tech enthusiasts.",
    "brandName": "TechBrand Corp.",
    "itemType": "PRODUCT",
    "commissionRate": 12.0
  }
  `,
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
