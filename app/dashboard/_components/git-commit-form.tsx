'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Textarea } from '@/components/ui/textarea';
import { gitCommitFormSchema, gitCommitFormSchemaType } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

const GitCommitForm: React.FC = () => {
  const form = useForm<gitCommitFormSchemaType>({
    resolver: zodResolver(gitCommitFormSchema),
    defaultValues: {
      repo_name: '',
      num_commits: 0,
      user_input: '',
    },
  });

  function onSubmit(values: gitCommitFormSchemaType) {
    console.log(values);
  }

  return (
    <Card className="w-full max-w-md rounded-lg p-2 md:p-8 shadow-md m-3 md:m-0">
      <CardHeader>
        <CardTitle className="md:mb-6 text-lg md:text-2xl font-semibold text-center">
          Add new commits
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="repo_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Github repo name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Github repository name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500">
                    If the repository doesn't exist, a private one will be
                    created.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="num_commits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No. of commits</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter number of commits"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500">
                    How many commits you want in repository.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="user_input"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your message here."
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500">
                    A short message explaing what type of commits you want to
                    add.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Add commit(s)
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default GitCommitForm;
