
'use client';

import { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Settings as SettingsIcon, User, Bell, Palette, Loader2, AlertTriangle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const settingsSchema = z.object({
  fullName: z.string().min(1, 'Full name is required.'),
  email: z.string().email('Invalid email address.'),
  emailNotifications: z.boolean().default(false),
  pushNotifications: z.boolean().default(false),
  weeklySummary: z.boolean().default(false),
  darkMode: z.boolean().default(false),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true); 
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      fullName: '',
      email: '',
      emailNotifications: true,
      pushNotifications: false,
      weeklySummary: true,
      darkMode: false, 
    },
  });

  useEffect(() => {
    setIsLoading(true);
    
    let determinedDarkModeForSwitch = false;
    const currentThemeInLocalStorage = localStorage.getItem('theme');
    
    if (currentThemeInLocalStorage === 'dark') {
      determinedDarkModeForSwitch = true;
    } else if (currentThemeInLocalStorage === 'light') {
      determinedDarkModeForSwitch = false;
    } else {
      determinedDarkModeForSwitch = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
      localStorage.setItem('theme', determinedDarkModeForSwitch ? 'dark' : 'light');
    }
    
    form.setValue('darkMode', determinedDarkModeForSwitch, { shouldDirty: false });

    if (determinedDarkModeForSwitch) {
        if (!document.documentElement.classList.contains('dark')) document.documentElement.classList.add('dark');
    } else {
        if (document.documentElement.classList.contains('dark')) document.documentElement.classList.remove('dark');
    }
    
    // Simulate loading user data if this were a real app
    // For now, just set some defaults after 'loading'
    form.setValue('fullName', 'Demo User');
    form.setValue('email', 'demo@promomarket.com');

    setIsLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]); 


  const onSubmit: SubmitHandler<SettingsFormValues> = async (data) => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      toast({
        title: "Settings Saved",
        description: "Your PromoMarket preferences have been updated locally.",
      });
      
      const themeToApply = data.darkMode ? 'dark' : 'light';
      localStorage.setItem('theme', themeToApply);
      if (data.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (err) {
      console.error("Failed to save settings locally:", err);
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred while saving.";
      toast({
        title: "Error Saving Settings",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) { 
    return (
      <>
        <PageHeader
          title="Settings - PromoMarket"
          description="Manage your PromoMarket account settings and preferences."
          icon={SettingsIcon}
        />
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </>
    );
  }
  
  return (
    <>
      <PageHeader
        title="Settings - PromoMarket"
        description="Manage your PromoMarket account settings and preferences."
        icon={SettingsIcon}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-1">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><User className="h-5 w-5 text-primary" /> Profile</CardTitle>
                  <CardDescription>Update your personal information for PromoMarket.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="fullName">Full Name</FormLabel>
                        <FormControl>
                          <Input id="fullName" {...field} />
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
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                          <Input id="email" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2 space-y-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5 text-primary" /> Notifications</CardTitle>
                  <CardDescription>Manage your PromoMarket notification preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Email Notifications</FormLabel>
                          <CardDescription>Receive important promotional updates via email.</CardDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pushNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Push Notifications</FormLabel>
                          <CardDescription>Get real-time alerts for your promotions (if supported).</CardDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="weeklySummary"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Weekly Summary</FormLabel>
                           <CardDescription>Receive a summary of your promotional earnings and activities.</CardDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Palette className="h-5 w-5 text-primary" /> Appearance</CardTitle>
                  <CardDescription>Customize the look and feel of the PromoMarket dashboard.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="darkMode"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Dark Mode</FormLabel>
                           <CardDescription>Toggle between light and dark themes for PromoMarket.</CardDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked); 
                              const themeToSet = checked ? 'dark' : 'light';
                              localStorage.setItem('theme', themeToSet);
                              if (checked) {
                                document.documentElement.classList.add('dark');
                              } else {
                                document.documentElement.classList.remove('dark');
                              }
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isSaving || isLoading} className="min-w-[150px]">
              {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Save Settings
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
