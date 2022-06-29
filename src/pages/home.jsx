import React from 'react'
import styles from '@/styles/index.less'
import { Button } from 'antd'

const Home = () => {

  return (
    <>
      <h1 className={styles.h1} >Home!!!!!</h1>
      <Button type='primary'>Button</Button>
      <div style={{color: 'var(--ant-primary-color)'}} >585555</div>
    </>
  )
}

export default Home