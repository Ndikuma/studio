
'use client';

import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Phone, MapPin, Edit3, Save, Settings, LogOut, ShieldCheck, Share2, PlusCircle, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const socialPlatformOptions = ["TWITTER", "INSTAGRAM", "YOUTUBE", "TIKTOK", "FACEBOOK", "LINKEDIN"];

const socialProfileSchema = z.object({
  id: z.string().optional(),
  platform: z.enum(socialPlatformOptions as [string, ...string[]]),
  profileUrl: z.string().url("Invalid URL format."),
  followersCount: z.coerce.number().min(0).optional().default(0),
});

const profileSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().optional(),
  addressLine1: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  socialProfiles: z.array(socialProfileSchema).optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type SocialProfileFormValues = z.infer<typeof socialProfileSchema>;


export default function ClientProfilePage() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: 'John Q. Promoter',
      email: 'john.promoter@example.com',
      phone: '555-010-PROMO',
      addressLine1: '456 Market St',
      city: 'Clientville',
      postalCode: '67890',
      country: 'USA',
      socialProfiles: [
        { platform: "TWITTER", profileUrl: "https://twitter.com/johnpromoter", followersCount: 1200 },
        { platform: "YOUTUBE", profileUrl: "https://youtube.com/c/johnpromoter", followersCount: 5800 },
      ]
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "socialProfiles",
  });

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    console.log(data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-xl">
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://picsum.photos/seed/promoter_avatar/100/100" alt="User Avatar" data-ai-hint="professional avatar" />
              <AvatarFallback>{form.getValues('fullName')?.substring(0,2).toUpperCase() || 'UP'}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl">{form.getValues('fullName')}</CardTitle>
              <CardDescription className="text-md">{form.getValues('email')}</CardDescription>
            </div>
          </div>
          <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "destructive" : "outline"}>
            {isEditing ? 'Cancel Edit' : <><Edit3 className="mr-2 h-4 w-4" /> Edit Profile</>}
          </Button>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><User className="h-5 w-5 text-primary"/> Personal Information</CardTitle>
                  <CardDescription>Manage your personal details and contact information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField control={form.control} name="fullName" render={({ field }) => (
                        <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} disabled={!isEditing} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" {...field} disabled={!isEditing} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input {...field} disabled={!isEditing} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <Separator />
                  <h3 className="text-lg font-medium text-foreground flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> Address (Optional)</h3>
                   <FormField control={form.control} name="addressLine1" render={({ field }) => (
                      <FormItem><FormLabel>Address Line 1</FormLabel><FormControl><Input {...field} disabled={!isEditing} /></FormControl><FormMessage /></FormItem>
                    )} />
                  <div className="grid sm:grid-cols-3 gap-6">
                    <FormField control={form.control} name="city" render={({ field }) => (
                        <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} disabled={!isEditing} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="postalCode" render={({ field }) => (
                        <FormItem><FormLabel>Postal Code</FormLabel><FormControl><Input {...field} disabled={!isEditing} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="country" render={({ field }) => (
                        <FormItem><FormLabel>Country</FormLabel><FormControl><Input {...field} disabled={!isEditing} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Share2 className="h-5 w-5 text-primary"/> Social Media Profiles</CardTitle>
                  <CardDescription>Manage your linked social media accounts for promotion.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {fields.map((field, index) => (
                    <Card key={field.id} className="p-4 bg-muted/50">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
                        <FormField control={form.control} name={`socialProfiles.${index}.platform`} render={({ field: platformField }) => (
                            <FormItem><FormLabel>Platform</FormLabel>
                              <Select onValueChange={platformField.onChange} defaultValue={platformField.value} disabled={!isEditing}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select Platform" /></SelectTrigger></FormControl>
                                <SelectContent>
                                  {socialPlatformOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                                </SelectContent>
                              </Select><FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField control={form.control} name={`socialProfiles.${index}.profileUrl`} render={({ field: urlField }) => (
                            <FormItem className="md:col-span-2"><FormLabel>Profile URL</FormLabel><FormControl><Input {...urlField} placeholder="https://platform.com/yourprofile" disabled={!isEditing} /></FormControl><FormMessage /></FormItem>
                          )}
                        />
                         <FormField control={form.control} name={`socialProfiles.${index}.followersCount`} render={({ field: followersField }) => (
                            <FormItem><FormLabel>Followers</FormLabel><FormControl><Input type="number" {...followersField} placeholder="0" disabled={!isEditing} /></FormControl><FormMessage /></FormItem>
                          )}
                        />
                         {isEditing && (
                           <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} className="text-destructive hover:bg-destructive/10 md:col-start-3 justify-self-end">
                             <Trash2 className="h-4 w-4" />
                           </Button>
                         )}
                      </div>
                    </Card>
                  ))}
                  {isEditing && (
                    <Button type="button" variant="outline" onClick={() => append({ platform: socialPlatformOptions[0], profileUrl: "", followersCount: 0 })}>
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Social Profile
                    </Button>
                  )}
                  {!isEditing && fields.length === 0 && <p className="text-sm text-muted-foreground">No social profiles added yet.</p>}
                </CardContent>
              </Card>

              {isEditing && (
                <div className="flex justify-end pt-4">
                    <Button type="submit" size="lg">
                    <Save className="mr-2 h-4 w-4" /> Save All Changes
                    </Button>
                </div>
              )}
            </form>
          </Form>
        </div>

        <div className="space-y-8">          
          <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Settings className="h-5 w-5 text-primary"/> Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                    <ShieldCheck className="h-4 w-4"/> Change Password
                </Button>
                 <Button variant="outline" className="w-full justify-start gap-2">
                    <Mail className="h-4 w-4"/> Notification Preferences
                </Button>
                <Button variant="destructive" className="w-full justify-start gap-2">
                    <LogOut className="h-4 w-4"/> Log Out
                </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
