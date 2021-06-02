import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Components
import IndexPage from './Pages/IndexPage';
import LoginPage from './Pages/SigninPage';
import RegisterPage from './Pages/SignupPage';
import ProfilePage from './Pages/DashBoardPage';
import ChatRoomPage from './Pages/ChatRoomPage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={IndexPage}/>
          <Route exact path='/login' component={LoginPage}/>
          <Route exact path='/register' component={RegisterPage}/>
          <Route exact path='/profile' component={ProfilePage}/>
          <Route exact path='/chat' component={ChatRoomPage}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
