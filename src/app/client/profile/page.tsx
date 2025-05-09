
'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Phone, MapPin, Edit3, Save, ShoppingBag, Heart, Settings, LogOut, ShieldCheck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const profileSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().optional(),
  addressLine1: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const mockOrderHistory = [
  { id: 'ORD001', date: '2024-07-15', total: '$149.99', status: 'Shipped', items: 2 },
  { id: 'ORD002', date: '2024-06-20', total: '$45.50', status: 'Delivered', items: 1 },
  { id: 'ORD003', date: '2024-05-01', total: '$89.00', status: 'Delivered', items: 3 },
];

const mockWishlist = [
  { id: 'wish1', name: 'Advanced Smartwatch', price: '$299.00', imageUrl: 'https://picsum.photos/seed/smartwatch/100/100', dataAiHint: 'smartwatch tech' },
  { id: 'wish2', name: 'Ergonomic Office Chair', price: '$349.00', imageUrl: 'https://picsum.photos/seed/officechair/100/100', dataAiHint: 'office chair' },
];


export default function ClientProfilePage() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '555-123-4567',
      addressLine1: '123 Main St',
      city: 'Anytown',
      postalCode: '12345',
      country: 'USA',
    },
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
              <AvatarImage src="https://picsum.photos/seed/avatar/100/100" alt="User Avatar" data-ai-hint="profile avatar" />
              <AvatarFallback>JD</AvatarFallback>
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
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><User className="h-5 w-5 text-primary"/> Personal Information</CardTitle>
              <CardDescription>Manage your personal details and contact information.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditing} />
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
                            <Input type="email" {...field} disabled={!isEditing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Separator />
                  <h3 className="text-lg font-medium text-foreground flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> Shipping Address</h3>
                   <FormField
                      control={form.control}
                      name="addressLine1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address Line 1</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  <div className="grid sm:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {isEditing && (
                    <Button type="submit" className="w-full sm:w-auto">
                      <Save className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                  )}
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
           <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ShoppingBag className="h-5 w-5 text-primary"/> Order History</CardTitle>
            </CardHeader>
            <CardContent>
              {mockOrderHistory.length > 0 ? (
                <ul className="space-y-4">
                  {mockOrderHistory.map(order => (
                    <li key={order.id} className="p-3 border rounded-md hover:bg-muted/50">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium">{order.id}</span>
                        <span className="text-muted-foreground">{order.date}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm mt-1">
                        <span>Total: {order.total}</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{order.status}</span>
                      </div>
                       <Button variant="link" size="sm" className="p-0 h-auto mt-1 text-primary">View Details</Button>
                    </li>
                  ))}
                </ul>
              ) : <p className="text-muted-foreground">No orders yet.</p>}
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Heart className="h-5 w-5 text-primary"/> Wishlist</CardTitle>
            </CardHeader>
            <CardContent>
              {mockWishlist.length > 0 ? (
                <ul className="space-y-3">
                  {mockWishlist.map(item => (
                    <li key={item.id} className="flex items-center gap-3 p-2 border rounded-md hover:bg-muted/50">
                      <Avatar className="h-12 w-12 rounded-md">
                        <AvatarImage src={item.imageUrl} alt={item.name} data-ai-hint={item.dataAiHint} />
                        <AvatarFallback>{item.name.substring(0,1)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.price}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-destructive">Remove</Button>
                    </li>
                  ))}
                </ul>
              ) : <p className="text-muted-foreground">Your wishlist is empty.</p>}
            </CardContent>
          </Card>
          
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
