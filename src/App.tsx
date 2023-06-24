import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Ajax} from './Mock.js'
import './App.css'
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
        <button onClick={() => {setCount((count) => count + 1)
        // request()
        }}>
          count is {count}
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

export default App
