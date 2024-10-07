import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { PostValidation } from "@/lib/validation";
import { Models } from "appwrite";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useUploadPost } from "@/lib/react-query/queriesAndMutation";
import Loader from "../shared/loader";

type PostFormProps = {
  post?: Models.Document;
};

const PostForm = ({ post }: PostFormProps) => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { toast } = useToast();
  const { mutateAsync: uploadPost, isPending: isUploadingPost } =
    useUploadPost();

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post?.tags.join(",") : "",
    },
  });

  async function onSubmit(values: z.infer<typeof PostValidation>) {
    const newPost = await uploadPost({
      ...values,
      userId: user?.id,
    });

    if (!newPost) {
      toast({
        title: "Something is wrong.. Please try again",
      });
    }

    navigate("/");
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-800 dark:text-white">
                Caption
              </FormLabel>
              <FormControl>
                <Textarea placeholder="caption" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-800 dark:text-white">
                Add Photo
              </FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-800 dark:text-white">
                Add Location
              </FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-800 dark:text-white">
                Add Tags
              </FormLabel>
              <FormDescription>(Separated by comma ", " )</FormDescription>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  placeholder="Explore, Travel, Family"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
          <Button variant={"outline"} type="button">
            Go Back
          </Button>
          <Button type="submit">
            {isUploadingPost ? (
              <div
                className="flex items-center
     justify-center gap-3 capitalize"
              >
                <Loader /> Loading....
              </div>
            ) : (
              <p className="text-base uppercase">Upload</p>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
