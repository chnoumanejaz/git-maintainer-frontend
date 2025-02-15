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
import {
  gitCredentialsFormSchema,
  gitCredentialsFormSchemaType,
} from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

const GitCredentialsForm: React.FC = () => {
  const form = useForm<gitCredentialsFormSchemaType>({
    resolver: zodResolver(gitCredentialsFormSchema),
    defaultValues: {
      github_username: '',
      github_token: '',
    },
  });

  function onSubmit(values: gitCredentialsFormSchemaType) {
    console.log(values);
  }

  return (
    <Card className="w-full max-w-md rounded-lg p-2 md:p-8 shadow-md m-3 md:m-0">
      <CardHeader>
        <CardTitle className="md:mb-6 text-lg md:text-2xl font-semibold text-center">
          Enter your Github Credentials
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="github_username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Github Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Github username"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500">
                    This username will be displayed in your GitHub commits and
                    activities.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="github_token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Github Token</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Github token" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500">
                    You can generate the token by visiting the{' '}
                    <a
                      href="https://github.com/settings/tokens/new"
                      target="_blank"
                      className="font-medium text-blue-600 hover:underline">
                      GitHub account
                    </a>
                    .
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Link the Account
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="text-xs md:text-sm text-gray-600">
          We need your GitHub token to securely access your profile and
          repositories using GitHub's APIs. You need to create the token with
          all the permissions selected.
        </p>
      </CardFooter>
    </Card>
  );
};

export default GitCredentialsForm;
