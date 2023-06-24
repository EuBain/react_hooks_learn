import { Suspense } from 'react'

import './App.css'

import { observer } from 'mobx-react'

import { useRoutes, Navigate  } from 'react-router-dom';
import { HomeRoutes } from './Home';
import { routes } from './router/index.tsx';
import useMemoizedFn from './hooks/Advanced/useMemoizedFn/index.tsx';

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
}
 
const  render = (fn) => {
    fn()
  }


function App() {
  const a = useMemoizedFn(render)
  render ? render(Router) : Router()
  return (
    <Suspense fallback={ <h2>Loading... 加载中... </h2> }>
       {/* <Router /> */}
       {router}
    </Suspense>
  )
}

export default App


