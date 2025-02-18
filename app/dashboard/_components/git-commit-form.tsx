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
import api, { showApiError } from '@/lib/axios';
import { gitCommitFormSchema, gitCommitFormSchemaType } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type props = {
  setShowAddCommitForm: Dispatch<SetStateAction<boolean>>;
};
const GitCommitForm = ({ setShowAddCommitForm }: props) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<gitCommitFormSchemaType>({
    resolver: zodResolver(gitCommitFormSchema),
    defaultValues: {
      repo_name: '',
      num_commits: 0,
      user_input: '',
    },
  });

  async function onSubmit(values: gitCommitFormSchemaType) {
    console.log(values);
    try {
      setIsLoading(true);
      const response = await api.post('/make_commits/', values);
      toast.success(response.data.message);
      form.reset();
      setShowAddCommitForm(false);
    } catch (error) {
      showApiError(error);
    } finally {
      setIsLoading(false);
    }
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
                      disabled={isLoading}
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
                      disabled={isLoading}
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
                      disabled={isLoading}
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

            {isLoading && (
              <p className="text-sm text-blue-600 text-center">
                This may take few seconds. Please be patient.
              </p>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add commit(s)'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default GitCommitForm;
