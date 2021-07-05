//react
import { useContext, useEffect } from 'react';
//vendors
import jwt_decode from 'jwt-decode';
//ctx
import { AdminCtx } from '../Contexts/AdminCtx';
import { Redirect, Route } from 'react-router-dom';

export const AdminAuth = ({ component: Component, ...rest }) => {
  //ctx
    const {adminAuth, setAdminAuth} = useContext(AdminCtx);
    console.log('AdminAuth ', adminAuth);
  //component logic
     useEffect(() => {
        const session = sessionStorage.getItem("session");
        if(session){
            const decoded = jwt_decode(session);
            setAdminAuth(decoded.admin);
        }
    },[]);    
  return adminAuth === true ?  <Route {...rest} render={
    props => <Component {...rest} {...props}/>
  } /> : <Redirect to={{ pathname: "/login/admin" }} />
}