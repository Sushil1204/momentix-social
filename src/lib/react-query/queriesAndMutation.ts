import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  createNewUser,
  deleteSavePost,
  getCurrentAccount,
  getRecentPost,
  likePost,
  loginUser,
  logoutAccount,
  savePost,
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

export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: ["getRecentPost"],
    queryFn: getRecentPost,
    refetchOnWindowFocus: false,
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      likesArray,
    }: {
      postId: string;
      likesArray: string[];
    }) => likePost(postId, likesArray),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getPostById", data?.$id],
      });
      queryClient.invalidateQueries({
        queryKey: ["getRecentPost"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getPost"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getCurrentUser"],
      });
    },
  });
};

export const useSavePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
      savePost(postId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getRecentPost"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getPost"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getCurrentUser"],
      });
    },
  });
};

export const useDeleteSavePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ savePostId }: { savePostId: string }) =>
      deleteSavePost(savePostId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getRecentPost"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getPost"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getCurrentUser"],
      });
    },
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: getCurrentAccount,
    refetchOnWindowFocus: false,
  });
};
