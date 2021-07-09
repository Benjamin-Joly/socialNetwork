//React
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useState, useContext } from 'react';
//ctx
import { Auth } from './Components/Auth';
import { AdminAuth } from './Components/AdminAuth';
import { UserCtx } from './Contexts/UserCtx';
import { AuthCtx } from './Contexts/AuthCtx';
import { AdminCtx } from './Contexts/AdminCtx';
import { ProfilePicCtx } from './Contexts/ProfilePicCtx';
//Pages
import IndexPage from './Pages/IndexPage';
import LoginPage from './Pages/SigninPage';
import AdminSigninPage from './Pages/AdminSigninPage';
import RegisterPage from './Pages/SignupPage';
import ChatRoomPage from './Pages/ChatRoomPage';
import DashboardPage from './Pages/DashBoardPage';
import AdminDashboard from './Pages/AdminDashBoard';

function App(props) {
  //states
  const [isAuth, setAuth] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [userDatas, setUserDatas] = useState();
  const [ profilePic, setProfilePic ] = useState();

  console.log(userDatas);
  
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <AuthCtx.Provider value={{isAuth, setAuth}}>
                <Route exact path='/' component={IndexPage}/>
            <UserCtx.Provider value={{userDatas, setUserDatas}}>
              <ProfilePicCtx.Provider value={{profilePic, setProfilePic}}>
                <Route exact path='/login' component={LoginPage}/>
                <Route exact path='/register' component={RegisterPage}/>
                <Route path="/profile">
                  <Auth data={props} component={DashboardPage} />
                </Route>
                <Route path="/chat">
                  <Auth data={props} component={ChatRoomPage} />
                </Route>
              </ProfilePicCtx.Provider>
          <AdminCtx.Provider value={{adminAuth, setAdminAuth}}>
                <Route exact path='/login/admin' component={AdminSigninPage}/>
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
