import { createBrowserRouter} from 'react-router-dom'
import Admin from '../Admin'
import Login from '../Login'
import Home from '../Home'
import Registration from '../Admin-Subcomponents/Registration'

const router = createBrowserRouter([
  { path:'/', element:<Home/>},
  { path:'/admin' , 
    element:<Admin/>,
    children:[
      {path:'register',element:<Registration/>}
    ]
  },
  { path:'/login' , element:<Login/>},
  
])

export default router