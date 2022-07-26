import React, {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

export interface IFeedState {
  postID: string;
  title: string;
  contents: string;
  postAuthor: string;
  createdOn: number;
  updatedOn: number;
  likes: string[];
  comments: string[];
}

interface IStoreContext {
  feeds: IFeedState[];
  handleFeed: null | ((feed: IFeedState, type: PostActions) => void);
}

const initialStore: IStoreContext = {
  feeds: [],
  handleFeed: null,
};

type PostActions = "add" | "edit" | "delete" | "like" | "comment";

export const FeedContext = createContext(initialStore);

const FeedWrapper: FC<PropsWithChildren> = (props) => {
  const [feeds, setfeeds] = useState<IFeedState[]>([]);
  // const [feeds, setfeeds] = useState<IFeedState[]>(() => {
  //   let feed = localStorage.getItem("feed");
  //   if (feed) {
  //     let feedJs: IFeedState[] = JSON.parse(feed);
  //     return feedJs;
  //   }
  //   return [];
  // });

  useEffect(() => {
    const initialPosts: IFeedState[] = [
      {
        comments: [],
        likes: [],
        postAuthor: "MegaMind",
        title: "Some cats are actually allergic to humans.",
        contents:
          "Though it's uncommon—since humans bathe more than your typical animal, and don't shed as much hair or skin—some animals can still be allergic to humans, according to Popular Science. (However, it's more often because of the perfume or cologne we wear, or the soap we use.) And for more trivia about our furry friends, here are 75 Animal Facts That Will Change the Way You View the Animal Kingdom.",
        createdOn: Date.now(),
        postID: "abcd1234",
        updatedOn: Date.now(),
      },
      {
        comments: [],
        likes: [],
        postAuthor: "FlyCrusher",
        title: "The majority of your brain is fat.",
        contents:
          "You can literally call someone a fathead, but it's still unkind: According to Psychology Today, 60 percent of human brain matter is made of fat.",
        createdOn: Date.now(),
        postID: "efgh1234",
        updatedOn: Date.now(),
      },
      {
        comments: [],
        likes: [],
        postAuthor: "DailyCrush",
        title: "The moon is (slowly) slowing the Earth's rotation.",
        contents:
          "Every one hundred years, the moon adds approximately 1.4 milliseconds to a day. While this may be minuscule, it does add up: When dinosaurs roamed the planet, days were 23 hours long, according to NASA.",
        createdOn: Date.now(),
        postID: "ijkl1234",
        updatedOn: Date.now(),
      },
      {
        comments: [],
        likes: [],
        postAuthor: "GamerGuy",
        title: "Oranges aren't naturally occurring fruits.",
        contents:
          "Oranges are a subtropical fruit, but now that they exist in more temperate climates, they lose their chlorophyll-induced green and become their more familiar color when the weather warms up.",
        createdOn: Date.now(),
        postID: "mnop1234",
        updatedOn: Date.now(),
      },
      {
        comments: [],
        likes: [],
        postAuthor: "Perry Kate",
        title: "New York was briefly named New Orange",
        contents:
          "Yes, before it was the Big Apple, it was New Orange. As History reports, when the Dutch captured New York from the English in 1673, they renamed it New Orange in honor of William III of Orange.",
        createdOn: Date.now(),
        postID: "qrst1234",
        updatedOn: Date.now(),
      },
      {
        comments: [],
        likes: [],
        postAuthor: "DevilMan",
        title: "Too much water can kill you.",
        contents:
          "Drinking too much water can be deadly. When guzzling a lot of liquid, you can suffer from water intoxication or hyponatremia, which occurs after an obscene amount of water is consumed, often during endurance events when participants are also losing sodium through their sweat.",
        createdOn: Date.now(),
        postID: "uvwx1234",
        updatedOn: Date.now(),
      },
    ];

    let allPosts:IFeedState[] = [];
    let feedsStr = localStorage.getItem("feed");
    if (feedsStr) {
      let prevFeeds: IFeedState[] = JSON.parse(feedsStr);
      allPosts = [...prevFeeds];
    }
    else{
      allPosts = [...initialPosts];
      localStorage.setItem("feed", JSON.stringify(initialPosts));
    }

    for (let i = allPosts.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = allPosts[i];
      allPosts[i] = allPosts[j];
      allPosts[j] = temp;
    }

    setfeeds(allPosts);
  }, []);

  const store: IStoreContext = {
    feeds,
    handleFeed: (feed: IFeedState, type: PostActions) => {
      console.log(feed, "feed");
      // let feedLocal = localStorage.getItem("feed");
      switch (type) {
        case "add":
          // if(feedLocal){
          //   let feedLocalParse:IFeedState[] = JSON.parse(feedLocal);
          //   localStorage.setItem("feed", JSON.stringify([...feedLocalParse, feed]));
          // }
          // else{
          //   localStorage.setItem("feed", JSON.stringify([feed]));
          // }
          localStorage.setItem("feed", JSON.stringify([feed,...feeds]));
          setfeeds([feed, ...feeds]);
          return;
        case "delete":
          // if(feedLocal){
          //   let feedLocalParse:IFeedState[] = JSON.parse(feedLocal);
          //   localStorage.setItem("feed", JSON.stringify(feedLocalParse.filter((item)=>item.postID !== feed.postID)));
          // }
          let filteredPosts = feeds.filter(
            (post) => post.postID !== feed.postID
          );
          localStorage.setItem("feed", JSON.stringify(filteredPosts));
          setfeeds(filteredPosts);
          return;
        case "edit":
          // if(feedLocal){
          //   let feedLocalParse:IFeedState[] = JSON.parse(feedLocal);
          //   localStorage.setItem("feed", JSON.stringify(feedLocalParse.map((post) => {
          //     if (post.postID === feed.postID) {
          //       return feed;
          //     } else return post;
          //   })));
          // }
          let updatedPosts = feeds.map((post) => {
            if (post.postID === feed.postID) {
              return feed;
            } else return post;
          });
          localStorage.setItem("feed", JSON.stringify(updatedPosts));
          setfeeds(updatedPosts);
          return;
        case "like":
          // if(feedLocal){
          //   let feedLocalParse:IFeedState[] = JSON.parse(feedLocal);
          //   localStorage.setItem("feed", JSON.stringify(feedLocalParse.map((post) => {
          //     if (post.postID === feed.postID) {
          //       return feed;
          //     } else return post;
          //   })));
          // }
          let likedPosts = feeds.map((post) => {
            if (post.postID === feed.postID) {
              return feed;
            } else return post;
          });
          localStorage.setItem("feed", JSON.stringify(likedPosts));
          setfeeds(likedPosts);
          return;
        case "comment":
          // if(feedLocal){
          //   let feedLocalParse:IFeedState[] = JSON.parse(feedLocal);
          //   localStorage.setItem("feed", JSON.stringify(feedLocalParse.map((post) => {
          //     if (post.postID === feed.postID) {
          //       return feed;
          //     } else return post;
          //   })));
          // }
          let commentedPosts = feeds.map((post) => {
            if (post.postID === feed.postID) {
              return feed;
            } else return post;
          });
          localStorage.setItem("feed", JSON.stringify(commentedPosts));
          setfeeds(commentedPosts);
          return;
      }
    },
  };

  return (
    <FeedContext.Provider value={store}>{props.children}</FeedContext.Provider>
  );
};

export default FeedWrapper;
