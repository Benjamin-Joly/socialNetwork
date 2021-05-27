import LoginForm from './LoginForm';
import SignupForm from './Signup-form';
import { useContext } from 'react';
import { LoginContext } from '../Contexts/LoginContext';
import { PublicFeedCtx } from '../Contexts/PublicFeedContext';

const Auth = () => {
    const {logIn, setLogIn} = useContext(LoginContext);
    const {messages, setMessages} = useContext(PublicFeedCtx);
    console.log(logIn);
    const headsOrTails = (button, styling) => {
        const suscribe = document.getElementById('suscribe');
        const signupSection = document.getElementById('signup');
        const connect = document.getElementById('connect');
        const loginSection = document.getElementById('login');
        if(button === suscribe){
            connect.className = styling;
            signupSection.className='signup__section--active';
            loginSection.className='login__section--inactive';
        }else{
            suscribe.className = styling;
            loginSection.className='login__section--active';
            signupSection.className='signup__section--inactive';
        }
    }
    const signupConnectToggle = (e) => {
        const button = e.target;
        button.className += '--active';
        headsOrTails(button, "form__heading");
    }
    return (
        <section className="gate">
            <div id="auth-wrap" className="gate__wrap">
                <div className="gate-heading__wrap">
                    <h2 id="suscribe" onClick={signupConnectToggle} className="form__heading--active">Inscription</h2>
                    <h2 id="connect" onClick={signupConnectToggle} className="form__heading">Connection</h2>
                </div>
                <PublicFeedCtx.Provider value={{messages, setMessages}}>
                    <LoginContext.Provider value={{logIn, setLogIn}}>
                        <section id="signup" className="signup__section--active">
                            <hr />
                            <SignupForm />
                        </section>
                        <section id="login" className="login__section--inactive">
                            <hr />
                            <LoginForm />
                        </section>
                    </LoginContext.Provider>
                </PublicFeedCtx.Provider>
            </div>
        </section>
    )
}

export default Auth;