import React from 'react';
import 'materialize-css'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { NavBarC } from './components/NavBarC';


// mongodb+srv://andry:rhefccfy@cluster0-beci1.azure.mongodb.net/app?retryWrites=true&w=majority

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
