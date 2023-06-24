

import axios from 'axios'
import { marked } from 'marked'
import React, { useEffect, useRef } from 'react'

type Iprops = {
  url: string,
}
const Md = (props: Iprops) => {
  const { url } = props
  const msRef = useRef<any>()
    useEffect(() => {
      console.log(msRef,url)
        axios({
          method: 'get',
          url: url,
        }).then(res => {
          msRef.current.innerHTML = marked.parse(res.data)
        })
    }, [])


  return (
    <div id='mdbox' ref={msRef}></div>
  )
}

export default Md