import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useState, useContext } from 'react';

//Components
import IndexPage from './Pages/IndexPage';
import LoginPage from './Pages/SigninPage';
import RegisterPage from './Pages/SignupPage';
import DashBoardPage from './Pages/DashBoardPage';
import ChatRoomPage from './Pages/ChatRoomPage';
import { Auth } from './Components/Auth';

import { UserCtx } from './Contexts/UserCtx';
import { AuthCtx } from './Contexts/AuthCtx';
import DashboardPage from './Pages/DashBoardPage';


function App() {
  const [isAuth, setAuth] = useState(false);
  const [userDatas, setUserDatas] = useState();

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <AuthCtx.Provider value={{isAuth, setAuth}}>
            <UserCtx.Provider value={{userDatas, setUserDatas}}>
                {/* <Route exact path='/' component={IndexPage}/> */}
                <Route exact path='/login' component={LoginPage}/>
                <Route exact path='/register' component={RegisterPage}/>
                <Route path="/profile">
                  <Auth component={DashboardPage} />
                </Route>
                <Route path="/">
                  <Auth component={ChatRoomPage} />
                </Route>
              </UserCtx.Provider>
          </AuthCtx.Provider> 
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
