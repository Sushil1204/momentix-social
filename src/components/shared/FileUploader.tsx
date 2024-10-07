import React, { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

const FileUploader = ({ fieldChange, mediaUrl }: any) => {
  const [image, setImage] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState("");

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setImage(acceptedFiles);
      fieldChange(acceptedFiles);
      setImageUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [image]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  return (
    <>
      <div
        {...getRootProps()}
        className="mt-2 p-6 border-4 border-dashed  rounded-2xl  cursor-pointer text-center"
      >
        <input {...getInputProps()} />
        {!imageUrl ? (
          <p className="text-gray-800 font-bold text-sm md:text-base">
            Drag & drop an image or click to upload
          </p>
        ) : (
          <div className="w-full p-2 lg:p-5 flex flex-1 flex-wrap items-center justify-center">
            <img
              src={imageUrl}
              alt="preview"
              className="mx-auto rounded-xl max-h-40 w-auto shadow-md"
            />
            <p className="text-xs mt-4 text-gray-400">
              {" "}
              Drag & drop an image or click on the photo to replace
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default FileUploader;
