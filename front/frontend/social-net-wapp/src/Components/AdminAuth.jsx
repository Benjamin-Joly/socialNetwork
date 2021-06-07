import jwt_decode from 'jwt-decode';
import { useContext, useEffect } from 'react';
import { AdminCtx } from '../Contexts/AdminCtx';
import { Redirect, Route } from 'react-router-dom';

export const AdminAuth = ({ component: Component, ...rest }) => {
    const {adminAuth, setAdminAuth} = useContext(AdminCtx);
    console.log('AdminAuth ', adminAuth);
     useEffect(() => {
        const session = sessionStorage.getItem("session");
        if(session){
            const decoded = jwt_decode(session);
            setAdminAuth(decoded.admin);
        }else{
            console.log('session not loaded');
                setAdminAuth(false);
        };
    }, [])
    
  //return isAuth === true ? <Component {...props} /> : <Redirect to={{ pathname: "/login" }} />
  return adminAuth === true ?  <Route {...rest} render={
    props => <Component {...rest} {...props}/>
  } /> : <Redirect to={{ pathname: "/login/admin" }} />
}