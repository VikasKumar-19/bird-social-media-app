import { useContext } from 'react'
import { AuthContext } from '../../AuthWrapper'
import CreatePost from '../../components/CreatePost';
import PostsContainer from '../../components/postsContainer';
import Navbar from '../../layout/navbar';

const Dashboard = () => {

  const {handleLogout} = useContext(AuthContext);

  return (
    <div>
      <CreatePost />
      <PostsContainer />
      {/* <button onClick={handleLogout}>logout</button> */}
    </div>
  )
}

export default Dashboard