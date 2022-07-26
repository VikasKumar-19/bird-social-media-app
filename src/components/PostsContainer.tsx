import React, { useContext } from 'react'
import { FeedContext } from '../FeedWrapper'
import Feed from './Feed';

const PostsContainer = () => {
  const {feeds} = useContext(FeedContext)
  
  return (
    <div className='w-full py-14 flex flex-col gap-8 items-center'>
      {feeds.map((feed)=><Feed key={feed.postID} {...feed} />)}
    </div>
  )
}

export default PostsContainer