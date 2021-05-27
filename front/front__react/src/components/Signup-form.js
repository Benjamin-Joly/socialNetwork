import signupReq from '../utils/signup';
import loginReq from '../utils/login';
import buildFeed from '../utils/buildFeed';
import { useState } from 'react';
import { useContext } from 'react';
import { LoginContext } from '../Contexts/LoginContext';
import { PublicFeedCtx } from '../Contexts/PublicFeedContext';
const SignupForm = () => {
    const [ errorMessage, setErrorMessage] = useState('');
    const logOut = () => {
        sessionStorage.clear();
        //document.location.reload();
    };
    const {logIn, setLogIn} = useContext(LoginContext);
    const {messages, setMessages} = useContext(PublicFeedCtx);
    const clickHandler = async (e) => {
        const signupInputs = Array.from(document.querySelectorAll('.signup__input'));
        const [firstName, lastName, position, email, password] = signupInputs;
        const response = await signupReq(firstName, lastName, position, email, password);
        const iD = response.split('__');
        if(!iD || iD === 'undefined'){
            const errMsg = response;
            logOut();
            setErrorMessage(errMsg);
        }else{
            setErrorMessage('');
            const loginRes = await loginReq(email, password);
            const session = loginRes.split('__')[2];
            sessionStorage.setItem('session', session);
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
        }

    }
    return (
        <div className="form__wrap">
            <form action="" method="post" id="signup-form">
                <div className="labels">
                    <label htmlFor="first-name">Prénom :</label>
                    <label htmlFor="last-name">Nom :</label>
                    <label htmlFor="position">Fonction :</label>
                    <label htmlFor="email">email :</label>
                    <label htmlFor="password">Mot de passe :</label>
                </div>
                <div className="inputs">
                    <input type="text" id="first-name" placeholder="Prénom" className="signup__input" />
                    <input type="text" id="last-name" placeholder="Nom" className="signup__input" />
                    <select name="position" id="position" className="signup__input">
                        <option value="intern">Stagiaire</option>
                        <option value="employee">Collaborateur</option>
                        <option value="manager">Cadre</option>
                    </select>
                    <input type="text" id="email" placeholder="email valide" className="signup__input" />
                    <input type="text" id="password" placeholder="mot de passe" className="signup__input" />
                </div>
            </form>
            <p className='error-message'>{errorMessage}</p>
            <button id="signup-btn" onClick={clickHandler} value="temporaire" className="cta cta__gate">S'inscrire</button>
        </div>
    )
} 

export default SignupForm;