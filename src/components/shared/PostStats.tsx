import {
  useDeleteSavePost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutation";
import { Models } from "appwrite";
import React, { useState } from "react";
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import Loader from "./loader";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const { data: currentUser } = useGetCurrentUser();

  const likesList = post?.likes;
  const savedPosts = currentUser?.saves?.find(
    (record: Models.Document) => record?.post?.$id === post?.$id
  );

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(savedPosts?.post?.$id === post?.$id);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavePost } = useDeleteSavePost();

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    const savedPosts = currentUser?.saves?.find(
      (record: Models.Document) => record?.post?.$id === post?.$id
    );

    if (savedPosts) {
      setIsSaved(false);
      deleteSavePost({ savePostId: savedPosts?.$id });
    } else {
      savePost({ postId: post?.$id, userId });
      setIsSaved(true);
    }
  };

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];

    const hasLiked = newLikes?.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post?.$id, likesArray: newLikes });
  };

  return (
    <div className="flex items-center justify-start gap-10 mt-3 z-10">
      <div className="flex gap-2">
        <div onClick={(e) => handleLikePost(e)}>
          {likesList.includes(userId) ? (
            <FaHeart color={"red"} size={25} cursor={"pointer"} />
          ) : (
            <FaRegHeart size={25} cursor={"pointer"} />
          )}
        </div>
        <p>{likes?.length}</p>
      </div>
      <div onClick={(e) => handleSavePost(e)}>
        {isSaved ? (
          <FaBookmark size={25} cursor={"pointer"} />
        ) : (
          <FaRegBookmark size={25} cursor={"pointer"} />
        )}
      </div>
    </div>
  );
};

export default PostStats;
