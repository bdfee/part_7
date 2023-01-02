import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/navigation'
import BlogsList from './components/blogslist'
import UsersView from './components/views/users-view'
import UserView from './components/views/user-view'
import BlogView from './components/views/blog-view'
import LoginPage from './components/login-page'

import './index.css'

const App = () => {

  const token = useSelector(state => state.user.token)

  return (
    <Router>
      {token === null ?
        <LoginPage /> :
        <>
          <Navigation />
          <Routes>
            <Route path='/blogs/:id' element={ <BlogView /> } />
            <Route path='/users/:id' element={ <UserView /> } />
            <Route path='/users' element={ <UsersView /> } />
            <Route path='/' element={ <BlogsList />} />
          </Routes>
        </>
      }
    </Router>
  )
}

export default App