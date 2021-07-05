//react
import React, { useState, useContext } from 'react';
//ctx
import { AuthCtx } from '../Contexts/AuthCtx';
import { UserCtx } from '../Contexts/UserCtx';
//fetch
import signupReq from '../fetch/signup';
import loginReq from '../fetch/login';

const SignupPage = (props) => {
    //ctx
    const { isAuth, setAuth } = useContext(AuthCtx);
    const { userDatas, setUserDatas } = useContext(UserCtx);
    //state
    const [err, setErr] = useState('');
    const [ emailBody, setEmailBody ] = useState('');
    const [ pwBody, setPwBody ] = useState('');
    const [ firstNameBody, setFirstNameBody ] = useState('');
    const [ lastNameBody, setLastNameBody ] = useState('');
    const [ positionBody, setPositionBody ] = useState('');
    //component logic
    const registerUser = async () => {
        const user = {
            firstName : firstNameBody,
            lastName : lastNameBody,
            position : positionBody,
            email : emailBody,
            password : pwBody
        };
        const response = await signupReq(user);
        console.log(response);
        if(response.valid === true){
            setAuth(true);
            setUserDatas(user)
            logUser(user.email, user.password);
        }else{
            setErr(response.message);
            console.log(err);
            props.history.push('/login')
        }
    }
    //this can be refactored (not DRY)
    const logUser = async (email, password) => {
        const user = {
            email : email,
            password : password
        };
        console.log(user);
        const response = await loginReq(user);
        if(response.valid === true){
            sessionStorage.setItem('session', response.session);
            const { userId, username, email, position, description, imgUrl } = response.user;
            sessionStorage.setItem('user', userId+ ' ' + username + ' '+ email + ' '+ position + ' '+ description + ' '+ imgUrl);
            const user = {
                userId : userId,
                username : username,
                email : email,
                position : position,
                description :description,
                imgUrl : imgUrl
            };
            setUserDatas(user);
            props.history.push('/chat');
        } else {
            setErr(response.message);
        }
    };
    const goTo = () => {
        props.history.push('/login');
    };
    return(
        <div className="gate">
            <div className="signup__wrap">
            <h1 className="login__heading">Inscription</h1>
            <form action="" method="post" id="signup-form">
                <div className="labels">
                    <label htmlFor="first-name">Prénom :</label>
                    <label htmlFor="last-name">Nom :</label>
                    <label htmlFor="position">Fonction :</label>
                    <label htmlFor="email">email :</label>
                    <label htmlFor="password">Mot de passe :</label>
                </div>
                <div className="inputs">
                    <input type="text" id="first-name" placeholder="Prénom" className="signup__input" value={firstNameBody} onChange={e => setFirstNameBody(e.target.value)} />
                    <input type="text" id="last-name" placeholder="Nom" className="signup__input" value={lastNameBody} onChange={e => setLastNameBody(e.target.value)} />
                    <select name="position" id="position" className="signup__input" value={positionBody} onChange={e => setPositionBody(e.target.value)}>
                        <option value="intern">Stagiaire</option>
                        <option value="employee">Collaborateur</option>
                        <option value="manager">Cadre</option>
                    </select>
                    <input type="text" id="email" placeholder="email valide" className="signup__input" value={emailBody} onChange={e => setEmailBody(e.target.value)} />
                    <input type="text" id="password" placeholder="mot de passe" className="signup__input" value={pwBody} onChange={e => setPwBody(e.target.value)} />
                </div>
            </form>
            <p className='error-message'>{err}</p>
            <button id="signup-btn" value="temporaire" className="cta cta__gate" onClick={registerUser}>S'inscrire</button>
            <p className="link__gate" onClick={goTo}>J'ai déjà un compte</p>
        </div>
        </div>
    )
}

export default SignupPage;