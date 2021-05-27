import React from 'react';
import LoginForm from './LoginForm';
import SignupForm from './Signup-form';
import { useCallback } from 'react';
import loginReq from '../utils/login';

const Gate = ({ logIn, logInFunc }) => {
    const handleIt = useCallback(async(e) => {
        const inputs = Array.from(document.querySelectorAll('.login__input'));
        const [logEmail, logPassword] = inputs;
        const session = await loginReq(logEmail, logPassword);
        if(!session || session === 'undefined'){
            console.log('issue with session');
            logInFunc(false)
        }else{
            console.log(session);
            logInFunc(true)
        }
        logInFunc(false)
    }, [logInFunc]); 
    ///////////////////////////
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
    return  (
    <section className="gate">
        <div className="gate__wrap">
            <div className="gate-heading__wrap">
                <h2 id="suscribe" onClick={signupConnectToggle} className="form__heading--active">Inscription</h2>
                <h2 id="connect" onClick={signupConnectToggle} className="form__heading">Connection</h2>
            </div>
            <section id="signup" className="signup__section--active">
                <hr />
                <SignupForm />
            </section>
            <section id="login" className="login__section--inactive">
                <hr />
                <LoginForm />
            </section>
        </div>
    </section>
    )
}

export default Gate;