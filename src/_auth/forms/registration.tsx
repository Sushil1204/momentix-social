import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { Button } from "@/components/ui/button";
import { RegistrationValidation } from "@/lib/validation";
import momentix_logo_transparent from "@/assets/momentix_logo_transparent.svg";
import Loader from "@/components/shared/loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  useCreateUserMutation,
  useLoginUserMutation,
} from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";

const Registration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { mutateAsync: createNewUser, isPending: isCreatingUser } =
    useCreateUserMutation();
  const { mutateAsync: loginAccount, isPending: isLoggingAccount } =
    useLoginUserMutation();

  const form = useForm<z.infer<typeof RegistrationValidation>>({
    resolver: zodResolver(RegistrationValidation),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof RegistrationValidation>) {
    const newUser = await createNewUser(values);

    if (!newUser) {
      return toast({
        title: "Registration failed. Please try again.",
      });
    }

    const session = await loginAccount({
      email: values?.email,
      password: values?.password,
    });
    console.log(!session);

    if (!session) {
      return toast({
        title: "Login failed. Please try again.",
      });
    } else {
      form?.reset();
      navigate("/");
    }
  }
  return (
    <Form {...form}>
      <div className="sm:w-[420px] flex flex-col justify-center border-2 border-gray-100 p-4 rounded-xl shadow-xl items-center space-y-4">
        <img
          src={momentix_logo_transparent}
          alt="logo"
          width={300}
          height={200}
        />
        <p className="text-sm text-gray-800 ">LET'S GET YOU STARTED</p>
        <h2 className="text-2xl md:text-3xl font-semibold leading-[140%] ">
          Create an Account
        </h2>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="sushil" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="sushil1204" {...field} />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="sushil@gmail.com"
                    {...field}
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
                  <Input type="password" placeholder="****" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {isCreatingUser ? (
              <div
                className="flex items-center
             justify-center gap-3 capitalize"
              >
                <Loader /> Loading....
              </div>
            ) : (
              <p className="text-base uppercase">Submit</p>
            )}
          </Button>

          <p className="text-center my-5 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-gray-800 font-semibold hover:underline"
            >
              LOGIN HERE
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default Registration;
