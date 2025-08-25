import React from 'react'
import { useRoutes } from 'react-router-dom'
import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import EditCreator from './pages/EditCreator'
import AddCreator from './pages/AddCreator'
import './App.css'

function App() {
  const routes = useRoutes([
    {
      path: '/',
      element: <ShowCreators />
    },
    {
      path: '/new',
      element: <AddCreator />
    },
    {
      path: '/:id',
      element: <ViewCreator />
    },
    {
      path: '/edit/:id',
      element: <EditCreator />
    }
  ])

  return (
    <div className="App">
      {routes}
    </div>
  )
}

export default App
