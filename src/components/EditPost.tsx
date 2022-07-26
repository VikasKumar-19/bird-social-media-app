import React, { ChangeEvent, FC, FormEvent, useContext, useEffect, useState } from "react";
import { FeedContext, IFeedState } from "../FeedWrapper";
import ModalComp from "./ModalComp";
import PostForm from "./PostForm";

interface IProps {
  feed: IFeedState;
  editMode: boolean;
  disableEditMode: ()=>void;
}

interface PostState {
  title: string;
  description: string;
}

const EditPost: FC<IProps> = ({ feed, editMode, disableEditMode }) => {
  const [post, setPost] = useState<PostState>({ title: "", description: "" });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const { handleFeed } = useContext(FeedContext);

  useEffect(() => {
    setPost({title: feed.title, description: feed.contents})
  }, [])
  

  const handlePostChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdatePost = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFeed?.(
      {
        title: post.title,
        contents: post.description,
        postID: feed.postID,
        createdOn: feed.createdOn,
        updatedOn: Date.now(),
        postAuthor: feed.postAuthor,
        likes: feed.likes,
        comments: feed.comments,
      },
      "edit"
    );
    closeModal();
    setIsUpdated(true);
    setTimeout(() => {
      setIsUpdated(false);
    }, 2000);
  };

  const closeModal = () => {
    disableEditMode();
  };
  return (
    <div>
      {isUpdated && (
        <span className="absolute top-20 right-12 bg-green-500 text-white rounded-xl px-6">
          Your post has been updated!!
        </span>
      )}
      <ModalComp isOpen={editMode} closeModal={closeModal}>
        <PostForm
          post={post}
          handlePostChange={handlePostChange}
          handleSubmitPost={handleUpdatePost}
          buttonText={"Update"}
        />
      </ModalComp>
    </div>
  );
};

export default EditPost;
