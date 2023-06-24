

import axios from 'axios'
import { marked } from 'marked'
import React, { useEffect, useRef } from 'react'

const Md = () => {
  const msRef = useRef<any>()
    useEffect(() => {
      console.log(msRef)
        axios({
          method: 'get',
          url: '@/../md/fiberdiffvue.md',
          data: {
            firstName: 'Fred',
            lastName: 'Flintstone'
          }
        }).then(res => {
          msRef.current.innerHTML = marked.parse(res.data)
        })
    }, [])


  return (
    <div id='mdbox' ref={msRef}></div>
  )
}

export default Md