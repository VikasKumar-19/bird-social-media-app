import React, { useContext } from "react";
import { AuthContext } from "../../AuthWrapper";
import Feed from "../../components/Feed";
import { FeedContext } from "../../FeedWrapper";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const { feeds } = useContext(FeedContext);

  const myFeeds = feeds.filter((feed) => feed.postAuthor === user);
  const likes = myFeeds.reduce((prev, next)=>prev + next.likes.length, 0)
  console.log(likes);
  
  return (
    <div className="divide-y h-full ">
      <div className="h-2/5 px-20 py-12">
        <div className="flex gap-14 divide-x-4">
          <div>
            <div className="overflow-hidden relative w-32 h-32 bg-gray-100 rounded-full dark:bg-gray-600">
              <svg
                className="w-28 mx-auto h-28 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <p className="text-center text-2xl my-2 font-semibold">{user}</p>
          </div>
          <div className="self-center px-4">
            <p className="text-xl">
              Total Posts: <span>{myFeeds.length}</span>
            </p>
            <p className="text-xl">
              Total Likes: <span>{likes}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="h-3/5 overflow-auto">
        <h2 className="text-xl font-bold text-center">My Posts</h2>
        <div className="w-full py-6 flex flex-col gap-8 items-center">
          {myFeeds.map((feed) => (
            <Feed key={feed.postID} {...feed} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
