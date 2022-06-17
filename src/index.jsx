import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
// import styles from './index.less'
import { Button } from 'antd'
import { isBoolean } from 'lodash'
import { componentDidMound } from './utils/test'
import minStyles from './styles/index.less'
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom'
// import Home from './pages/home.jsx'
// import List from './pages/list.jsx'

const Home = lazy(() => import('./pages/home.jsx'))
const List = lazy(() => import('./pages/list.jsx'))

const App = () => {

  const [boo, setBboo] = React.useState(false)


  React.useEffect(() => {
    componentDidMound()
    console.log('lodash', isBoolean(true))
  }, [])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Redirect />} />
        <Route path="/home" element={<Home />} />
        <Route path="/list" element={<List />} />
        {/* </Route> */}
      </Routes>
    </Suspense>
  )
}

const Redirect = (props) => {
  const navigate = useNavigate('/')
  console.log(navigate)

  return (
    <div className={minStyles.wrapper}>
      <h1>Hello World!</h1>
      <Button type='primary' onClick={() => navigate('/home')}>Home</Button>
      <Button type='primary' onClick={() => navigate('/list')}>List</Button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </React.StrictMode>
);
