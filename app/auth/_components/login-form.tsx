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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants';
import { formatErrorMessage } from '@/lib/utils';
import { loginFormSchema, loginFormSchemaType } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<loginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(values: loginFormSchemaType) {
    console.log(values);
    try {
      setIsLoading(true);
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + '/login/',
        values
      );

      console.log('response', response);
      Cookies.set(ACCESS_TOKEN, response.data.access, {
        secure: true,
      });
      Cookies.set(REFRESH_TOKEN, response.data.refresh, {
        secure: true,
      });
      toast.success('You have successfully logged in.');
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        toast.error(formatErrorMessage(error.response?.data));
      } else {
        toast.error('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md rounded-lg p-2 md:p-8 shadow-md m-6 md:m-0">
      <CardHeader>
        <CardTitle className="mb-6 text-2xl font-semibold text-center">
          Welcome Back
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="text-xs md:text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            href="/auth/register"
            className="font-medium text-blue-600 hover:underline">
            Create an account
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
