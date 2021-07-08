//react
import { useContext, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
//vendors
import jwt_decode from 'jwt-decode';
//ctx
import { AuthCtx } from '../Contexts/AuthCtx';
import { UserCtx } from '../Contexts/UserCtx';

export const Auth = ({ component: Component, ...rest }) => {
    //ctx
    const {isAuth, setAuth} = useContext(AuthCtx);
    const {userDatas, setUserDatas} = useContext(UserCtx);
    //component logic
    useEffect(() => {
        const session = sessionStorage.getItem("session");
        if(session){
            const decoded = jwt_decode(session);
            setAuth(decoded.valid);
        }else{
            setAuth(false);
        }
    }, []);
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
            setUserDatas(user);

        }else{
            console.error('no user');
        }
    }, [])

  return isAuth === true ?  <Route {...rest} render={
    props => <Component {...rest} {...props} />
  } /> : <Redirect to={{ pathname: "/login" }} />
}