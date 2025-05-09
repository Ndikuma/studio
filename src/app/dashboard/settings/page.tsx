'use client';

import { useEffect, useState } from 'react';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Settings as SettingsIcon, User, Bell, Palette, Loader2, AlertTriangle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const SETTINGS_COLLECTION = 'user_settings';
const USER_SETTINGS_DOC_ID = 'main_user_profile'; // Using a fixed ID for demo purposes

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
  const [error, setError] = useState<string | null>(null);

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
    const loadSettings = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const docRef = doc(db, SETTINGS_COLLECTION, USER_SETTINGS_DOC_ID);
        const docSnap = await getDoc(docRef);

        let initialDarkMode = false;
        const storedTheme = localStorage.getItem('theme');

        if (docSnap.exists()) {
          const data = docSnap.data() as SettingsFormValues;
          form.reset(data);
          initialDarkMode = data.darkMode;
           if (storedTheme && storedTheme !== (data.darkMode ? 'dark' : 'light')) {
            // Firestore has a theme, but localStorage is different or not yet aligned
            // We prioritize Firestore's setting on initial load here if they differ
            localStorage.setItem('theme', data.darkMode ? 'dark' : 'light');
          }
        } else if (storedTheme) {
            initialDarkMode = storedTheme === 'dark';
            form.setValue('darkMode', initialDarkMode);
        } else {
          // No settings in Firestore, no theme in localStorage
          // Check system preference for dark mode
          if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            initialDarkMode = true;
          }
          form.setValue('darkMode', initialDarkMode);
          localStorage.setItem('theme', initialDarkMode ? 'dark' : 'light');
        }
        
        // Apply initial theme
        if (initialDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }

      } catch (err) {
        console.error("Failed to load settings:", err);
        setError("Failed to load settings. Please try again later.");
        toast({
          title: "Error",
          description: "Could not load your settings.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    loadSettings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.reset, toast]);


  const onSubmit: SubmitHandler<SettingsFormValues> = async (data) => {
    setIsSaving(true);
    setError(null);
    try {
      const docRef = doc(db, SETTINGS_COLLECTION, USER_SETTINGS_DOC_ID);
      await setDoc(docRef, data, { merge: true });
      toast({
        title: "Settings Saved",
        description: "Your preferences have been updated successfully.",
      });
      // Ensure localStorage theme is synced with saved dark mode preference
      localStorage.setItem('theme', data.darkMode ? 'dark' : 'light');
      if (data.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (err) {
      console.error("Failed to save settings:", err);
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred while saving.";
      setError(errorMessage);
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
  
  if (error && !isLoading) {
      return (
         <>
            <PageHeader
              title="Settings"
              description="Manage your account settings and preferences."
              icon={SettingsIcon}
            />
            <Card className="shadow-lg border-destructive">
              <CardHeader className="flex-row items-center gap-2">
                 <AlertTriangle className="h-6 w-6 text-destructive" />
                <CardTitle className="text-destructive">Failed to Load Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-destructive-foreground">{error}</p>
                <Button variant="outline" onClick={() => window.location.reload()} className="mt-4">
                    Try Again
                </Button>
              </CardContent>
            </Card>
        </>
      )
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
                              field.onChange(checked); // Update form state
                              if (checked) {
                                document.documentElement.classList.add('dark');
                                localStorage.setItem('theme', 'dark');
                              } else {
                                document.documentElement.classList.remove('dark');
                                localStorage.setItem('theme', 'light');
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
