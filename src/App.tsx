import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Ajax} from './services/Mock/index.js'
import './App.css'
import useStore from './store/useStore.js'
import { observer } from 'mobx-react'
import store from '@/store'


function App(props) {
  const {demo:{secondsPassed, increase, reset ,aaa}} = useStore()
// const {demo} = props
// const {demo} = store
  // const [count, setCount] = useState(0)
  // useEffect(() => {
  //   data?.addCount()
  // }, [])
  // console.log(demo.aaa)
  const bbb = aaa.slice()
console.log(secondsPassed,bbb,aaa)
  const request = async() => {
    const res = await Ajax.Get(1)
    console.log(res)
  }
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={reset
        }>
          {aaa.dd}
        </button>
        <button onClick={increase}>
          number is {secondsPassed}
        </button>
        <ModalByButton></ModalByButton>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default observer(App)
