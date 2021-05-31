import React, { useState } from 'react';
import loginReq from '../utils/login';

const SigninPage = (props) => {

    const [err, setErr] = useState('');

    const email = React.createRef();
    const password = React.createRef();

    const logUser = async () => {
        const user = {
            email : email.current.value,
            password : password.current.value
        };
        const response = await loginReq(user);
        if(response.valid === true){
            sessionStorage.setItem('session', response.session);
            const { userId, username, position } = response.user;
            sessionStorage.setItem('user', userId+ ' ' + username + ' '+position);
            props.history.push('/chat')
        }else{
            setErr(response.message);
        }
    }
    const goTo = () => {
        props.history.push('/register');
    };
    return(
        <div className="gate">
            <div className="login__wrap">
                <form action="" method="post" id="login-form">
                    <div className="labels">
                        <label htmlFor="email">email :</label>
                        <label htmlFor="password">Mot de passe :</label>
                    </div>
                    <div className="inputs">
                        <input type="text" id="email" placeholder="email valide" className="login__input" ref={email} />
                        <input type="text" id="password" placeholder="mot de passe" className="login__input" ref={password} />
                    </div>
                </form>
                <p className='error-message'>{err}</p>
                    <button id="login-btn" value="temporaire" className="cta cta__gate" onClick={logUser}>Se connecter</button>
                    <p className="link__gate" onClick={goTo}>register</p>
                </div>
        </div>
    )
}

export default SigninPage;