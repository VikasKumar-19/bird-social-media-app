import { useContext } from 'react'
import { AuthContext } from '../../AuthWrapper'

const Dashboard = () => {

  const {handleLogout} = useContext(AuthContext);

  return (
    <div>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Dashboard