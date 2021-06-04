import React, { useState } from 'react';
import loginReq from '../utils/login';
import { useContext } from 'react';
import { AuthCtx } from '../Contexts/AuthCtx';
import { UserCtx } from '../Contexts/UserCtx';

const SigninPage = (props) => {
    const { isAuth, setAuth } = useContext(AuthCtx);
    const { userDatas, setUserDatas } = useContext(UserCtx);
    console.log(userDatas);

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
            console.log('response');
            sessionStorage.setItem('session', response.session);
            const { userId, username, email, position, description, imgUrl } = response.user;
            sessionStorage.setItem('user', userId+ ' ' + username + ' '+ email + ' '+ position + ' '+ description + ' '+ imgUrl);
            setAuth(true);
            console.log(isAuth);
            const user = {
                userId : userId,
                username : username,
                email : email,
                position : position,
                description :description,
                imgUrl : imgUrl
            };
            setUserDatas(user);
        } else {
            setErr(response.message);
        }
    };

    if(isAuth === true){
    props.history.push('/');
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