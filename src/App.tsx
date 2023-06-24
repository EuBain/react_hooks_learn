import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Ajax} from './Mock.js'
import './App.css'
<<<<<<< HEAD
import ModalByButton from './components/ModalByButton/index.js'

function App() {
  const [count, setCount] = useState(0)
  // useEffect(() => {
  //   request()
  // }, [])

  // const request = async() => {
  //   const res = await Ajax.Get(1)
  //   console.log(res)
  // }

  // window.onbeforeunload = (event) => {
  //   // event.preventDefault()
  //   event.returnValue= '确定要离开嘛'
  // }

=======
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
>>>>>>> refs/remotes/origin/release
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
<<<<<<< HEAD
        <button onClick={() => {setCount((count) => count + 1)
        // request()
        }}>
          count is {count}
=======
        <button onClick={reset
        }>
          {aaa.dd}
        </button>
        <button onClick={increase}>
          number is {secondsPassed}
>>>>>>> refs/remotes/origin/release
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
