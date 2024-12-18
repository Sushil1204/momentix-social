import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  createNewUser,
  deletePost,
  deleteSavePost,
  followUser,
  getCurrentAccount,
  getFollowings,
  getInfinitePost,
  getPostById,
  getRecentPost,
  getTopUsers,
  getUserById,
  likePost,
  loginUser,
  logoutAccount,
  savePost,
  searchUser,
  unfollowUser,
  updatePost,
  updateUser,
  uploadPost,
} from "../appwrite/api";
import { INewPost, INewUser, IUpdatePost, IUpdateUser } from "@/types";

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

export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: ["getRecentPost"],
    queryFn: getRecentPost,
    refetchOnWindowFocus: false,
  });
};

export const useUploadPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => uploadPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getRecentPost"],
      });
    },
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

export const useGetPostById = (postId: string) => {
  return useQuery({
    queryKey: ["getPostById"],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
    refetchOnWindowFocus: false,
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: IUpdatePost) => updatePost(post),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getPostById", data?.$id],
      });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, imageId }: { postId: string; imageId: string }) =>
      deletePost(postId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getRecentPost"],
      });
    },
  });
};

export const useGetPosts = () => {
  return useInfiniteQuery({
    queryKey: ["getInfinitePosts"],
    queryFn: getInfinitePost as any,
    initialPageParam: 0,
    getNextPageParam: (lastPage: any) => {
      // If there's no data, there are no more pages.
      if (lastPage && lastPage.documents.length === 0) {
        return null;
      }

      // Use the $id of the last document as the cursor.
      const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
      return lastId;
    },
  });
};

export const useSearchUser = (searchTerm: string) => {
  return useQuery({
    queryKey: ["searchUser", searchTerm],
    queryFn: () => searchUser(searchTerm),
    enabled: !!searchTerm,
  });
};

export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: ["getUserById"],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateUser"],
    mutationFn: (user: IUpdateUser) => updateUser(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getUserById", data?.$id],
      });
    },
  });
};

export const useGetTopUsers = (limit: number) => {
  return useQuery({
    queryKey: ["getTopUsers"],
    queryFn: () => getTopUsers(limit),
  });
};

export const useGetFollowings = (userId: string) => {
  return useQuery({
    queryKey: ["getFollowings"],
    queryFn: () => getFollowings(userId),
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });
};
export const useFollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["followUser"],
    mutationFn: ({
      userId,
      followingId,
    }: {
      userId: string;
      followingId: string;
    }) => followUser({ userId, followingId }),
    onSuccess: () => {
      queryClient?.invalidateQueries({
        queryKey: ["getFollowings"],
      });
    },
  });
};

export const useUnfollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["unfollowUser"],
    mutationFn: ({
      userId,
      followingId,
    }: {
      userId: string;
      followingId: string;
    }) => unfollowUser({ userId, followingId }),
    onSuccess: () => {
      queryClient?.invalidateQueries({
        queryKey: ["getFollowings"],
      });
    },
  });
};
