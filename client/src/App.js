import React from 'react';
import 'materialize-css'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { NavBarC } from './components/NavBarC';



function App() {
  const { token, login, logout, userId } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  return (
    <AuthContext.Provider value={{
      token, userId, login, logout, isAuthenticated
    }} >
      <Router>
        {isAuthenticated && <NavBarC/> }
        <div >

          {routes}
        </div>
      </Router>

    </AuthContext.Provider>


  );
}

export default App;
