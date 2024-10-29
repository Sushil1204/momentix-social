import * as z from "zod";
import Loader from "@/components/shared/loader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import momentix_logo_transparent from "@/assets/momentix_logo_transparent.svg";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginValidation } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "@/lib/react-query/queriesAndMutation";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { ISession } from "@/constants/interfaces";

const Login = () => {
  const navigate = useNavigate();

  const { mutateAsync: loginAccount, isPending: isLoggingAccount } =
    useLoginUserMutation();

  const form = useForm<z.infer<typeof LoginValidation>>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginValidation>) {
    try {
      const session: ISession | undefined = await loginAccount({
        email: values?.email,
        password: values?.password,
      });
      if (!session?.userId) {
        return toast.error(
          "Invalid credentials. Please check your email and password, and try again."
        );
      } else {
        form.reset(), navigate("/");
      }
    } catch (error) {
      console.log("error", error);
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
        <p className="text-sm text-gray-800 ">WELCOME BACK</p>
        <h2 className="text-2xl md:text-3xl font-semibold leading-[140%] ">
          Log In to your Account
        </h2>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
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
            {isLoggingAccount ? (
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
            New User?{" "}
            <Link
              to="/registration"
              className="text-gray-800 font-semibold hover:underline"
            >
              REGISTER HERE
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default Login;
