import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'mobx-react'
import  store  from './store'
import Md from '@/components/MarkDownInHTML'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider {...store} >
      {/* <App/> */}
      <Md url={'/src/hooks/Advanced/README.md'}></Md>
    </Provider>
  </React.StrictMode>,
)
