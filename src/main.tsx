import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'mobx-react'
import  store  from './store'
import Md from '@/components/MarkDownInHTML'
import { HashRouter} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider {...store} >
      <HashRouter>
        <App/>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
)
