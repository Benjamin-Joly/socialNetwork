//react
import React, { useState, useContext } from 'react';
//ctx
import { AuthCtx } from '../Contexts/AuthCtx';
import { UserCtx } from '../Contexts/UserCtx';
import { ProfilePicCtx } from '../Contexts/ProfilePicCtx';
//utils
import loginReq from '../fetch/login';
import arrayBufferToBase64 from '../utils/bufferTo64';


const SigninPage = (props) => {
    //ctx
    const { isAuth, setAuth } = useContext(AuthCtx);
    const { profilePic, setProfilePic } = useContext(ProfilePicCtx);
    const { userDatas, setUserDatas } = useContext(UserCtx);
    //state
    const [err, setErr] = useState('');
    //ref
    const email = React.createRef();
    const password = React.createRef();
    //component logic
    isAuth === true ? props.history.push('/chat') : <></>;
    const logUser = async () => {
        const user = {
            email : email.current.value,
            password : password.current.value
        };
        const response = await loginReq(user);
        if(response.valid === true){
            sessionStorage.setItem('session', response.session);
            const { userId, username, email, position, description, imgUrl } = response.user;
            const user = {
                userId : userId,
                username : username,
                email : email,
                position : position,
                description :description,
                imgUrl : 'imgUrl'
            };
            sessionStorage.setItem('user', userId+ ' ' + username + ' '+ email + ' '+ position + ' '+ description + ' '+ imgUrl);
            if(response.file){
                const buff = response.file.fileData.data;
                const data = arrayBufferToBase64(buff);
                //console.log(data);
                const profileObj = {
                    fileAuthor : response.file.fileAuthor,
                    fileData : data,
                    fileName : response.file.fileName,
                    fileType : response.file.fileType,
                    idfile : response.file.idfile
                };
                setProfilePic(profileObj)
            }
            setUserDatas(user);
            //console.log(userDatas);
            props.history.push('/chat');
        } else {
            setErr(response.message);
        }
    };

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