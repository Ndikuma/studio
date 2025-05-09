
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
// import { useTheme } from 'next-themes'; // Not strictly needed if directly managing localStorage and DOM class for next-themes

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
  const [isLoading, setIsLoading] = useState(true); // Keep for initial setup, but no async data fetching
  const [isSaving, setIsSaving] = useState(false);
  // const { setTheme } = useTheme(); // Can be used as an alternative to direct localStorage/DOM manipulation

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      fullName: '',
      email: '',
      emailNotifications: true,
      pushNotifications: false,
      weeklySummary: true,
      darkMode: false, // Initial default, will be overridden by localStorage or system preference
    },
  });

  useEffect(() => {
    // Load dark mode preference from localStorage or system
    // Other settings will use RHF defaultValues as they are no longer persistent
    setIsLoading(true);
    
    let determinedDarkModeForSwitch = false;
    const currentThemeInLocalStorage = localStorage.getItem('theme');
    
    if (currentThemeInLocalStorage === 'dark') {
      determinedDarkModeForSwitch = true;
    } else if (currentThemeInLocalStorage === 'light') {
      determinedDarkModeForSwitch = false;
    } else {
      // Fallback if localStorage.getItem('theme') is null (e.g. ThemeProvider used system & set it)
      // or next-themes hasn't hydrated/set it yet. Check system preference.
      determinedDarkModeForSwitch = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
      // Ensure localStorage is set so next-themes picks it up consistently.
      localStorage.setItem('theme', determinedDarkModeForSwitch ? 'dark' : 'light');
    }
    
    form.setValue('darkMode', determinedDarkModeForSwitch, { shouldDirty: false });

    // Ensure DOM matches, though next-themes should handle this if localStorage was just set.
    if (determinedDarkModeForSwitch) {
        if (!document.documentElement.classList.contains('dark')) document.documentElement.classList.add('dark');
    } else {
        if (document.documentElement.classList.contains('dark')) document.documentElement.classList.remove('dark');
    }
    
    setIsLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]); 


  const onSubmit: SubmitHandler<SettingsFormValues> = async (data) => {
    setIsSaving(true);
    try {
      // Simulate saving
      await new Promise(resolve => setTimeout(resolve, 500));

      toast({
        title: "Settings Saved",
        description: "Your preferences have been updated locally.",
      });
      
      // Ensure localStorage theme and DOM is synced with saved dark mode preference
      const themeToApply = data.darkMode ? 'dark' : 'light';
      localStorage.setItem('theme', themeToApply);
      // setTheme(themeToApply); // Alternative using useTheme()
      if (data.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (err) {
      // This catch block is less likely to be hit without backend calls,
      // but kept for robustness in case of future local saving logic errors.
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

  if (isLoading) { // This loading state is very brief now
    return (
      <>
        <PageHeader
          title="Settings"
          description="Manage your account settings and preferences."
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
        title="Settings"
        description="Manage your account settings and preferences."
        icon={SettingsIcon}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-1">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><User className="h-5 w-5 text-primary" /> Profile</CardTitle>
                  <CardDescription>Update your personal information.</CardDescription>
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
                  <CardDescription>Manage your notification preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Email Notifications</FormLabel>
                          <CardDescription>Receive important updates via email.</CardDescription>
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
                          <CardDescription>Get real-time alerts in your browser (if supported).</CardDescription>
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
                           <CardDescription>Receive a summary of your earnings and activities.</CardDescription>
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
                  <CardDescription>Customize the look and feel of the dashboard.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="darkMode"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Dark Mode</FormLabel>
                           <CardDescription>Toggle between light and dark themes.</CardDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked); // Update form state (RHF)
                              const themeToSet = checked ? 'dark' : 'light';
                              localStorage.setItem('theme', themeToSet); // Update localStorage for next-themes
                              // setTheme(themeToSet); // Alternative using useTheme()
                              // Directly update DOM for immediate visual feedback
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
