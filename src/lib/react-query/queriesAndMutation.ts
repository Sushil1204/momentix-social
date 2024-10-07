import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { createNewUser, loginUser } from "../appwrite/api";
import { INewUser } from "@/types";

export const useCreateUserMutation = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createNewUser(user),
  });
};

export const useLoginUserMutation = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) => loginUser(user),
  });
};
