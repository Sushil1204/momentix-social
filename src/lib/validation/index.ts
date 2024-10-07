import * as z from "zod";

export const RegistrationValidation = z.object({
  username: z.string().min(2, { message: "Too Short" }).max(50),
  name: z.string().min(2, { message: "Too Short" }).max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(50),
});

export const LoginValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(50),
});
