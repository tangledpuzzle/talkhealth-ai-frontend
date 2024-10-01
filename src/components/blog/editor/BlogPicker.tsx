import React, { useState } from "react";
import Tiptap from "./Tiptap";
import axios from "axios";
import { useRouter } from "next/navigation";
import { uploadFileToS3 } from "@/utils/uploadFileToS3";


const BlogPicker = () => {
  const [content, setContent] = useState<string>("");
  const [coverFileName, setCoverFileName] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    rating: 0,
    author: "admin",
    cover: "",
    category: "Medicine",
    slug: "",
    views: 0,
  });
  const router = useRouter();

  const handleCover = async (e: any) => {
    const fileName = (await uploadFileToS3(
      e.target.files[0],
      e.target.files[0].name
    )) as unknown as string;
    if (fileName) {
      setCoverFileName(fileName);
      setFormData({
        ...formData,
        cover: "https://pdfimageupload.s3.amazonaws.com/" + fileName,
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

   
    await axios
      .post("/api/article", {
        ...formData,
        content,
      })
      .then((res) => {
        router.push(`/blog/${res.data._id}`);
      })
      .catch((err) => console.log(err));
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl w-full grid place-items-center mx-auto pt-10 mb-10"
    >
      <div className="text-3xl text-center text-sky-300 mb-10">Blog Create</div>
      <div className="w-full"
      >
        <label htmlFor="title" className="text-sky-300">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={(e) => {
            setFormData({
              ...formData,
              title: e.target.value,
              slug: e.target.value.split(" ").join("-"),
            });
          }}
          className="w-full border border-gray-700 rounded-md p-2 mb-4"
        />
      </div>
      <div className="my-4 w-full">
        <Tiptap content={content} setContent={setContent} />
      </div>
      <div  className="w-full"> 
        <label htmlFor="rating" className="text-sky-300">
          Rating
        </label>
        <input
          type="number"
          id="rating"
          name="rating"
          onChange={(e) =>
            setFormData({ ...formData, rating: parseInt(e.target.value) })
          }
          className="w-full border border-gray-700 rounded-md p-2 mb-4"
        />
      </div>
      <div className="my-4 w-full">
        <label htmlFor="cover" className="text-sky-300">
          Cover
        </label>
        <input
          type="file"
          id="cover"
          name="cover"
          onChange={handleCover}
          className="w-full border border-gray-700 rounded-md p-2 mb-4"
        />
      </div>

      <button
        type="submit"
        className="bg-sky-600 mt-3 text-white p-2 rounded-md w-full disabled:bg-black/80 disabled:cursor-not-allowed"
        disabled={
          !content || !formData.title || !formData.rating || !coverFileName
        }
      >
        Submit
      </button>
    </form>
  );
};

export default BlogPicker;
