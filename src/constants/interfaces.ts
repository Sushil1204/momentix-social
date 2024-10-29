export interface ISearchUser {
  name: string;
  username: string;
  accountId: string;
  email: string;
  bio?: null;
  imageId?: null;
  imageUrl: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions?: null[] | null;
  posts?: PostsEntity[] | null;
  liked?: LikedEntity[] | null;
  saves?: SavesEntity[] | null;
  $databaseId: string;
  $collectionId: string;
}
export interface PostsEntity {
  caption: string;
  tags?: string[] | null;
  imageUrl: string;
  imageId: string;
  location: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions?: string[] | null;
  likes?: LikesEntityOrCreator[] | null;
  save?: SaveEntity[] | null;
  $databaseId: string;
  $collectionId: string;
}
export interface LikesEntityOrCreator {
  name: string;
  username: string;
  accountId: string;
  email: string;
  bio?: null;
  imageId?: null;
  imageUrl: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions?: null[] | null;
  $databaseId: string;
  $collectionId: string;
}
export interface SaveEntity {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions?: string[] | null;
  $databaseId: string;
  $collectionId: string;
}
export interface LikedEntity {
  caption: string;
  tags?: string[] | null;
  imageUrl: string;
  imageId: string;
  location: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions?: string[] | null;
  creator?: LikesEntityOrCreator1 | null;
  save?: (SaveEntity1 | null)[] | null;
  $databaseId: string;
  $collectionId: string;
}
export interface LikesEntityOrCreator1 {
  name: string;
  username: string;
  accountId: string;
  email: string;
  bio?: null;
  imageId?: null;
  imageUrl: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions?: null[] | null;
  $databaseId: string;
  $collectionId: string;
}
export interface SaveEntity1 {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions?: string[] | null;
  $databaseId: string;
  $collectionId: string;
}
export interface SavesEntity {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions?: string[] | null;
  post: Post;
  $databaseId: string;
  $collectionId: string;
}
export interface Post {
  caption: string;
  tags?: string[] | null;
  imageUrl: string;
  imageId: string;
  location: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions?: string[] | null;
  $databaseId: string;
  $collectionId: string;
}

export interface ISession {
  userId: string;
}
