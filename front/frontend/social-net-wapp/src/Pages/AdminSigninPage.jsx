import React, { useState, useContext } from 'react';
import { AdminCtx } from '../Contexts/AdminCtx';
import loginReqAdmin from '../fetch/adminLogin';


const AdminSigninPage = (props) => {
    const { adminAuth, setAdminAuth } = useContext(AdminCtx);
    const [err, setErr] = useState('');

    const email = React.createRef();
    const password = React.createRef();

    const logUser = async () => {
        const user = {
            email : email.current.value,
            password : password.current.value
        };
        const response = await loginReqAdmin(user);
        //console.log(response);
        if(response.admin === true){
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
            sessionStorage.getItem('session') ? props.history.push('/admin') : <></>;
            
        } else {
            setErr(response.message);
        }
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
                </div>
        </div>
    )
}

export default AdminSigninPage;