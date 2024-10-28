import { INewPost, INewUser, IUpdatePost, IUpdateUser, IUser } from "@/types";
import {
  account,
  appwriteConfig,
  avatars,
  databases,
  ID,
  storage,
} from "./config";
import { ImageGravity, Query } from "appwrite";

export async function createNewUser(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID?.unique(),
      user?.email,
      user?.password,
      user?.name
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user?.name);

    const newUser = await saveUser({
      accountId: newAccount?.$id,
      name: newAccount?.name,
      email: newAccount?.email,
      username: user?.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    return error;
  }
}

export async function saveUser(user: {
  accountId: string;
  name: string;
  email: string;
  username: string;
  imageUrl: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig?.databasesId,
      appwriteConfig?.userCollecttionId,
      ID?.unique(),
      user
    );
    return newUser;
  } catch (error) {}
}

export async function loginUser(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailPasswordSession(
      user?.email,
      user?.password
    );

    if (!session) throw Error;
    return session;
  } catch (error) {
    return error;
  }
}

export const getCurrentAccount = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;
    const currentUser = await databases?.listDocuments(
      appwriteConfig?.databasesId,
      appwriteConfig?.userCollecttionId,
      [Query.equal("accountId", currentAccount?.$id)]
    );

    if (!currentUser) throw Error;
    console.log(currentUser?.documents[0]);
    return currentUser?.documents[0];
  } catch (error) {}
};

export const logoutAccount = async () => {
  try {
    const currentAccount = await account.deleteSession("current");

    if (!currentAccount) throw Error;
    return currentAccount;
  } catch (error) {}
};

export const uploadFile = async (file: File) => {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
};

export const getFilePreview = async (fileId: string) => {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      ImageGravity.Center,
      100
    );

    if (!fileUrl) throw Error;
    return fileUrl;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFile = async (fileId: string) => {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
};

export const uploadPost = async (post: INewPost) => {
  try {
    const uploadedFile = await uploadFile(post.file[0]);
    if (!uploadedFile) throw Error;

    const fileUrl = await getFilePreview(uploadedFile.$id);
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    const newPost = await databases.createDocument(
      appwriteConfig?.databasesId,
      appwriteConfig?.postCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        location: post.location,
        tags: tags,
      }
    );

    if (!newPost) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    return newPost;
  } catch (error) {}
};

export const getRecentPost = async () => {
  try {
    const posts = await databases?.listDocuments(
      appwriteConfig?.databasesId,
      appwriteConfig?.postCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );
    if (!posts) throw Error;
    return posts;
  } catch (error) {}
};

export const likePost = async (postId: string, likesArray: string[]) => {
  try {
    const updatedPost = await databases?.updateDocument(
      appwriteConfig?.databasesId,
      appwriteConfig?.postCollectionId,
      postId,
      {
        likes: likesArray,
      }
    );

    if (!updatedPost) throw Error;

    return updatedPost;
  } catch (error) {}
};

export const savePost = async (postId: string, userId: string) => {
  try {
    const createSavePost = await databases?.createDocument(
      appwriteConfig?.databasesId,
      appwriteConfig?.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId,
      }
    );

    if (!createSavePost) throw Error;

    return createSavePost;
  } catch (error) {}
};

export const deleteSavePost = async (savePostId: string) => {
  try {
    const deletePost = await databases?.deleteDocument(
      appwriteConfig?.databasesId,
      appwriteConfig?.savesCollectionId,
      savePostId
    );

    if (!deletePost) throw Error;

    console.log("deletePost", deletePost);

    return deletePost;
  } catch (error) {}
};

export const getPostById = async (postId: string) => {
  try {
    const post = await databases?.getDocument(
      appwriteConfig?.databasesId,
      appwriteConfig?.postCollectionId,
      postId
    );

    if (!post) throw Error;

    return post;
  } catch (error) {}
};

export async function updatePost(post: IUpdatePost) {
  const hasFileToUpdate = post.file.length > 0;

  try {
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId,
    };

    if (hasFileToUpdate) {
      const uploadedFile = await uploadFile(post.file[0]);
      if (!uploadedFile) throw Error;

      const fileUrl = await getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    const updatedPost = await databases.updateDocument(
      appwriteConfig.databasesId,
      appwriteConfig.postCollectionId,
      post.postId,
      {
        caption: post.caption,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        location: post.location,
        tags: tags,
      }
    );

    if (!updatedPost) {
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }

      throw Error;
    }

    if (hasFileToUpdate) {
      await deleteFile(post.imageId);
    }

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

export const deletePost = async (postId: string, imageId: string) => {
  if (!postId || !imageId) throw Error;

  try {
    await databases.deleteDocument(
      appwriteConfig?.databasesId,
      appwriteConfig?.postCollectionId,
      postId
    );
    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
};

export const getInfinitePost = async ({ pageParam }: { pageParam: string }) => {
  const queries: any[] = [Query.orderDesc("$updatedAt"), Query.limit(20)];
  if (pageParam) queries.push(Query.cursorAfter(pageParam.toString()));
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databasesId,
      appwriteConfig.postCollectionId,
      queries
    );

    return posts;
  } catch (error) {
    console.error(error);
  }
};

