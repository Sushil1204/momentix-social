import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  createNewUser,
  loginUser,
  logoutAccount,
  uploadPost,
} from "../appwrite/api";
import { INewPost, INewUser } from "@/types";

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

export const useLogoutUserMutation = () => {
  return useMutation({
    mutationFn: () => logoutAccount(),
  });
};

export const useUploadPost = () => {
  return useMutation({
    mutationFn: (post: INewPost) => uploadPost(post),
  });
};
