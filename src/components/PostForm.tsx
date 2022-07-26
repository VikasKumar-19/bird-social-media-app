import React, { ChangeEvent, FC, FormEvent } from "react";

interface IProps{
  post:{
    title: string;
    description: string;
  };
  handlePostChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>void;
  handleSubmitPost:(e: FormEvent<HTMLFormElement>) =>void;
  buttonText:string;
}

const PostForm:FC<IProps> = ({post, handlePostChange, handleSubmitPost, buttonText}) => {
  return (
    <div className="w-full max-w-xl mx-auto px-6 py-4 bg-sky-300 rounded shadow-md ring-1 ring-gray-900/10">
      <form method="POST" onSubmit={handleSubmitPost}>
        <div>
          <input
            className="outline-none px-3 py-1 block w-full border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="text"
            name="title"
            value={post.title}
            onChange={handlePostChange}
            placeholder="Title"
          />
        </div>
        <div className="mt-4">
          <textarea
            name="description"
            className="block px-3 py-1 outline-none w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows={4}
            placeholder="Desription"
            value={post.description}
            onChange={handlePostChange}
          ></textarea>
        </div>

        <div className="flex items-center justify-end mt-4 gap-x-2">
          <button
            type="submit"
            className="px-6 py-2 text-sm font-semibold rounded-md shadow-md text-sky-100 bg-sky-500 hover:bg-sky-700 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
