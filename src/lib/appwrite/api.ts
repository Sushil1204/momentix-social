import { INewUser, IUser } from "@/types";
import { account, appwriteConfig, avatars, databases, ID } from "./config";
import { Query } from "appwrite";

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
