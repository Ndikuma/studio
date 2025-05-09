
'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MapPin, Send, Info, MessageSquare, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(1, { message: "Please select a subject." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const subjectOptions = [
  { value: "general_inquiry", label: "General Inquiry" },
  { value: "promo_tool_support", label: "Promo Tool Support" },
  { value: "billing_question", label: "Billing Question" },
  { value: "feedback", label: "Feedback & Suggestions" },
  { value: "partnership", label: "Partnership Opportunities" },
];

export default function ClientContactPage() {
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    console.log(data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting PromoMarket. We'll get back to you soon.",
    });
    form.reset();
  };

  return (
    <div className="space-y-12">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Get in Touch with PromoMarket
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          We're here to help and answer any question you might have about our promotional tools and services. We look forward to hearing from you!
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><MessageSquare className="h-6 w-6 text-primary" /> Send Us a Message</CardTitle>
            <CardDescription>Fill out the form below and our team will get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {subjectOptions.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your message about PromoMarket..." className="min-h-[120px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Sending...' : <><Send className="mr-2 h-4 w-4" /> Send Message</>}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Info className="h-6 w-6 text-primary" /> Contact Information</CardTitle>
              <CardDescription>You can also reach PromoMarket through the following channels.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
                <div>
                  <h4 className="font-medium text-foreground">Email</h4>
                  <a href="mailto:support@promomarket.com" className="text-primary hover:underline">support@promomarket.com</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
                <div>
                  <h4 className="font-medium text-foreground">Phone</h4>
                  <a href="tel:+1234567890" className="text-primary hover:underline">+1 (234) 567-890</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
                <div>
                  <h4 className="font-medium text-foreground">Office Address</h4>
                  <p className="text-muted-foreground">123 PromoMarket Street, Suite 404, Online City, World</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl overflow-hidden">
            <CardHeader>
               <CardTitle className="flex items-center gap-2"><Building className="h-6 w-6 text-primary" /> Our Location</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-video bg-muted flex items-center justify-center">
                 <Image 
                    src="https://picsum.photos/seed/maplocation/600/300" 
                    alt="Map placeholder for PromoMarket" 
                    width={600} 
                    height={300} 
                    className="w-full h-full object-cover"
                    data-ai-hint="map location"
                  />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
