import { createBrowserRouter} from 'react-router-dom'
import Admin from '../Admin'

import Login from '../Login'
import Home from '../Home'
import Registration from '../Admin-Subcomponents/Registration'
import OTPForm from '../OTPForm'

const router = createBrowserRouter([
  { path:'/', element:<Home/>},
  { path:'/admin' , 
    element:<Admin/>,
    children:[
      {path:'register',element:<Registration/>}
    ]
  },
  { path:'/login' , 
    element:<Login/>,
    
  },
  {
    path:'/OTPForm',
    element:<OTPForm/>
  }
  
])

export default router