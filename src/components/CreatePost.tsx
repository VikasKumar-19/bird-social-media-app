import React, { ChangeEvent, FormEvent, Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PencilAltIcon } from "@heroicons/react/solid";
import { FeedContext } from "../FeedWrapper";
import ShortUniqueId from "short-unique-id";
import { AuthContext } from "../AuthWrapper";

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

  const handleSharePost = (e:FormEvent) => {
    e.preventDefault();
    if (user)
      handleFeed?.(
        {
          title: post.title,
          contents: post.description,
          postID: uid(),
          createdOn: Date.now() / 1000,
          updatedOn: Date.now() / 1000,
          postAuthor: user,
        },
        "add"
      );
    setPost({title: "", description: ""});
    setIsOpen(false);
    setIsShared(true);
    setTimeout(()=>{
      setIsShared(false);
    }, 2000)
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <div className="fixed flex justify-center w-[calc(100%-16rem)]">
        <button
          className="bg-pink-200 px-4 py-2 rounded-md flex items-center gap-2"
          onClick={handleOpenModal}
        >
          <PencilAltIcon className="h-5 w-5 text-blue-500" />
          <span>Create Post</span>
        </button>
      </div>
      {isShared && <span className="absolute top-20 right-12 bg-green-500 text-white rounded-xl px-6">Your post has been shared!</span>}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="w-full max-w-xl mx-auto px-6 py-4 bg-sky-300 rounded shadow-md ring-1 ring-gray-900/10">
                    <form method="POST" onSubmit={handleSharePost}>
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
                          Share
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default CreatePost;
