import PostForm from "@/components/forms/postForm";
import Loader from "@/components/shared/loader";
import { useGetPostById } from "@/lib/react-query/queriesAndMutation";
import { ImagePlus } from "lucide-react";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");

  if (isPending) return <Loader />;

  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 no-scrollbar">
        <div className="w-full max-w-5xl flex items-center gap-3 justify-start">
          <ImagePlus size={35} />
          <h2 className="text-xl font-bold md:text-base text-left w-full">
            Edit Post
          </h2>
        </div>
        <PostForm action="Update" post={post} />
      </div>
    </div>
  );
};

export default EditPost;
