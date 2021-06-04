import { Redirect, Route } from 'react-router-dom';


const ProtectedRoute = ({ component : Component, ...other}) => {
    const isAuthenticated = sessionStorage.getItem("session");
    const isToken = JSON.parse(isAuthenticated)?.login;
    console.log(isToken);
    return (
        // isAuthenticated ||  isToken ? <Component /> : <Redirect to={{ pathname: "/login" }} />
        <Route {...other} render={(props) => 
            isAuthenticated ||  isToken ? <Component {...props} /> : <Redirect to={{ pathname: "/login" }} />}>   
        </Route>
    )
};

export default ProtectedRoute;