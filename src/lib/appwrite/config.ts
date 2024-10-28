import { Client, ID, Account, Databases, Storage, Avatars } from "appwrite";

const client = new Client();
const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);
const avatars = new Avatars(client);

export const appwriteConfig = {
  endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databasesId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  userCollecttionId: import.meta.env
    .VITE_APPWRITE__COLLECTION_USERS_DATABASE_ID,
  postCollectionId: import.meta.env.VITE_APPWRITE__COLLECTION_POSTS_DATABASE_ID,
  savesCollectionId: import.meta.env.VITE_APPWRITE_COLLECTION_SAVES_ID,
  followsCollectionId: import.meta.env
    .VITE_APPWRITE__COLLECTION_FOLLOWS_DATABASE_ID,
};

client
  .setEndpoint(appwriteConfig?.endpoint)
  .setProject(appwriteConfig?.projectId);
export { account, ID, databases, storage, avatars };
