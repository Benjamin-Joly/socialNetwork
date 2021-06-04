import jwt_decode from 'jwt-decode';
import { useContext, useEffect, useLayoutEffect } from 'react';
import { AuthCtx } from '../Contexts/AuthCtx';
import { UserCtx } from '../Contexts/UserCtx';
import { Redirect } from 'react-router-dom';

export const Auth = ({ component: Component, ...other }) => {
    const {isAuth, setAuth} = useContext(AuthCtx);
    const {userDatas, setUserDatas} = useContext(UserCtx);
    console.log(isAuth);
    useEffect(() => {
        const session = sessionStorage.getItem("session");
        if(session){
            console.log('session');
            const decoded = jwt_decode(session);
            console.log(decoded.valid);
            setAuth(decoded.valid);
        }else{
            console.log('session not loaded');
            setAuth(false);
        }
    }, []);

    console.log(userDatas);

    useEffect(() => {
        const userStrg = sessionStorage.getItem("user");
        if(userStrg){
            const userArray = userStrg.split(' ');
            const [ userId, firstName, lastName, email, position, description, imgUrl ] = userArray;
            const user = {
                userId : userId,
                username : firstName + ' ' + lastName,
                email : email,
                position : position,
                description :description,
                imgUrl : imgUrl
            };
            console.log(user);
            setUserDatas(user);
            console.log(userDatas);

        }else{
            console.log('no user');
        }
    }, [])

  return isAuth === true ? <Component {...other} /> : <Redirect to={{ pathname: "/login" }} />
}