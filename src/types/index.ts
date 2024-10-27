export type IUser = {
  id: string;
  name: string;
  email: string;
  username?: string;
  bio: string;
  imageUrl: string;
};

export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export type IContextType = {
  user: IUser;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  checkAuthUser: () => Promise<boolean>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

export type INewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};
