import { useContext } from 'react'
import { AuthContext } from '../../AuthWrapper'
import CreatePost from '../../components/CreatePost';
import PostsContainer from '../../components/PostsContainer';
import Navbar from '../../layout/navbar';

const Dashboard = () => {

  const {handleLogout} = useContext(AuthContext);

  return (
    <div className='w-full h-full '>
      <CreatePost />
      <PostsContainer />
    </div>
  )
}

export default Dashboard