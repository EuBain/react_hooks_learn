


import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import { state } from '../../utils/StateClass'
const ModalByButton = (props) => {
    const {children} = props
    const [show, setShow] = useState<boolean>(false)

    const starTest = () => {
      const demo = new state()
      demo.getQueryData("1")
      demo.requireData()
    }
  return (
  <>
  <Button onClick={()=> setShow(true)}>打开弹框</Button>
  { 
  show && <Modal
  open
  onCancel={() => setShow(false)}>
    <Button onClick={starTest}>启动</Button>
  </Modal>
  }
  </>
  )
}

export default ModalByButton