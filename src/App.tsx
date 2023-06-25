import { Suspense } from 'react'

import './App.css'

import { observer } from 'mobx-react'

import { useRoutes, Navigate  } from 'react-router-dom';
import { routes } from './router/index.tsx';


type OldRender = () => React.ReactElement<any, string | React.JSXElementConstructor<any>> | null

let router: React.ReactElement<any, string | React.JSXElementConstructor<any>> | null;


const patchClientRoutes = ({routes}) => {

}

export const Router = ()  => { 
  // 获取路由参数
  // 处理路由
  patchClientRoutes?.({routes})
  console.log(routes)
  router = useRoutes(routes)
  // return router
  return (
    <Suspense fallback={ <h2>Loading... 加载中... </h2> }>
       {/* <Router /> */}
       {router}
    </Suspense>
  )
}
 // 复写render，代替原先的render，但还是要执行之前的render 函数
const  render = (fn) => {
     fn()
  }


function App() {

 return  < Router />
//  return  render ? render(Router) : Router()

}

export default App


