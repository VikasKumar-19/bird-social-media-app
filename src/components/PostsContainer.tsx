import React, { useContext } from 'react'
import { FeedContext } from '../FeedWrapper'

const PostsContainer = () => {
  const {feeds} = useContext(FeedContext)

  console.log(feeds);
  
  return (
    <div>postsContainer</div>
  )
}

export default PostsContainer