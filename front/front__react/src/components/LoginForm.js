import loginReq from '../utils/login';
import buildFeed from '../utils/buildFeed';
import { useState } from 'react';
import { useContext } from 'react';
import { LoginContext } from '../Contexts/LoginContext';
import { PublicFeedCtx } from '../Contexts/PublicFeedContext';

const LoginForm = (props) => {
    const [ errorMessage, setErrorMessage] = useState('');
    const logOut = () => {
        sessionStorage.clear();
        //document.location.reload();
    };
    const {logIn, setLogIn} = useContext(LoginContext);
    const {messages, setMessages} = useContext(PublicFeedCtx);
    const clickHandler = async (e) => {
        const inputs = Array.from(document.querySelectorAll('.login__input'));
        const [logEmail, logPassword] = inputs;
        const response = await loginReq(logEmail, logPassword);
        const session = response.session;
        const iD = response.user.userId;
        const { userId, username, position } = response.user;
        sessionStorage.setItem('session', session);
        sessionStorage.setItem('userId', iD);
        sessionStorage.setItem('user', [userId, username, position]);
        if(!session || session === 'undefined'){
            const errMsg = response;
            logOut();
            setErrorMessage(errMsg);
        }else{
            setErrorMessage('');
            setLogIn(true); 
            const datas = await buildFeed();
            setMessages(datas);
        }
    };
    return (
        <div className="form__wrap">
            <form action="" method="post" id="login-form">
                <div className="labels">
                    <label htmlFor="email">email :</label>
                    <label htmlFor="password">Mot de passe :</label>
                </div>
                <div className="inputs">
                    <input type="text" id="email" placeholder="email valide" className="login__input" />
                    <input type="text" id="password" placeholder="mot de passe" className="login__input" />
                </div>
            </form>
            <p className='error-message'>{errorMessage}</p>
            <button id="login-btn" onClick={clickHandler} value="temporaire" className="cta cta__gate">Se connecter</button>
        </div>
    )
}

export default LoginForm;