export const searchUser = async (searchTerm: string) => {
  try {
    const results = await databases.listDocuments(
      appwriteConfig?.databasesId,
      appwriteConfig?.userCollecttionId,
      [Query.search("name", searchTerm)]
    );

    return results;
  } catch (error) {
    console.error(error);
  }
};

export async function getUserById(userId: string) {
  try {
    const user = await databases.getDocument(
      appwriteConfig?.databasesId,
      appwriteConfig?.userCollecttionId,
      userId
    );

    if (!user) throw Error;

    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(user: IUpdateUser) {
  const hasFileToUpdate = user?.file?.length > 0;
  try {
    let image = {
      imageUrl: user.imageUrl,
      imageId: user.imageId,
    };

    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await uploadFile(user.file[0]);
      if (!uploadedFile) throw Error;

      // Get new file url
      const fileUrl = await getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    //  Update user
    const updatedUser = await databases.updateDocument(
      appwriteConfig?.databasesId,
      appwriteConfig?.userCollecttionId,
      user.userId,
      {
        name: user.name,
        bio: user.bio,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
      }
    );

    // Failed to update
    if (!updatedUser) {
      // Delete new file that has been recently uploaded
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }
      // If no new file uploaded, just throw error
      throw Error;
    }

    // Safely delete old file after successful update
    if (user.imageId && hasFileToUpdate) {
      await deleteFile(user.imageId);
    }

    return updatedUser;
  } catch (error) {
    console.log(error);
  }
}

export async function getTopUsers(limit: number) {
  try {
    const topUsers = await databases?.listDocuments(
      appwriteConfig?.databasesId,
      appwriteConfig?.userCollecttionId,
      [Query.orderDesc("$createdAt"), Query?.limit(limit)]
    );

    if (!topUsers) throw Error;
    return topUsers;
  } catch (error) {}
}

export async function getFollowings(userId: string) {
  try {
    const followings = await databases?.listDocuments(
      appwriteConfig?.databasesId,
      appwriteConfig?.followsCollectionId,
      [Query.equal("userId", userId)]
    );
    return followings;
  } catch (error) {
    console.log(error);
  }
}

export async function followUser({
  userId,
  followingId,
}: {
  userId: string;
  followingId: string;
}) {
  try {
    // Step 1: Update the following list for the current user
    const existingUser = await getFollowings(userId);

    if (!existingUser || existingUser?.documents?.length === 0) {
      // Create a new document if the user doesn't already exist
      await databases.createDocument(
        appwriteConfig.databasesId,
        appwriteConfig.followsCollectionId,
        ID.unique(),
        {
          userId: userId,
          followingsId: [followingId],
        }
      );
    } else {
      // Retrieve the existing follow list and prevent duplicates
      const currentFollowing = existingUser.documents[0].followingId || [];
      const updatedFollowing = Array.from(
        new Set([...currentFollowing, followingId])
      );

      // Update the existing document
      await databases.updateDocument(
        appwriteConfig.databasesId,
        appwriteConfig.followsCollectionId,
        existingUser.documents[0].$id,
        {
          followingsId: updatedFollowing,
        }
      );
    }

    // Step 2: Update the followers list for the target user
    const targetUserFollowers = await getFollowings(followingId);

    if (!targetUserFollowers || targetUserFollowers?.documents?.length === 0) {
      // Create a new document for the target user if it doesn't already exist
      await databases.createDocument(
        appwriteConfig.databasesId,
        appwriteConfig.followsCollectionId,
        ID.unique(),
        {
          userId: followingId,
          followersId: [userId],
        }
      );
    } else {
      const currentFollowers =
        targetUserFollowers.documents[0].followersId || [];
      const updatedFollowers = Array.from(
        new Set([...currentFollowers, userId])
      );

      // Update the target user's document with the new follower
      await databases.updateDocument(
        appwriteConfig.databasesId,
        appwriteConfig.followsCollectionId,
        targetUserFollowers.documents[0].$id,
        {
          followersId: updatedFollowers,
        }
      );
    }

    return { success: true };
  } catch (error) {
    console.error("Error following user:", error);
    throw error;
  }
}
