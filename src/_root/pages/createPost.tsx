import PostForm from "@/components/forms/postForm";
import { ImagePlus } from "lucide-react";

const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 no-scrollbar">
        <div className="w-full max-w-5xl flex items-center gap-3 justify-start">
          <ImagePlus size={35} />
          <h2 className="text-xl font-bold md:text-base text-left w-full">
            Create Post
          </h2>
        </div>
        <PostForm />
      </div>
    </div>
  );
};

export default CreatePost;
