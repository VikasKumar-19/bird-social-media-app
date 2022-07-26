import {
  AnnotationIcon,
  PencilAltIcon,
  ThumbUpIcon as LikeOutlined,
  TrashIcon,
} from "@heroicons/react/outline";
import { ThumbUpIcon as LikeFilled } from "@heroicons/react/solid";
import React, { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthWrapper";
import { FeedContext, IFeedState } from "../FeedWrapper";
import { formatDate } from "../utils/formatDate";
import EditPost from "./EditPost";

type IProps = IFeedState;

const Feed: FC<IProps> = (props) => {
  const {
    title,
    contents,
    postID,
    postAuthor,
    createdOn,
    likes,
    comments,
    updatedOn,
  } = props;

  const { user } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  const handleCommentChange = (e:ChangeEvent<HTMLInputElement>)=>{
    setCommentValue(e.target.value);
  }

  const { handleFeed } = useContext(FeedContext);

  const handleEdit = () => {
    setEditMode(true);
  };

  const showDeleteStatus = () => {
    setIsDeleted(true);
  };

  const toggleComment = ()=>{
    setIsCommentOpen(!isCommentOpen);
  }

  return (
    <div className=" w-[90%] lg:max-w-2xl px-6 pt-4 bg-white rounded shadow-md ring-1 ring-gray-900/10">
      <div>
        <div>
          <h3 className="text-2xl font-semibold">{title}</h3>
          <div className="flex items-center mb-4 space-x-2">
            <span className="text-xs text-gray-500">
              {" "}
              {formatDate(createdOn)}
            </span>
            <span className="text-xs text-gray-500">
              Created by {postAuthor}
            </span>
          </div>
          <p className="text-base text-gray-700">{contents}</p>
        </div>
      </div>
      <div className="w-full py-6 h-6 mt-5 border-t-2 flex justify-around items-center">
        <div className="flex items-center">
        {user && props.likes.includes(user) ? (
          <LikeFilled
            onClick={() => {
              handleFeed?.(
                {
                  ...props,
                  likes: props.likes.filter((author) => author !== user),
                },
                "like"
              );
            }}
            className="h-6 w-6 text-blue-500 cursor-pointer"
          />
        ) : (
          <LikeOutlined
            onClick={() => {
              user &&
                handleFeed?.(
                  { ...props, likes: [...props.likes, user] },
                  "like"
                );
            }}
            className="h-6 w-6 text-blue-500 cursor-pointer"
          />
        )}
          <span className="text-gray-600">{props.likes.length}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <AnnotationIcon onClick={toggleComment} className="h-6 w-6 text-yellow-500 cursor-pointer" />
          <span>{props.comments.length}</span>
        </div>
        {user && user === postAuthor && (
          <>
            <PencilAltIcon
              onClick={handleEdit}
              className="h-6 w-6 text-green-500 cursor-pointer"
            />
            <TrashIcon
              onClick={() => {
                handleFeed?.({ ...props }, "delete");
              }}
              className="h-6 w-6 text-red-500 cursor-pointer"
            />
          </>
        )}
      </div>
      <EditPost
        editMode={editMode}
        disableEditMode={() => setEditMode(false)}
        feed={props}
      />
      {
        isCommentOpen && 
        <div className="py-4">
          <div className="flex items-center gap-4">
            <input type="text" value={commentValue} onChange={handleCommentChange} className="bg-white px-3 py-1 border-2 rounded-md w-full outline-none text-gray-700" name="" id="" placeholder="Enter the comment..." />
            <button onClick={()=>{
              handleFeed?.({ ...props, comments: [commentValue, ...props.comments ] }, "comment");
              setCommentValue("");
            }} className="bg-blue-600 rounded-md px-3 py-1 text-white">Add</button>
          </div>
          {
            props.comments.map((comment, idx)=>{
              return (
                <div key={idx} className="rounded-md py-1 px-3 my-2 bg-blue-200">{comment}</div>
              )
            })
          }
        </div>
      }
    </div>
  );
};

export default Feed;
