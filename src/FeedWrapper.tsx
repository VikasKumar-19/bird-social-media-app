import React, { createContext, FC, PropsWithChildren, useState } from "react";

interface IFeedState {
  postID: string;
  title: string;
  contents: string;
  postAuthor: string;
  createdOn: number;
  updatedOn: number;
}

interface IStoreContext {
  feeds: IFeedState[];
  handleFeed: null | ((feed: IFeedState, type: PostActions) => void);
}

const initialStore: IStoreContext = {
  feeds: [],
  handleFeed: null,
};

type PostActions = "add" | "edit" | "delete";

export const FeedContext = createContext(initialStore);

const FeedWrapper:FC<PropsWithChildren> = (props) => {
  const [feeds, setfeeds] = useState<IFeedState[]>(() => {
    let feed = localStorage.getItem("feed");
    if (feed) {
      let feedJs: IFeedState[] = JSON.parse(feed);
      return feedJs;
    }
    return [];
  });

  const store: IStoreContext = {
    feeds,
    handleFeed: (feed: IFeedState, type: PostActions) => {
      console.log(feed, "feed");
      
      switch (type) {
        case "add":
          setfeeds([...feeds, feed]);
          localStorage.setItem("feed", JSON.stringify([...feeds, feed]));
          return;
        case "delete":
          let filteredPosts = feeds.filter((post) => post.postID !== feed.postID)
          localStorage.setItem("feed", JSON.stringify(filteredPosts));
          setfeeds(filteredPosts);
          return;
        case "edit":
          let updatedPosts = feeds.map((post) => {
            if (post.postID === feed.postID) {
              return feed;
            } else return post;
          });
          localStorage.setItem("feed", JSON.stringify(updatedPosts))
          setfeeds(updatedPosts);
          return;
      }
    },
  };

  return (
    <FeedContext.Provider value={store}>
      {props.children}
    </FeedContext.Provider>
  );
};

export default FeedWrapper;
