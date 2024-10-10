import { INewPost, INewUser, IUser } from "@/types";
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
