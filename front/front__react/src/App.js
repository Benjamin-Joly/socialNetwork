import './css/App.min.css';
import { useState } from 'react';
//Utils
import checkSession from './utils/checkSession';
import getReq from './utils/getReq';
//Components
import Header from './components/Header';
import Auth from './components/Auth';
import TextInput from './components/TextInput';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Settings from './components/Settings';
//Contexts
import { LoginContext } from './Contexts/LoginContext';
import { PublicFeedCtx } from './Contexts/PublicFeedContext';


function App() {
  const [logIn, setLogIn] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isOpen, setOpen] = useState(false);
  window.addEventListener('load', async () => {
    const session = await checkSession;
    setLogIn(session);
    const data = await getReq();
    setMessages(data);
  })
  return (
    <div className="App">
      <Header />
      <LoginContext.Provider value={{logIn, setLogIn}}>
      {logIn ? <Profile /> : <> </>} 
      </LoginContext.Provider>
      <main className="main__section">
        <div className="content__wrap">
        <PublicFeedCtx.Provider value={{messages, setMessages}}>
            <LoginContext.Provider value={{logIn, setLogIn}}>
                {logIn ? <> </> : <Auth />}
                {logIn ? <Feed /> : <> </>} 
            </LoginContext.Provider>
          </PublicFeedCtx.Provider>
        </div>
      </main>
      <PublicFeedCtx.Provider value={{messages, setMessages}}>
      {logIn ? <TextInput /> : <> </>} 
     </PublicFeedCtx.Provider>
    </div>
  );
}


//trash
//{logIn ? <Feed allowed = {logIn} logInFunc={setLogIn}/> : <Gate allowed = {!logIn} logInFunc={setLogIn} />}  


export default App;
