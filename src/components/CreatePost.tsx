import React, {
  ChangeEvent,
  FormEvent,
  Fragment,
  useContext,
  useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PencilAltIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { FeedContext } from "../FeedWrapper";
import ShortUniqueId from "short-unique-id";
import { AuthContext } from "../AuthWrapper";
import ModalComp from "./ModalComp";
import PostForm from "./PostForm";

interface PostState {
  title: string;
  description: string;
}

const uid = new ShortUniqueId({ length: 10 });

const CreatePost = () => {
  const [post, setPost] = useState<PostState>({ title: "", description: "" });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isShared, setIsShared] = useState(false);
  const { handleFeed } = useContext(FeedContext);
  const { user } = useContext(AuthContext);

  const handlePostChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSharePost = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user)
      handleFeed?.(
        {
          title: post.title,
          contents: post.description,
          postID: uid(),
          createdOn: Date.now(),
          updatedOn: Date.now(),
          postAuthor: user,
          likes: [],
          comments: []
        },
        "add"
      );
    setPost({ title: "", description: "" });
    setIsOpen(false);
    setIsShared(true);
    setTimeout(() => {
      setIsShared(false);
    }, 2000);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <div className="fixed top-14 flex justify-center w-[calc(100%-16rem)]">
        <button
          className="bg-pink-200 px-4 py-2 rounded-md flex items-center gap-2"
          onClick={handleOpenModal}
        >
          <PlusCircleIcon className="h-6 w-6 text-blue-500" />
          <span>Create Post</span>
        </button>
      </div>
      {isShared && (
        <span className="absolute top-20 right-12 bg-green-500 text-white rounded-xl px-6">
          Your post has been shared!
        </span>
      )}
      <ModalComp isOpen={isOpen} closeModal={closeModal}>
        <PostForm post={post} handlePostChange={handlePostChange} handleSubmitPost={handleSharePost} buttonText={"Share"} />
      </ModalComp>
    </div>
  );
};

export default CreatePost;
