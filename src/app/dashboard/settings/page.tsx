'use client';

import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Settings as SettingsIcon, User, Bell, CreditCard, Palette } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Manage your account settings and preferences."
        icon={SettingsIcon}
      />

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><User className="h-5 w-5 text-primary" /> Profile</CardTitle>
              <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" defaultValue="Demo User" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="demo@earnhub.com" />
              </div>
              <Button className="w-full">Save Profile</Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5 text-primary" /> Notifications</CardTitle>
              <CardDescription>Manage your notification preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="emailNotifications" className="flex flex-col space-y-1">
                  <span>Email Notifications</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Receive important updates via email.
                  </span>
                </Label>
                <Switch id="emailNotifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="pushNotifications" className="flex flex-col space-y-1">
                  <span>Push Notifications</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Get real-time alerts in your browser (if supported).
                  </span>
                </Label>
                <Switch id="pushNotifications" />
              </div>
               <div className="flex items-center justify-between">
                <Label htmlFor="weeklySummary" className="flex flex-col space-y-1">
                  <span>Weekly Summary</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Receive a summary of your earnings and activities.
                  </span>
                </Label>
                <Switch id="weeklySummary" defaultChecked />
              </div>
              <Button className="w-full md:w-auto">Save Notification Settings</Button>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Palette className="h-5 w-5 text-primary" /> Appearance</CardTitle>
              <CardDescription>Customize the look and feel of the dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between">
                <Label htmlFor="darkMode" className="flex flex-col space-y-1">
                  <span>Dark Mode</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Toggle between light and dark themes.
                  </span>
                </Label>
                <Switch id="darkMode" onCheckedChange={(checked) => {
                  if (checked) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                }} />
              </div>
            </CardContent>
          </Card>

          {/* Placeholder for Billing Information */}
          {/* <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5 text-primary" /> Billing</CardTitle>
              <CardDescription>Manage your subscription and payment methods.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Billing settings coming soon.</p>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </>
  );
}
