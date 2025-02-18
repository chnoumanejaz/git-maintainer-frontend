'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { showApiError } from '@/lib/axios';
import { registerFormSchema, registerFormSchemaType } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const RegisterForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<registerFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: '',
      password: '',
      email: '',
    },
  });

  async function onSubmit(values: registerFormSchemaType) {
    console.log(values);
    try {
      setIsLoading(true);
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + '/register/',
        values
      );

      toast.success(
        response.data.message + ` Your username is ${values.username}`
      );
      router.push('/auth/login');
    } catch (error) {
      showApiError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md rounded-lg p-2 md:p-8 shadow-md m-6 md:m-0">
      <CardHeader>
        <CardTitle className="mb-6 text-2xl font-semibold text-center">
          Create an Account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500">
                    No spaces allowed. Spaces will be replaced with underscores.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500">
                    Must be 8 characters, with a number and special character.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Account'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="text-xs md:text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            href="/auth/login"
            className="font-medium text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
