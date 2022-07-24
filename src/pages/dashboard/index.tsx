import { useContext } from 'react'
import { AuthContext } from '../../AuthWrapper'
import CreatePost from '../../components/CreatePost';
import Navbar from '../../layout/navbar';

const Dashboard = () => {

  const {handleLogout} = useContext(AuthContext);

  return (
    <div>
      <CreatePost />
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Dashboard