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
import { GITHUB_TOKEN, GITHUB_USER } from '@/constants';
import api, { showApiError } from '@/lib/axios';
import { getCookie, setCookie } from '@/lib/utils';
import {
  gitCredentialsFormSchema,
  gitCredentialsFormSchemaType,
} from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type props = {
  isEdit?: boolean;
  setShowCredentialsForm: Dispatch<SetStateAction<boolean>>;
  setIsEditingCredentials: Dispatch<SetStateAction<boolean>>;
};
const GitCredentialsForm = ({
  isEdit,
  setShowCredentialsForm,
  setIsEditingCredentials,
}: props) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<gitCredentialsFormSchemaType>({
    resolver: zodResolver(gitCredentialsFormSchema),
    defaultValues: {
      github_username: getCookie(GITHUB_USER) || '',
      github_token: getCookie(GITHUB_TOKEN) || '',
    },
  });

  async function onSubmit(values: gitCredentialsFormSchemaType) {
    console.log(values);
    try {
      setIsLoading(true);
      const response = isEdit
        ? await api.patch('/save_github/', values)
        : await api.post('/save_github/', values);

      setCookie(
        [GITHUB_USER, GITHUB_TOKEN],
        [values.github_username, values.github_token]
      );

      setShowCredentialsForm(false);
      toast.success(response.data.message);
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
          {isEdit ? 'Update' : 'Configure'} Github Credentials
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
                      disabled={isLoading}
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
                    <Input
                      placeholder="Enter your Github token"
                      {...field}
                      disabled={isLoading}
                    />
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

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isEdit
                ? isLoading
                  ? 'Updating...'
                  : 'Update Linked Account'
                : isLoading
                ? 'Linking...'
                : 'Link the Account'}
            </Button>
            {isEdit && (
              <Button
                type="reset"
                variant="secondary"
                className="w-full"
                disabled={isLoading}
                onClick={() => {
                  setIsEditingCredentials(false), setShowCredentialsForm(false);
                }}>
                Cancle
              </Button>
            )}
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
