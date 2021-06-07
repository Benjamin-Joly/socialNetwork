import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useState, useContext } from 'react';

//Components
import IndexPage from './Pages/IndexPage';
import LoginPage from './Pages/SigninPage';
import AdminSigninPage from './Pages/AdminSigninPage';
import RegisterPage from './Pages/SignupPage';
import DashBoardPage from './Pages/DashBoardPage';
import ChatRoomPage from './Pages/ChatRoomPage';
import { Auth } from './Components/Auth';
import { AdminAuth } from './Components/AdminAuth';

import { UserCtx } from './Contexts/UserCtx';
import { AuthCtx } from './Contexts/AuthCtx';
import { AdminCtx } from './Contexts/AdminCtx';
import DashboardPage from './Pages/DashBoardPage';
import AdminDashboard from './Pages/AdminDashBoard';


function App(props) {
  const [isAuth, setAuth] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [userDatas, setUserDatas] = useState();

  console.log('App ', adminAuth);
  
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <AuthCtx.Provider value={{isAuth, setAuth}}>
            <UserCtx.Provider value={{userDatas, setUserDatas}}>
                <Route exact path='/' component={IndexPage}/>
                <Route exact path='/login' component={LoginPage}/>
                <Route exact path='/register' component={RegisterPage}/>
                <Route path="/profile">
                  <Auth component={DashboardPage} />
                </Route>
                <Route path="/chat">
                  <Auth data={props} component={ChatRoomPage} />
                </Route>
                <Route exact path='/login/admin' component={AdminSigninPage}/>
          <AdminCtx.Provider value={{adminAuth, setAdminAuth}}>
                <Route path="/admin">
                  <AdminAuth data={props} component={AdminDashboard} />
                </Route>
          </AdminCtx.Provider> 
          </UserCtx.Provider>
          </AuthCtx.Provider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
